import { type FC, Fragment } from 'react';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { getUTCMonthShortName } from '@/lib/utils';

const RunningFeatureDetailBarChart: FC = () => {
  const currentDay = new Date().getUTCDate();
  const currentMonth = new Date().getUTCMonth();
  const currentYear = new Date().getUTCFullYear();
  const data = [
    { date: new Date(2022, 5, 1), value: 525.45 },
    { date: new Date(2022, 6, 1), value: 483.02 },
    { date: new Date(2022, 7, 1), value: 517.25 },
    { date: new Date(2022, 8, 1), value: 685.78 },
    { date: new Date(2022, 9, 1), value: 698.62 },
    { date: new Date(2022, 10, 1), value: 687.89 },
    { date: new Date(2022, 11, 1), value: 673.43 },
    { date: new Date(2023, 0, 1), value: 670.37 },
    { date: new Date(2023, 1, 1), value: 544.52 },
    { date: new Date(2023, 2, 1), value: 729.96 },
    { date: new Date(2023, 3, 1), value: 673.57 },
    { date: new Date(2023, 4, 1), value: 171.58 },
  ];
  const processedData = data.map((d) => {
    const month = d.date.getUTCMonth();
    const year = d.date.getUTCFullYear();
    const daysInMonth =
      currentMonth === month && currentYear === year
        ? currentDay
        : 28 + ((0xeefbb3 >> (month << 1)) & 3);

    return {
      date: d.date,
      value: d.value / daysInMonth,
    };
  });

  return (
    <Fragment>
      <div className="font-medium">
        <span className="text-gray-12">{data.reduce((a, b) => a + b.value, 0)}</span>
        <span className="text-xs text-gray-11">km</span>
      </div>
      <div className="mt-0.5 text-xs text-gray-11">
        {`${getUTCMonthShortName(
          data[0].date,
        )} ${data[0].date.getUTCFullYear()} to ${getUTCMonthShortName(
          data[data.length - 1].date,
        )} ${data[data.length - 1].date.getUTCFullYear()}`}
      </div>
      <ResponsiveContainer className="mt-2" width="100%" height="100%">
        <BarChart
          data={processedData}
          margin={{ top: 0, right: -32, left: 0, bottom: -12 }}
          barCategoryGap={4}
        >
          <CartesianGrid strokeDasharray="2 2" stroke="" />
          <XAxis
            dataKey="date"
            axisLine={false}
            padding={{ left: 0, right: 0 }}
            tick={{ fontSize: 12, strokeWidth: 0, fill: '' }}
            tickFormatter={(date) => 'JFMAMJJASOND'.charAt(date.getUTCMonth())}
            tickLine={false}
            tickSize={4}
          />
          <YAxis
            orientation="right"
            axisLine={false}
            padding={{ top: 0, bottom: 0 }}
            tick={{ fontSize: 12, strokeWidth: 0, fill: '' }}
            tickCount={3}
            tickLine={false}
            tickSize={4}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              const monthName = label ? getUTCMonthShortName(label) : '';
              const year = label ? label.getUTCFullYear() : 0;

              return payload && active && payload.length > 0 && payload[0].value ? (
                <div
                  className="items-center rounded border border-gray-6 bg-gray-3 p-2"
                  tabIndex={-1}
                >
                  <div className="font-medium">
                    <span className="text-gray-12">
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                      {Math.round(10 * payload[0].value) / 10}
                    </span>
                    <span className="text-xs text-gray-11">km/day</span>
                  </div>
                  <div className="text-xs text-gray-11">{`${monthName} ${year}`}</div>
                </div>
              ) : null;
            }}
            cursor={{ fill: '' }}
          />
          <Bar
            dataKey="value"
            shape={({ x, y, width, height }) => (
              <path
                className="fill-blue-9"
                d={`M${x} ${y + height}V${2 + y}q0-2 2-2h${width - 4}q2 0 2 2v${height - 2}z`}
              />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </Fragment>
  );
};

export default RunningFeatureDetailBarChart;
