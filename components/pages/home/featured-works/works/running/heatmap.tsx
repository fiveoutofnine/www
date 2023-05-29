import { type FC, Fragment, type PointerEvent, useCallback, useMemo, useState } from 'react';

import { TooltipWithBounds, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { ChevronDown, Info } from 'lucide-react';

import type { MileageLog } from '@/lib/types/running';
import type { LengthUnit } from '@/lib/types/units';
import { formatValueToPrecision } from '@/lib/utils';

import { Button, Tooltip } from '@/components/ui';

/* Props */
type RunningFeatureDetailHeatmapProps = {
  runningLogs: MileageLog[];
  unit: LengthUnit;
};

const SQUARE_SIZE = 12;
const GAP = 2;

/* Component */
const RunningFeatureDetailHeatmap: FC<RunningFeatureDetailHeatmapProps> = ({
  runningLogs,
  unit,
}) => {
  const [year, setYear] = useState<number>(2023);

  const { containerRef, containerBounds } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });

  const { showTooltip, hideTooltip, tooltipOpen, tooltipLeft, tooltipTop, tooltipData } =
    useTooltip<string>({
      tooltipOpen: true,
      tooltipLeft: undefined,
      tooltipTop: undefined,
    });

  const handlePointerMove = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      // Coordinates should be relative to the container
      const tooltipLeft = ('clientX' in event ? event.clientX : 0) - containerBounds.left;
      const tooltipTop = ('clientY' in event ? event.clientY : 0) - containerBounds.top;

      // Read `data-value` attribute from the target element
      const targetNode = event.target as SVGPathElement;
      const dataDate = targetNode.getAttribute('data-date') ?? undefined;
      const dataValue = targetNode.getAttribute('data-value') ?? undefined;
      const tooltipData =
        dataDate !== undefined && dataValue !== undefined
          ? JSON.stringify({
              date: dataDate,
              value: formatValueToPrecision(unit.scalar * Number(dataValue), 2, false),
            })
          : undefined;
      showTooltip({ tooltipLeft, tooltipTop, tooltipData });
    },
    [containerBounds.left, containerBounds.top, unit.scalar, showTooltip],
  );

  const filteredLogs = useMemo(
    () => runningLogs.filter((log) => new Date(log.date).getUTCFullYear() === year),
    [runningLogs, year],
  );
  const logs = useMemo(() => {
    // First day of the year `year`.
    const date = new Date(year, 0, 1);
    // The number of days offset from Sunday (i.e. Sunday -> 0, Monday -> 1,
    // etc.).
    const offset = date.getDay();
    // The array of heatmap squares.
    const days: (MileageLog | null | undefined)[][] = [];

    // Initialize array to `[53][7]`.
    for (let i = 0; i < 7; ++i) {
      days.push(new Array(53).fill(null));
    }

    // Iterate through `arr`
    for (let i = 0; i < filteredLogs.length; ++i) {
      // We first retrieve `date.getDay()` for which row (i.e. which day).
      // `Math.floor(i / 7) + (date.getDay() < offset ? 1 : 0)` gets us the
      // correct ``x'' position. We refer to `offset` that we computed earlier
      // to correctly leave the first few cells null.
      days[new Date(filteredLogs[i].date).getDay()][
        Math.floor(i / 7) + (date.getDay() < offset ? 1 : 0)
      ] = filteredLogs[i] ? filteredLogs[i] : null;
      date.setDate(date.getDate() + 1);
    }

    const daysInYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 366 : 365;
    for (let i = filteredLogs.length; i < daysInYear; ++i) {
      days[new Date(date).getDay()][Math.floor(i / 7) + (date.getDay() < offset ? 1 : 0)] =
        undefined;
      date.setDate(date.getDate() + 1);
    }

    return days;
  }, [filteredLogs, year]);
  const max = useMemo(() => Math.max(...filteredLogs.map((log) => log.value)), [filteredLogs]);
  const total = useMemo(
    () => filteredLogs.reduce((a, b) => a + unit.scalar * b.value, 0),
    [filteredLogs, unit.scalar],
  );
  const width = useMemo(() => 53 * SQUARE_SIZE + 52 * GAP + 8, []);
  const height = useMemo(() => 7 * SQUARE_SIZE + 6 * GAP, []);

  return (
    <div className="flex h-full flex-col p-2">
      <div className="flex items-center justify-between">
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
        <Button size="sm" variant="outline" rightIcon={<ChevronDown />}>
          {year}
        </Button>
      </div>
      <div className="hide-scrollbar relative mt-1 overflow-x-scroll rounded border border-gray-6 p-2">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
          role="figure"
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onMouseLeave={hideTooltip}
        >
          <desc>5/9&apos;s running heatmap for {year}</desc>
          {logs.map((log, y) => {
            return (
              <Fragment key={y}>
                {log.map((day, x) => {
                  if (day === null) return null;

                  if (day === undefined) {
                    return (
                      <path
                        key={`${x}-${y}`}
                        d={`M${(SQUARE_SIZE + GAP) * x + 2} ${(SQUARE_SIZE + GAP) * y + 0.5}h${
                          SQUARE_SIZE - 4
                        }q1.5 0 1.5 1.5v${SQUARE_SIZE - 4}q0 1.5-1.5 1.5h-${
                          SQUARE_SIZE - 4
                        }q-1.5 0-1.5-1.5v-${SQUARE_SIZE - 4}q0-1.5 1.5-1.5z`}
                        className="stroke fill-transparent stroke-gray-7 transition-colors hover:stroke-gray-8"
                      />
                    );
                  }

                  return (
                    <path
                      key={day.date}
                      d={`M${(SQUARE_SIZE + GAP) * x + 2} ${(SQUARE_SIZE + GAP) * y + 0.5}h${
                        SQUARE_SIZE - 4
                      }q1.5 0 1.5 1.5v${SQUARE_SIZE - 4}q0 1.5-1.5 1.5h-${
                        SQUARE_SIZE - 4
                      }q-1.5 0-1.5-1.5v-${SQUARE_SIZE - 4}q0-1.5 1.5-1.5z`}
                      className="stroke fill-blue-9 stroke-gray-7 transition-colors hover:stroke-gray-8"
                      fillOpacity={day.value / max}
                      data-date={day.date}
                      data-value={day.value}
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </svg>
        {tooltipOpen &&
        tooltipLeft !== undefined &&
        tooltipTop !== undefined &&
        tooltipData !== undefined ? (
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            offsetLeft={-SQUARE_SIZE}
            className="pointer-events-none absolute left-0 top-0 z-50 rounded border border-gray-6 bg-gray-3 px-2 py-1 text-sm text-gray-12 shadow-md transition-colors"
            style={{}}
          >
            {JSON.parse(tooltipData).value}
            {unit.spaceBefore ? ' ' : ''}
            <span className="text-gray-11">{unit.name} on</span>{' '}
            {new Date(JSON.parse(tooltipData).date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </TooltipWithBounds>
        ) : null}
      </div>
    </div>
  );
};

export default RunningFeatureDetailHeatmap;
