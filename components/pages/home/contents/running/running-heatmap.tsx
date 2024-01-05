import {
  type FC,
  Fragment,
  type PointerEvent,
  type UIEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { TooltipWithBounds, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import clsx from 'clsx';
import { Info } from 'lucide-react';

import type { LengthUnit } from '@/lib/types/units';
import formatValueToPrecision from '@/lib/utils/formatValueToPrecision';

import { Select, Tooltip } from '@/components/ui';

const SQUARE_SIZE = 12;
const GAP = 2;

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type RunningFeatureDetailHeatmapProps = {
  runningLogs: MileageLog[];
  unit: LengthUnit;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const RunningFeatureDetailHeatmap: FC<RunningFeatureDetailHeatmapProps> = ({
  runningLogs,
  unit,
}) => {
  // `log.date` doesn't have to be initialized to a UTC date because we only
  // care about the year (which should stay consistent).
  const yearsLogged = useMemo(
    () =>
      Array.from(new Set(runningLogs.map((log) => new Date(log.date).getFullYear())))
        .sort()
        .reverse(),
    [runningLogs],
  );

  const [year, setYear] = useState<number>(yearsLogged[0]);
  const [scrollIsAtLeft, setScrollIsAtLeft] = useState<boolean>(true);
  const [scrollIsAtRight, setScrollIsAtRight] = useState<boolean>(false);

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

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLFieldSetElement;
    const scrollLeft = target.scrollLeft;
    const scrollWidth = target.scrollWidth;
    const clientWidth = target.clientWidth;

    setScrollIsAtLeft(scrollLeft === 0);
    setScrollIsAtRight(scrollWidth - scrollLeft === clientWidth);
  };

  // First day of the year.
  const firstDay = useMemo(() => new Date(Date.UTC(year, 0, 1)), [year]);
  // The number of days offset from Sunday (i.e. Sunday -> 0, Monday -> 1,
  // etc.).
  const dayOffset = useMemo(() => firstDay.getUTCDay(), [firstDay]);
  const filteredLogs = useMemo(
    () => runningLogs.filter((log) => new Date(log.date).getUTCFullYear() === year),
    [runningLogs, year],
  );
  const logs = useMemo(() => {
    // First day of the year `year`.
    const date = new Date(Date.UTC(year, 0, 1));
    // The array of heatmap squares.
    const days: (MileageLog | null | undefined)[][] = [];

    // Initialize array to `[53][7]`.
    for (let i = 0; i < 7; ++i) {
      days.push(new Array(53).fill(null));
    }

    // Iterate through `arr`
    for (let i = 0; i < filteredLogs.length; ++i) {
      // We first retrieve `currentUTCDate.getUTCDay()` for which row (i.e.
      // which day).
      // `Math.floor(i / 7) + (date.getUTCDay() < dayOffset ? 1 : 0)` gets us
      // the correct ``x'' position. We refer to `dayOffset` that we computed
      // earlier to correctly leave the first few cells null.
      const currentDate = new Date(filteredLogs[i].date);
      const currentUTCDate = new Date(
        Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()),
      );
      days[currentUTCDate.getUTCDay()][Math.floor(i / 7) + (date.getUTCDay() < dayOffset ? 1 : 0)] =
        filteredLogs[i] ? filteredLogs[i] : null;
      date.setUTCDate(date.getUTCDate() + 1);
    }

    const daysInYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 366 : 365;
    for (let i = filteredLogs.length; i < daysInYear; ++i) {
      days[new Date(date).getUTCDay()][Math.floor(i / 7) + (date.getUTCDay() < dayOffset ? 1 : 0)] =
        undefined;
      date.setUTCDate(date.getUTCDate() + 1);
    }

    return days;
  }, [dayOffset, filteredLogs, year]);
  const max = useMemo(() => Math.max(...filteredLogs.map((log) => log.value)), [filteredLogs]);
  const total = useMemo(
    () => filteredLogs.reduce((a, b) => a + unit.scalar * b.value, 0),
    [filteredLogs, unit.scalar],
  );
  const width = useMemo(() => 53 * SQUARE_SIZE + 52 * GAP, []);
  // Add 16 to account for the height of month labels (font size is 12px, and we
  // want a 4px margin).
  const height = useMemo(() => 7 * SQUARE_SIZE + 6 * GAP + 16, []);

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
        <Select
          size="sm"
          variant="primary"
          intent="none"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          aria-label="Select year to view running logs from"
        >
          {yearsLogged.map((year) => (
            <Select.Item key={year}>{year}</Select.Item>
          ))}
        </Select>
      </div>
      <div className="relative">
        <div
          className="hide-scrollbar relative mt-2 overflow-x-scroll"
          tabIndex={-1}
          onScroll={handleScroll}
        >
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
            <desc>Kent Miguel&apos;s running heatmap for {year}</desc>
            {Array(12)
              .fill(null)
              .map((_, month) => {
                const firstDayOfMonth = new Date(Date.UTC(year, month, 1));

                return (
                  <text
                    key={month}
                    x={
                      (SQUARE_SIZE + GAP) *
                      Math.ceil(
                        (86_400 * dayOffset + firstDayOfMonth.getTime() - firstDay.getTime()) /
                          604_800_000,
                      )
                    }
                    y={12}
                    fontSize={12}
                    className="fill-gray-11"
                  >
                    {firstDayOfMonth.toLocaleDateString('en-US', {
                      month: 'short',
                      timeZone: 'UTC',
                    })}
                  </text>
                );
              })}
            {logs.map((log, y) => {
              return (
                <Fragment key={y}>
                  {log.map((day, x) => {
                    if (day === null) return null;

                    const props = {
                      // Add 16 to account for the height of month labels (font
                      // size is 12px, and we want a 4px margin).
                      d: `M${(SQUARE_SIZE + GAP) * x + 2} ${(SQUARE_SIZE + GAP) * y + 0.5 + 16}h${
                        SQUARE_SIZE - 4
                      }q1.5 0 1.5 1.5v${SQUARE_SIZE - 4}q0 1.5-1.5 1.5h-${
                        SQUARE_SIZE - 4
                      }q-1.5 0-1.5-1.5v-${SQUARE_SIZE - 4}q0-1.5 1.5-1.5z`,
                      ...(day === undefined
                        ? {}
                        : {
                            fillOpacity: max > 0 ? day.value / max : 0,
                            'data-date': day.date,
                            'data-value': day.value,
                          }),
                    };

                    return (
                      <path
                        key={`running-heatmap-${x}-${y}`}
                        className={clsx(
                          'stroke stroke-gray-7 transition-colors hover:stroke-gray-8',
                          day === undefined ? 'fill-transparent' : 'fill-blue-9',
                        )}
                        {...props}
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
                timeZone: 'UTC', // Explicitly set the timezone to UTC
              })}
            </TooltipWithBounds>
          ) : null}
        </div>

        {/* Left gradient to hide overflow */}
        <div
          className={clsx(
            'pointer-events-none absolute bottom-0 left-0 h-[112px] w-4 bg-gradient-to-r from-gray-3 transition-opacity',
            scrollIsAtLeft ? 'opacity-0' : 'opacity-100',
          )}
        />
        {/* Right gradient to hide overflow */}
        <div
          className={clsx(
            'pointer-events-none absolute bottom-0 right-0 h-[112px] w-4 bg-gradient-to-l from-gray-3 transition-opacity',
            scrollIsAtRight ? 'opacity-0' : 'opacity-100',
          )}
        />
      </div>
      <div className="flex grow items-end justify-end space-x-2">
        <div className="flex items-center space-x-1 text-xs text-gray-11">
          <span>Less</span>
          <svg
            width="68"
            height="12"
            viewBox="0 0 68 12"
            xmlns="http://www.w3.org/2000/svg"
            role="note"
          >
            <path
              id="a"
              d="M58 .5h8q1.5 0 1.5 1.5v8q0 1.5-1.5 1.5h-8q-1.5 0-1.5-1.5V2Q56.5.5 58 .5z"
              className="stroke fill-blue-9 stroke-gray-7"
            />
            <use xlinkHref="#a" transform="translate(-14)" fillOpacity="0.75" />
            <use xlinkHref="#a" transform="translate(-28)" fillOpacity="0.5" />
            <use xlinkHref="#a" transform="translate(-42)" fillOpacity="0.25" />
            <use xlinkHref="#a" transform="translate(-56)" fillOpacity="0" />
          </svg>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default RunningFeatureDetailHeatmap;
