import { type FC, useMemo, useState } from 'react';

import type { MileageLog } from '@/lib/types/running';
import type { LengthUnit } from '@/lib/types/units';
import { formatValueToPrecision } from '@/lib/utils';

import { Tooltip } from '@/components/ui';

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
  const [year, setYear] = useState<number>(2022);

  const filteredLogs = useMemo(
    () => runningLogs.filter((log) => new Date(log.date).getUTCFullYear() === year),
    [runningLogs, year],
  );
  const max = useMemo(() => Math.max(...filteredLogs.map((log) => log.value)), [filteredLogs]);
  const width = useMemo(() => 53 * SQUARE_SIZE + 52 * GAP, []);
  const height = useMemo(() => 7 * SQUARE_SIZE + 6 * GAP, []);

  return (
    <div className="flex h-full flex-col p-2">
      <div className="-mx-2 overflow-x-scroll px-2">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
          role="figure"
        >
          <title>Running heatmap</title>
          <desc>5/9&apos;s running heatmap for {year}</desc>
          {filteredLogs.map((log, index) => (
            <Tooltip
              key={log.date}
              content={`${formatValueToPrecision(unit.scalar * log.value, 2, false)}${
                unit.spaceBefore ? ' ' : ''
              }${unit.name} on ${log.date}`}
              inverted={false}
            >
              <rect
                x={(SQUARE_SIZE + GAP) * (index % 53)}
                y={(SQUARE_SIZE + GAP) * Math.floor(index / 53)}
                rx={2}
                className="h-3 w-3 border border-gray-2 fill-blue-9"
                fillOpacity={log.value / max}
              />
            </Tooltip>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default RunningFeatureDetailHeatmap;
