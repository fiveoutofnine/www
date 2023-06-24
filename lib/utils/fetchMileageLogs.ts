import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/lib/services/supabase';
import type { MileageLog } from '@/lib/types/running';

type MileageResponse = {
  data: MileageLog[];
  status: number;
  error: PostgrestError | null;
};

const fetchMileageLogs = async ({
  type = 'monthly',
  limit = 12,
}: {
  type: 'hourly' | 'daily' | 'monthly';
  limit: number;
}): Promise<MileageResponse> => {
  const table =
    type === 'hourly' ? 'hourly_mileage' : type === 'daily' ? 'daily_mileage' : 'monthly_mileage';
  const { data, status, error } = await supabase
    .from(table)
    .select('time, value')
    .order('time', { ascending: false })
    .limit(limit);

  if ((error && status !== 406) || (data && data.length === 0) || !data) {
    return {
      data: [],
      status,
      error,
    };
  }

  const mileageLogs: MileageLog[] = data
    .map((item) => {
      return {
        date: item.time,
        value: item.value,
      };
    })
    .reverse();

  return {
    data: mileageLogs,
    status,
    error,
  };
};

export default fetchMileageLogs;
