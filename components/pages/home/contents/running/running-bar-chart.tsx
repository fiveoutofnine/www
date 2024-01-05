/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Fragment, useEffect, useMemo, useState } from 'react';

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

import formatValueToPrecision from '@/lib/utils/formatValueToPrecision';

import { Tooltip } from '@/components/ui';

export default function RunningBarChart({
  runMonthlyData,
  unit,
}: {
  runMonthlyData: MonthlyData[];
  unit: LengthUnit;
}) {
  //20.43 is a precomputed value to fit the width when the unit is set to km.
  const [yAxisWidth, setYAxisWidth] = useState<number>(20.43);

  const currentDay = new Date().getUTCDate();
  const currentMonth = new Date().getUTCMonth();
  const currentYear = new Date().getUTCFullYear();

  // Calculate the average distance per day for each month.
  const [data, totalDays] = useMemo(() => {
    let totalDays = 0;
    const data = runMonthlyData.map((d) => {
      const date = new Date(d.year, Number(d.date) - 1, 1);
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
  }, [currentDay, currentMonth, currentYear, runMonthlyData, unit.scalar]);

  // We scale to annualized mileage.
  const total = useMemo(
    () => (365 * runMonthlyData.reduce((a, b) => a + unit.scalar * b.value, 0)) / totalDays,
    [runMonthlyData, totalDays, unit.scalar],
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
        <span className="text-gray-11 text-xs">
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
      <div className="text-gray-11 mt-0.5 text-xs">
        {data.length > 0
          ? `${data[0].date.toLocaleDateString('en-US', {
              month: 'short',
              timeZone: 'UTC',
            })} ${data[0].date.getUTCFullYear()} to ${data[data.length - 1].date.toLocaleDateString(
              'en-US',
              {
                month: 'short',
                timeZone: 'UTC',
              },
            )} ${data[data.length - 1].date.getUTCFullYear()}`
          : 'No data'}
      </div>
      {/** Will need to adjust height to 100% after completion of heatmap */}
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
              tickFormatter={(value) => formatValueToPrecision(value, 1, true)}
              tickCount={3}
              tickLine={false}
              tickSize={4}
            />
          }
          <RechartTooltip
            content={({ active, payload, label }) => {
              const monthName = label
                ? label.toLocaleDateString('en-US', {
                    month: 'short',
                    timeZone: 'UTC',
                  })
                : '';
              const year = label ? label.getUTCFullYear() : 0;

              return payload && active && payload.length > 0 && payload[0].value ? (
                <div
                  className="border-gray-6 bg-gray-3 items-center rounded border p-2"
                  tabIndex={-1}
                >
                  <div className="font-medium">
                    <span className="text-gray-12">
                      {/* @ts-ignore */}
                      {formatValueToPrecision(payload[0].value, 2, false)}
                    </span>
                    <span className="text-gray-11 text-xs">{`${unitName}/day`}</span>
                  </div>
                  <div className="text-gray-11 text-xs">{`${monthName} ${year}`}</div>
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
}
