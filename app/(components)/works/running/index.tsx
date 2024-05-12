import RunningFeatureDetail from './detail';
import { createClient } from '@supabase/supabase-js';
import { Footprints } from 'lucide-react';

import type { MileageLog } from '@/lib/types/running';

import FeatureDisplay from '@/components/templates/feature-display';
import type { Database } from '@/generated/database.types';

// -----------------------------------------------------------------------------
// Services
// -----------------------------------------------------------------------------

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const RunningFeature: React.FC = async () => {
  // ---------------------------------------------------------------------------
  // Fetch mileage logs
  // ---------------------------------------------------------------------------

  const { data: mileageLogData } = await supabase
    .from('monthly_mileage')
    .select('time, value')
    .order('time', { ascending: false })
    .limit(12);

  const mileageLogs: MileageLog[] = (mileageLogData ?? []).map((item) => ({
    date: item.time,
    value: item.value ?? 0,
  }));

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
    (response.ok ? (await response.json()).values ?? [] : []) as string[][]
  )
    .filter((item) => item.length == 2)
    .map((log) => ({
      date: log[0],
      value: parseFloat(log[1]),
    }));

  // ---------------------------------------------------------------------------
  // Component
  // ---------------------------------------------------------------------------

  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[560px]:col-span-4"
      name="Running"
      description="I run a lot"
      symbol={<Footprints />}
    >
      <RunningFeatureDetail mileageLogs={mileageLogs} runningLogs={runningLogs} />
    </FeatureDisplay>
  );
};

export default RunningFeature;
