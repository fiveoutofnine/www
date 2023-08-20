import { type FC, Fragment, useEffect, useMemo, useState } from 'react';

import { Info } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import type { MileageLog } from '@/lib/types/running';
import type { LengthUnit } from '@/lib/types/units';
import { formatValueToPrecision } from '@/lib/utils';

import { Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type RunningFeatureDetailBarChartProps = {
  mileageLogs: MileageLog[];
  unit: LengthUnit;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const RunningFeatureDetailBarChart: FC<RunningFeatureDetailBarChartProps> = ({
  mileageLogs,
  unit,
}) => {
  // 20.43 is a precomputed value to fit the width when the unit is set to km.
  const [yAxisWidth, setYAxisWidth] = useState<number>(20.43);

  const currentDay = new Date().getUTCDate();
  const currentMonth = new Date().getUTCMonth();
  const currentYear = new Date().getUTCFullYear();

  // Calculate the average distance per day for each month.
  const [data, totalDays] = useMemo(() => {
    let totalDays = 0;
    const data = mileageLogs.map((d) => {
      const date = new Date(d.date);
      const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));

      const month = utcDate.getUTCMonth();
      const year = utcDate.getUTCFullYear();
      const daysInMonth =
        currentMonth === month && currentYear === year
          ? currentDay
          : // `0xeefbb3 = (3 << 22) | (2 << 20) | ... | (0 << 2) | (3 << 0)`
            28 +
            ((0xeefbb3 >> (month << 1)) & 3) +
            // Add 1 if it's a leap year and the month is February.
            ((year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) && month === 1 ? 1 : 0);
      totalDays += daysInMonth;

      return {
        date: utcDate,
        value: (unit.scalar * d.value) / daysInMonth,
      };
    });

    return [data, totalDays];
  }, [currentDay, currentMonth, currentYear, mileageLogs, unit.scalar]);
  // We scale to annualized mileage.
  const total = useMemo(
    () => (365 * mileageLogs.reduce((a, b) => a + unit.scalar * b.value, 0)) / totalDays,
    [mileageLogs, totalDays, unit.scalar],
  );

  const unitName = useMemo(
    () => `${unit.spaceBefore ? ' ' : ''}${unit.name}`,
    [unit.name, unit.spaceBefore],
  );

  // Work around to resize y-axis width because Recharts y-axis width is not
  // calculated automatically.
  useEffect(() => {
    const yAxis = document.getElementsByClassName('recharts-cartesian-axis recharts-yAxis')[0];
    setYAxisWidth(yAxis ? (yAxis as SVGGraphicsElement)?.getBoundingClientRect().width + 4 : 20.43);
  }, [data]);

  return (
    <Fragment>
      <div className="font-medium">
        <Tooltip
          content={`${formatValueToPrecision(total / 365, 2, false)}${unitName}/day`}
          sideOffset={0}
        >
          <span className="text-gray-12">{formatValueToPrecision(total, 2, false)}</span>
        </Tooltip>
        <span className="text-xs text-gray-11">
          {unitName + ' '}
          {unit.description ? (
            <Tooltip content={unit.description} sideOffset={0}>
              <span>
                <Info className="inline h-2.5 w-2.5" />
              </span>
            </Tooltip>
          ) : null}
        </span>
      </div>
      <div className="mt-0.5 text-xs text-gray-11">
        {data.length > 0
          ? `${data[0].date.toLocaleDateString('en-US', {
              month: 'short',
              timeZone: 'UTC',
            })} ${data[0].date.getUTCFullYear()} to ${data[data.length - 1].date.toLocaleDateString(
              'en-US',
              { month: 'short', timeZone: 'UTC' },
            )} ${data[data.length - 1].date.getUTCFullYear()}`
          : 'No data'}
      </div>
      <ResponsiveContainer className="mt-2" width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, left: 0, bottom: -14 }} barCategoryGap={4}>
          <CartesianGrid />
          <XAxis
            dataKey="date"
            axisLine={false}
            padding={{ left: 0, right: 0 }}
            tick={{ fontSize: 12, strokeWidth: 0 }}
            tickFormatter={(date) => 'JFMAMJJASOND'.charAt(date.getUTCMonth())}
            tickLine={false}
            tickSize={4}
          />
          {
            <YAxis
              orientation="right"
              axisLine={false}
              padding={{ top: 0, bottom: 0 }}
              width={yAxisWidth}
              tick={{ fontSize: 12, strokeWidth: 0 }}
              tickCount={3}
              tickFormatter={(value) => formatValueToPrecision(value, 1, true)}
              tickLine={false}
              tickSize={4}
            />
          }
          <RechartTooltip
            content={({ active, payload, label }) => {
              const monthName = label
                ? label.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })
                : '';
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
                      {formatValueToPrecision(payload[0].value, 2, false)}
                    </span>
                    <span className="text-xs text-gray-11">{`${unitName}/day`}</span>
                  </div>
                  <div className="text-xs text-gray-11">{`${monthName} ${year}`}</div>
                </div>
              ) : null;
            }}
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
