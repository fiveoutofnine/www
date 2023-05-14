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
import { formatValueToPrecision, getUTCMonthShortName } from '@/lib/utils';

import { Tooltip } from '@/components/ui';

/* Props */
type RunningFeatureDetailBarChartProps = {
  mileageLogs: MileageLog[];
  unit: LengthUnit;
};

/* Component */
const RunningFeatureDetailBarChart: FC<RunningFeatureDetailBarChartProps> = ({
  mileageLogs,
  unit,
}) => {
  const [yAxisWidth, setYAxisWidth] = useState<number>(20.43);

  const currentDay = new Date().getUTCDate();
  const currentMonth = new Date().getUTCMonth();
  const currentYear = new Date().getUTCFullYear();

  // Calculate the average distance per day for each month.
  const processedData = useMemo(
    () =>
      mileageLogs.map((d) => {
        const date = new Date(d.date);

        const month = date.getUTCMonth();
        const year = date.getUTCFullYear();
        const daysInMonth =
          currentMonth === month && currentYear === year
            ? currentDay
            : // `0xeefbb3 = (3 << 22) | (2 << 20) | ... | (0 << 2) | (3 << 0)`
              28 + ((0xeefbb3 >> (month << 1)) & 3);

        return {
          date: date,
          value: (unit.scalar * d.value) / daysInMonth,
        };
      }),
    [currentDay, currentMonth, currentYear, mileageLogs, unit.scalar],
  );
  const total = useMemo(
    () => mileageLogs.reduce((a, b) => a + unit.scalar * b.value, 0),
    [mileageLogs, unit.scalar],
  );

  // Work around to resize y-axis width because Recharts y-axis width is not
  // calculated automatically.
  useEffect(() => {
    const yAxis = document.getElementsByClassName('recharts-cartesian-axis recharts-yAxis')[0];
    setYAxisWidth(yAxis ? (yAxis as SVGGraphicsElement)?.getBoundingClientRect().width + 4 : 20.43);
  }, [processedData]);

  return (
    <Fragment>
      <div className="font-medium">
        <span className="text-gray-12">{formatValueToPrecision(total, 2, false)}</span>
        <span className="text-xs text-gray-11">
          {`${unit.spaceBefore ? ' ' : ''}${unit.name}`}{' '}
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
        {processedData.length > 0
          ? `${getUTCMonthShortName(
              processedData[0].date,
            )} ${processedData[0].date.getUTCFullYear()} to ${getUTCMonthShortName(
              processedData[processedData.length - 1].date,
            )} ${processedData[processedData.length - 1].date.getUTCFullYear()}`
          : 'No data'}
      </div>
      <ResponsiveContainer className="mt-2" width="100%" height="100%">
        <BarChart data={processedData} margin={{ top: 0, left: 0, bottom: -14 }} barCategoryGap={4}>
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
                      {formatValueToPrecision(payload[0].value, 2, false)}
                    </span>
                    <span className="text-xs text-gray-11">
                      {`${unit.spaceBefore ? ' ' : ''}${unit.name}`}/day
                    </span>
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
