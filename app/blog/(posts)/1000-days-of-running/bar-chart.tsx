'use client';

import { Fragment, useMemo } from 'react';

import { useDistanceUnitIndexStore } from './client-components';
import { MONTHLY_MILEAGE } from './data';
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

import { LENGTH_UNITS } from '@/lib/constants/units';
import { formatValueToPrecision } from '@/lib/utils';

import { Tooltip } from '@/components/ui';

const OverviewBarChart: React.FC = () => {
  const { index } = useDistanceUnitIndexStore();

  const unit = LENGTH_UNITS[index];

  const [data, totalDays] = useMemo(() => {
    let totalDays = 0;
    const data = MONTHLY_MILEAGE.map((d) => {
      const date = d.time;
      const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));

      const month = utcDate.getUTCMonth();
      const year = utcDate.getUTCFullYear();
      const daysInMonth =
        month === 5 && year === 2025
          ? 26
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
  }, []);

  // We scale to calculate average monthly mileage.
  const total = useMemo(
    () => MONTHLY_MILEAGE.reduce((a, b) => a + unit.scalar * b.value, 0) / totalDays,
    [MONTHLY_MILEAGE, totalDays, unit.scalar],
  );

  const unitName = useMemo(
    () => `${unit.spaceBefore ? ' ' : ''}${unit.name}`,
    [unit.name, unit.spaceBefore],
  );

  return (
    <Fragment>
      <div className="absolute left-1.5 top-1.5 z-20 text-sm font-medium tracking-tight underline decoration-dotted">
        <span className="text-base text-gray-12">{formatValueToPrecision(total, 2, false)}</span>
        <span className="text-xs text-gray-11">
          {unitName + ' '}
          {unit.description ? (
            <Tooltip
              content={unit.description}
              sideOffset={0}
              inverted
              triggerProps={{
                className:
                  'rounded-full size-2.5 transition-colors hover:text-gray-12 inline-flex items-center justify-center',
              }}
            >
              <Info className="size-2.5" />
            </Tooltip>
          ) : null}
        </span>
      </div>
      <div className="absolute left-0 top-0 h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: -1, left: 0, right: 0, bottom: -1 }}
            barCategoryGap={4}
          >
            <CartesianGrid />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tickSize={4} hide />
            <YAxis axisLine={false} tickCount={3} tickLine={false} tickSize={4} hide />
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
                      <span className="text-base text-gray-12">
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        {formatValueToPrecision(payload[0].value, 2, false)}
                      </span>
                      <span className="text-xs text-gray-11">{`${unit.name}/day`}</span>
                    </div>
                    <div className="text-xs text-gray-11">{`${monthName} ${year}`}</div>
                  </div>
                ) : null;
              }}
            />
            <Bar
              dataKey="value"
              /* @ts-expect-error The type for `Bar` should be correct. */
              shape={({ x, y, width, height }) => (
                <path
                  className="fill-blue-9"
                  // Note: we compute a 0.5px offset so the bar doesn't overlap
                  // with the x-axis.
                  d={`M${x - 3 * width} ${y + height - 0.5}V${2 + y}q0-2 2-2h${3 * width}q2 0 2 2v${height - 2.5}`}
                />
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Fragment>
  );
};

export default OverviewBarChart;
