'use client';

import { Fragment, useMemo } from 'react';

import { useDistanceUnitIndexStore } from './client-components';
import { DAILY_RUNNING_MILEAGE } from './data';
import { Info } from 'lucide-react';
import {
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
} from 'recharts';

import { LENGTH_UNITS } from '@/lib/constants/units';
import { formatValueToPrecision } from '@/lib/utils';

import { Tooltip } from '@/components/ui';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const radixColors = require('@radix-ui/colors');

const OverviewScatterPlot: React.FC = () => {
  const { index } = useDistanceUnitIndexStore();

  const unit = LENGTH_UNITS[index];

  const data = useMemo(() => {
    const data = DAILY_RUNNING_MILEAGE.map((d) => {
      const date = d.time;
      const utcDate = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
      );

      return {
        time: utcDate,
        value: d.value,
      };
    }, []);

    return data.map(({ time, value }, i) => {
      const last28Total = data.slice(Math.max(0, i - 28), i).reduce((a, b) => a + b.value, 0);

      return {
        time,
        value,
        ma: last28Total / 28,
      };
    });
  }, []);

  const unitName = useMemo(
    () => `${unit.spaceBefore ? ' ' : ''}${unit.name}`,
    [unit.name, unit.spaceBefore],
  );

  const total = useMemo(() => 7 * (data.reduce((a, b) => a + b.value, 0) / data.length), [data]);

  return (
    <Fragment>
      <div
        key={unit.name}
        className="absolute left-2 top-2 z-30 animate-bg-pulse text-sm font-medium tracking-tight"
      >
        <span className="text-base text-gray-12">
          {formatValueToPrecision(unit.scalar * total, 2, false)}
        </span>
        <span className="text-xs text-gray-11">
          {unitName + '/week '}
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
      <ResponsiveContainer
        className="pointer-events-none absolute left-0 top-0 z-20"
        width="100%"
        height="100%"
      >
        <ComposedChart
          className="focus:outline-none"
          data={data}
          margin={{ top: -1, left: -1, right: -1, bottom: -1 }}
          tabIndex={-1}
        >
          <Scatter
            dataKey="value"
            shape={() => null}
          />
          <Line
            className="pointer-events-none"
            dataKey="ma"
            stroke={radixColors.blueDark.blue9}
            strokeWidth={2}
            dot={false}
            activeDot={false}
            type="monotone"
          />
        </ComposedChart>
      </ResponsiveContainer>
      <ResponsiveContainer className="absolute left-0 top-0 z-10" width="100%" height="100%">
        <ScatterChart
          className="focus:outline-none"
          data={data}
          margin={{ top: -1, left: -1, right: -1, bottom: -1 }}
          tabIndex={-1}
        >
          <CartesianGrid className="stroke-gray-6" strokeDasharray="3 3" />
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
                  className="z-30 items-center rounded-md border border-gray-6 bg-gray-2 p-2 leading-normal shadow-md animate-in fade-in"
                  tabIndex={-1}
                >
                  <div className="font-medium">
                    <span className="text-base text-gray-12">
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                      {formatValueToPrecision(unit.scalar * payload[0].payload.value, 2, false)}
                    </span>
                    <span className="text-xs text-gray-11">{unitName}</span>
                  </div>
                  <div className="text-xs leading-4 text-gray-11">
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
            shape={({ x = 0, y = 0 }) => (
              <circle className="fill-gray-9/20" cx={x + 4.5} cy={y + 4.5} r="2" />
            )}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </Fragment>
  );
};

export default OverviewScatterPlot;
