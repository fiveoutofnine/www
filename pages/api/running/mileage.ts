import type { NextApiRequest, NextApiResponse } from 'next';

import type { Database } from '@/generated/database.types';
import { createClient } from '@supabase/supabase-js';

// -----------------------------------------------------------------------------
// Services
// -----------------------------------------------------------------------------

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

// -----------------------------------------------------------------------------
// API handler
// -----------------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data } = await supabase
      .from('monthly_mileage')
      .select('time, value')
      .order('time', { ascending: false })
      .limit(12);

    res.setHeader('cache-control', 'public, s-maxage=86400, stale-while-revalidate=600');
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== process.env.FIVEOUTOFNINE_API_KEY) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }

    // Apple shortcuts sends data as a string with newlines.
    const affectedDays: Set<number> = new Set();
    const affectedMonths: Set<number> = new Set();
    const hourlyMileage = req.body.data.split('\n').map((sample: string) => {
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
    const { error: hourlyInsertError } = await supabase
      .from('hourly_mileage')
      .upsert(hourlyMileage);

    if (hourlyInsertError) {
      console.error(hourlyInsertError);
      res.status(500).send({ message: 'Error inserting data' });
      return;
    }

    // Iterate through affected days to update total mileage.
    const dailyMileage = await Promise.all(
      Array.from(affectedDays).map(async (day) => {
        const startDate = new Date(day);
        const endDate = new Date(day + 86400000);

        const { data } = await supabase
          .from('hourly_mileage')
          .select()
          .gte('time', startDate.toISOString())
          .lt('time', endDate.toISOString());
        const total = data?.reduce((acc, { value }) => acc + (value ?? 0), 0) ?? 0;
        return { time: new Date(day).toISOString(), value: total };
      }),
    );

    // Insert daily data into database.
    const { error: dailyInsertError } = await supabase.from('daily_mileage').upsert(dailyMileage);

    if (dailyInsertError) {
      console.error(dailyInsertError);
      res.status(500).send({ message: 'Error inserting data' });
      return;
    }

    // Iterate through affected months to update total mileage.
    const monthlyMileage = await Promise.all(
      Array.from(affectedMonths).map(async (month) => {
        const startDate = new Date(month);
        const endDate = new Date(month);
        endDate.setUTCMonth(endDate.getUTCMonth() + 1);

        const { data } = await supabase
          .from('daily_mileage')
          .select()
          .gte('time', startDate.toISOString())
          .lt('time', endDate.toISOString());
        const total = data?.reduce((acc, { value }) => acc + (value ?? 0), 0) ?? 0;
        return { time: new Date(month).toISOString(), value: total };
      }),
    );

    // Insert monthly data into database.
    const { error: monthlyInsertError } = await supabase
      .from('monthly_mileage')
      .upsert(monthlyMileage);

    if (monthlyInsertError) {
      console.error(monthlyInsertError);
      res.status(500).send({ message: 'Error inserting data' });
      return;
    }

    res.status(201).json({ message: 'Data added' });
  } else {
    res.status(405).send({ message: 'Only POST requests allowed' });
  }
}
