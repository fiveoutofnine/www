'use client';

import { Fragment, useMemo } from 'react';

import { useDistanceUnitIndexStore } from './client-components';
import { DAILY_RUNNING_MILEAGE } from './data';
import {
  Area,
  AreaChart,
  Tooltip as RechartTooltip,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { LENGTH_UNITS } from '@/lib/constants/units';
import { formatValueToPrecision } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const radixColors = require('@radix-ui/colors');

const OverviewAreaChart: React.FC = () => {
  const { index } = useDistanceUnitIndexStore();

  const unit = LENGTH_UNITS[index];

  const sortedData = useMemo(
    () => [...DAILY_RUNNING_MILEAGE].sort((a, b) => a.value - b.value),
    [],
  );

  const [data, dataMax] = useMemo(
    () => [
      [
        { count: 0, value: 0 },
        ...sortedData.map((d, i) => {
          return {
            count: i + 1,
            value: d.value,
          };
        }),
      ],
      sortedData[sortedData.length - 1].value,
    ],
    [sortedData],
  );

  const unitName = useMemo(
    () => `${unit.spaceBefore ? ' ' : ''}${unit.name}`,
    [unit.name, unit.spaceBefore],
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        tabIndex={-1}
        className="focus:outline-none"
      >
        <XAxis
          dataKey="value"
          type="number"
          axisLine={false}
          tickLine={false}
          tickSize={4}
          domain={[0, dataMax]}
          hide
        />
        <YAxis
          dataKey="count"
          axisLine={false}
          tickLine={false}
          tickSize={4}
          domain={[0, data.length]}
          hide
        />
        <RechartTooltip
          content={({ active, payload }) => {
            if (
              !payload ||
              payload.length === 0 ||
              !active ||
              !payload[0]?.payload?.count ||
              !payload[0]?.payload?.value
            ) {
              return null;
            }

            return (
              <div
                className="z-30 items-center rounded-md border border-gray-6 bg-gray-2 p-2 text-sm leading-normal shadow-md animate-in fade-in"
                tabIndex={-1}
              >
                <div className="font-medium">
                  <span className="text-gray-12">
                    {(data.length - payload[0].payload.count).toLocaleString()}
                    <span className="text-gray-11"> runs ≥ </span>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    {formatValueToPrecision(unit.scalar * payload[0].payload.value, 2, false)}
                  </span>
                  <span className="text-xs leading-4 text-gray-11">{unitName}</span>
                </div>
              </div>
            );
          }}
        />
        <Area
          type="monotone"
          dataKey="count"
          fill={radixColors.blueDark.blue3}
          stroke={radixColors.blueDark.blue9}
          activeDot={{ stroke: radixColors.blueDark.blue11, strokeWidth: 1, r: 3 }}
        />
        {[0.25, 0.5, 0.75, 0.95].map((y) => (
          <ReferenceLine
            key={y}
            y={(1 - y) * (data.length - 1)}
            stroke={radixColors.crimsonDark.crimson8}
            /* strokeDasharray="2 2" */
            label={({ viewBox }) => {
              const value = unit.scalar * sortedData[Math.floor((1 - y) * (data.length - 1))].value;
              const [valueA, valueB] = formatValueToPrecision(value, 2, false).split('.');

              return (
                <Fragment>
                  <rect
                    x={6}
                    /* `12.0167 + 2` */
                    y={viewBox.y - 14.0167}
                    /* `17.4167 + 3` */
                    width={20.4167}
                    height={12.0167}
                    fill={radixColors.crimsonDark.crimson9}
                    rx={2.5}
                  />
                  <text
                    className="fill-white font-mono"
                    x={9}
                    y={viewBox.y - 5}
                    fontSize={8}
                    dominantBaseline="auto"
                  >
                    p{(y * 100).toFixed(0)}
                  </text>
                  <text
                    key={unit.name}
                    className="animate-bg-pulse font-mono"
                    x={viewBox.width - 6}
                    y={viewBox.y - 4}
                    textAnchor="end"
                    dominantBaseline="auto"
                    fontSize={10}
                  >
                    <tspan fill={radixColors.grayDark.gray12}>{valueA}</tspan>
                    <tspan fill={radixColors.grayDark.gray11}>.</tspan>
                    <tspan fill={radixColors.grayDark.gray12}>{valueB.padEnd(2, '0')}</tspan>
                    <tspan fill={radixColors.grayDark.gray11} fontSize={8}>
                      {unitName}
                    </tspan>
                  </text>
                </Fragment>
              );
            }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default OverviewAreaChart;
