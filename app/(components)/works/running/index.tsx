import RunningFeatureDetail from './detail';
import { Footprints } from 'lucide-react';

import { db } from '@/lib/db';
import type { MileageLog } from '@/lib/types/running';

import FeatureDisplay from '@/components/templates/feature-display';

const RunningFeature: React.FC = async () => {
  // ---------------------------------------------------------------------------
  // Fetch mileage logs
  // ---------------------------------------------------------------------------

  const mileageLogData = await db.query.mileageLogsMonthly.findMany({
    columns: {
      time: true,
      value: true,
    },
    limit: 12,
    orderBy: (log, { desc }) => [desc(log.time)],
  });

  const mileageLogs: MileageLog[] = (mileageLogData ?? [])
    .map((item) => ({
      time: new Date(item.time),
      value: item.value ?? 0,
    }))
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  const mostRecentLog = await db.query.mileageLogsHourly.findFirst({
    columns: {
      time: true,
    },
    orderBy: (log, { desc }) => [desc(log.time)],
  });

  // ---------------------------------------------------------------------------
  // Fetch daily running logs
  // ---------------------------------------------------------------------------

  const response = await fetch(
    `https://content-sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETS_ID_RUNNING}/values/Log!B5:C?` +
      new URLSearchParams({
        valueRenderOption: 'FORMATTED_VALUE',
        dateTimeRenderOption: 'FORMATTED_STRING',
        majorDimension: 'ROWS',
        key: process.env.GOOGLE_SHEETS_API_KEY_RUNNING,
      }),
    {
      // Revalidate once a day.
      next: { revalidate: 86400 },
    },
  );

  const runningLogs: MileageLog[] = (
    (response.ok ? ((await response.json()).values ?? []) : []) as string[][]
  )
    .filter((item) => item.length == 2)
    .map((log) => ({
      time: new Date(log[0]),
      value: parseFloat(log[1]),
    }));

  // ---------------------------------------------------------------------------
  // Component
  // ---------------------------------------------------------------------------

  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[560px]:col-span-4"
      name="Running"
      description="I run"
      symbol={<Footprints />}
    >
      <RunningFeatureDetail
        mileageLogs={mileageLogs}
        runningLogs={runningLogs}
        lastUpdated={mostRecentLog?.time ? new Date(mostRecentLog.time) : undefined}
      />
    </FeatureDisplay>
  );
};

export default RunningFeature;
