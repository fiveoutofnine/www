import type { MileageLog } from '@/lib/types/running';

type RunningResponse = {
  data: MileageLog[];
  status: number;
  error: Error | null;
};

const fetchRunningLogs = async (): Promise<RunningResponse> => {
  const response = await fetch(
    `https://content-sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETS_ID_RUNNING}/values/Log!B5:C?` +
      new URLSearchParams({
        valueRenderOption: 'FORMATTED_VALUE',
        dateTimeRenderOption: 'FORMATTED_STRING',
        majorDimension: 'ROWS',
        key: process.env.GOOGLE_SHEETS_API_KEY_RUNNING,
      }),
  );

  if (!response.ok) {
    return {
      data: [],
      status: response.status,
      error: new Error(response.statusText),
    };
  }

  const data = await response.json();

  if (!data.values) {
    return {
      data: [],
      status: 200,
      error: null,
    };
  }

  const typedData = data.values as string[][];

  const runningLogs: MileageLog[] = typedData
    .filter((item) => item.length === 2)
    .map((log) => ({
      date: log[0],
      value: parseFloat(log[1]),
    }));

  return { data: runningLogs, status: 200, error: null };
};

export default fetchRunningLogs;
