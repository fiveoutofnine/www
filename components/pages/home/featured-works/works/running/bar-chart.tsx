import { type FC, Fragment } from 'react';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const RunningFeatureDetailBarChart: FC = () => {
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
  const SHORT_MONTH_NAMES = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <Fragment>
      <div className="font-medium">
        <span className="text-gray-12">{data.reduce((a, b) => a + b.value, 0)}</span>
        <span className="text-xs text-gray-11">km</span>
      </div>
      <div className="mt-0.5 text-xs text-gray-11">
        {`${SHORT_MONTH_NAMES[data[0].date.getUTCMonth()]} ${data[0].date.getUTCFullYear()} to ${
          SHORT_MONTH_NAMES[data[data.length - 1].date.getUTCMonth()]
        } ${data[data.length - 1].date.getUTCFullYear()}`}
      </div>
      <ResponsiveContainer className="mt-2" width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 0, right: -32, left: 0, bottom: -12 }}
          barCategoryGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 20.5%)" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tick={{ fontSize: 12, strokeWidth: 0, fill: 'hsl(0, 0%, 62.8%)' }}
            tickFormatter={(date) => 'JFMAMJJASOND'.charAt(date.getUTCMonth())}
            tickLine={false}
            tickSize={4}
            padding={{ left: 0, right: 0 }}
          />
          <YAxis
            orientation="right"
            axisLine={false}
            tick={{ fontSize: 12, strokeWidth: 0, fill: 'hsl(0, 0%, 62.8%)' }}
            tickLine={false}
            tickSize={4}
            padding={{ top: 0, bottom: 0 }}
          />
          <Tooltip
            wrapperClassName="focus:outline-none"
            content={({ active, payload, label }) => {
              const month = label ? label.getUTCMonth() : 0;
              const year = label ? label.getUTCFullYear() : 0;
              // eslint-disable-next-line
              // @ts-ignore
              const daysInMonth = 28 + (month !== 1) * ((2 + (0xadd5 >> month)) & 1);

              return payload && active && payload.length > 0 && payload[0].value ? (
                <div className="items-center rounded border border-gray-6 bg-gray-3 p-2">
                  <div className="font-medium">
                    <span className="text-gray-12">
                      {Math.round((10 * payload[0].value) / daysInMonth) / 10}
                    </span>
                    <span className="text-xs text-gray-11">km/day</span>
                  </div>
                  <div className="text-xs text-gray-11">{`${SHORT_MONTH_NAMES[month]} ${year}`}</div>
                </div>
              ) : null;
            }}
            cursor={{ fill: 'hsla(0, 0%, 17.9%)' }}
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
