'use client';

import { useMemo } from 'react';

import { useDistanceUnitIndexStore } from './client-components';
import { DAILY_RUNNING_MILEAGE } from './data';
import {
  //Line,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from 'recharts';

import { LENGTH_UNITS } from '@/lib/constants/units';
import { formatValueToPrecision } from '@/lib/utils';

const OverviewScatterPlot: React.FC = () => {
  const { index } = useDistanceUnitIndexStore();

  const unit = LENGTH_UNITS[index];

  const scatterData = useMemo(() => {
    return DAILY_RUNNING_MILEAGE.map((d) => {
      const date = d.time;
      const utcDate = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
      );

      return {
        time: utcDate,
        value: unit.scalar * d.value,
      };
    });
  }, [unit.scalar]);

  // Compute moving average of 28 days.
  /* const lineData = useMemo(() => {
    return scatterData.map((d, i) => {
      const start = Math.max(0, i - 28);
      const end = Math.min(scatterData.length, i + 28);
      const sum = scatterData.slice(start, end).reduce((a, b) => a + b.value, 0);
      return {
        time: d.time,
        value: sum / 28,
      };
    });
  }, [scatterData]); */

  const unitName = useMemo(
    () => `${unit.spaceBefore ? ' ' : ''}${unit.name}`,
    [unit.name, unit.spaceBefore],
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart data={scatterData} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        <XAxis dataKey="time" axisLine={false} tickLine={false} tickSize={4} hide />
        <YAxis dataKey="value" axisLine={false} tickLine={false} tickSize={4} hide />
        <RechartTooltip
          content={({ active, payload }) => {
            if (
              !payload ||
              payload.length === 0 ||
              !active ||
              !payload[0]?.payload?.time ||
              !payload[0]?.payload?.value
            ) {
              return null;
            }

            return (
              <div
                className="items-center rounded border border-gray-6 bg-gray-3 p-2"
                tabIndex={-1}
              >
                <div className="font-medium">
                  <span className="text-base text-gray-12">
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    {formatValueToPrecision(payload[0].payload.value, 2, false)}
                  </span>
                  <span className="text-xs text-gray-11">{unitName}</span>
                </div>
                <div className="text-xs text-gray-11">
                  {payload[0].payload.time.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    timeZone: 'UTC',
                    year: 'numeric',
                  })}
                </div>
              </div>
            );
          }}
        />
        <Scatter
          dataKey="value"
          fill="red"
          /* @ts-expect-error The type for `Scatter` should be correct. */
          shape={({ x, y }) => (
            <circle className="z-10 fill-blue-9/20" cx={x + 4.5} cy={y + 4.5} r="2" />
          )}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default OverviewScatterPlot;
