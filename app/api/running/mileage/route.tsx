import { type NextRequest, NextResponse } from 'next/server';

import { sql } from 'drizzle-orm';

import { db } from '@/lib/db';
import { mileageLogsDaily, mileageLogsHourly, mileageLogsMonthly } from '@/lib/db/schema';

export async function GET() {
  const logs = await db.query.mileageLogsMonthly.findMany({
    columns: {
      time: true,
      value: true,
    },
    limit: 12,
    orderBy: (log, { desc }) => [desc(log.time)],
  });

  return NextResponse.json(logs, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=600',
    },
  });
}

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');

  // Revert if the API key is invalid.
  if (apiKey !== process.env.FIVEOUTOFNINE_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Revert if the request body is invalid.
  const body = await request.json();
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Apple shortcuts sends data as a string with newlines.
  const affectedDays: Set<number> = new Set();
  const affectedMonths: Set<number> = new Set();
  const hourlyMileage = body.data.split('\n').map((sample: string) => {
    const parsedSample = JSON.parse(sample);
    const start = new Date(parsedSample.start);
    const utcMonth = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1);
    const utcDay = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
    const utcHour = Date.UTC(
      start.getUTCFullYear(),
      start.getUTCMonth(),
      start.getUTCDate(),
      start.getUTCHours(),
    );

    // Add to daily and monthly mileage set that need updating.
    affectedDays.add(utcDay);
    affectedMonths.add(utcMonth);

    return {
      time: new Date(utcHour),
      value: parsedSample.value,
    };
  });

  // Insert hourly data into database.
  await db
    .insert(mileageLogsHourly)
    .values(hourlyMileage)
    .onConflictDoUpdate({
      target: mileageLogsHourly.time,
      set: {
        value: hourlyMileage.value,
      },
    });

  // Iterate through affected days to update total mileage.
  const dailyMileage = await Promise.all(
    Array.from(affectedDays).map(async (day) => {
      const startDate = new Date(day);
      const endDate = new Date(day + 86400000);

      const data = await db.query.mileageLogsHourly.findMany({
        where: (log, { gte, lt }) => gte(log.time, startDate) && lt(log.time, endDate),
      });
      const total = data.reduce((acc, { value }) => acc + (value ?? 0), 0) ?? 0;
      return { time: new Date(day), value: total };
    }),
  );

  // Insert daily data into database.
  await db
    .insert(mileageLogsDaily)
    .values(dailyMileage)
    .onConflictDoUpdate({
      target: mileageLogsDaily.time,
      set: {
        value: sql`excluded.value`,
      },
    });

  // Iterate through affected months to update total mileage.
  const monthlyMileage = await Promise.all(
    Array.from(affectedMonths).map(async (month) => {
      const startDate = new Date(month);
      const endDate = new Date(month);
      endDate.setUTCMonth(endDate.getUTCMonth() + 1);

      const data = await db.query.mileageLogsDaily.findMany({
        where: (log, { gte, lt }) => gte(log.time, startDate) && lt(log.time, endDate),
      });
      const total = data.reduce((acc, { value }) => acc + (value ?? 0), 0) ?? 0;
      return { time: new Date(month), value: total };
    }),
  );

  // Insert monthly data into database.
  await db
    .insert(mileageLogsMonthly)
    .values(monthlyMileage)
    .onConflictDoUpdate({
      target: mileageLogsMonthly.time,
      set: {
        value: sql`excluded.value`,
      },
    });

  return NextResponse.json({ message: 'Data added' });
}
