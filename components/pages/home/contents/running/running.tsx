import { useEffect, useState } from 'react';

import RunningDetails from './running-details';
import { createClient } from '@supabase/supabase-js';
import { Footprints } from 'lucide-react';

import ContentDisplay from '@/components/templates/new-templates/content-display';

export const dynamic = 'force-dynamic';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

//** Main component */

const Running = () => {
  const [runData, setRunData] = useState<MonthlyData[]>([]);
  const [dailyRunData, setDailyRunData] = useState<MileageLog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      //const supabase = createServerComponentClient<Database>({ cookies });

      // Fetch Monthly
      const { data: monthlyData } = await supabase
        .from('running_monthly')
        .select('year, month,total_distance')
        .order('year', { ascending: true })
        .order('month');

      const runData =
        monthlyData?.map((run) => ({
          date: String(run.month),
          value: run.total_distance,
          year: run.year,
        })) ?? [];

      setRunData(runData);

      // Fetch daily logs
      const { data: dailyData } = await supabase
        .from('running')
        .select('date, distance')
        .order('date', { ascending: true });

      const dailyRunData =
        dailyData?.map((run) => ({
          date: run.date,
          value: run.distance,
        })) ?? [];

      setDailyRunData(dailyRunData);
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs once when the component mounts

  return (
    <ContentDisplay
      className="col-span-2 h-64 w-full min-[560px]:col-span-4"
      name="Running"
      description="Getting better at running"
      symbol={<Footprints />}
    >
      <RunningDetails runMonthlyData={runData} dailyData={dailyRunData} />
    </ContentDisplay>
  );
};

export default Running;
