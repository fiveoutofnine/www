import { useState } from 'react';

import RunningBarChart from './running-bar-chart';
import RunningHeatMap from './running-heatmap';
import * as Tabs from '@radix-ui/react-tabs';
import clsx from 'clsx';
import { ArrowLeftRight, BarChart, Grid } from 'lucide-react';

import { LENGTH_UNITS } from '@/lib/constants/units';

import { IconButton, Tooltip } from '@/components/ui';

export default function RunningDetails({
  runMonthlyData,
  dailyData,
}: {
  runMonthlyData: MonthlyData[];
  dailyData: MileageLog[];
}) {
  const [unitIndex, setUnitIndex] = useState<number>(0);

  const tabContentStyles = 'h-full grow overflow-hidden bg-gray-3';
  const tabTriggerStyles = 'data-[state=active]:bg-gray-5 data-[state=active]:hover:bg-gray-5';

  const handleUnitChange = () => {
    setUnitIndex((unitIndex + 1) % LENGTH_UNITS.length);
  };

  return (
    <Tabs.Root className="flex h-full w-full" defaultValue="bar-chart" orientation="vertical">
      <div className="border-gray-6 flex h-full w-10 flex-col items-center justify-between border-r">
        <Tabs.List className="flex w-10 flex-col items-center space-y-2 p-2">
          {/** Wrap in Icon button */}
          <Tabs.Trigger value="bar-chart" asChild>
            <IconButton
              size="sm"
              variant="ghost"
              role="tab"
              className={tabTriggerStyles}
              title="Bar graph"
              aria-label="Running bar graph"
            >
              <BarChart />
            </IconButton>
            {/* <BarChart /> */}
          </Tabs.Trigger>
          {/** Wrap in Icon button */}
          <Tabs.Trigger value="heat-map" asChild>
            <IconButton
              size="sm"
              variant="ghost"
              role="tab"
              className={tabTriggerStyles}
              title="Heatmap"
              aria-label="Running heatmap"
            >
              <Grid />
            </IconButton>
            {/* <Grid /> */}
          </Tabs.Trigger>
        </Tabs.List>
        <div className="border-gray-6 border-t p-2">
          <Tooltip content="Change units" side="left">
            <IconButton size="sm" onClick={handleUnitChange} aria-label="Change units">
              <ArrowLeftRight />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <Tabs.Content value="bar-chart" tabIndex={-1} asChild>
        <div className={clsx(tabContentStyles, 'flex flex-col p-2')}>
          <RunningBarChart runMonthlyData={runMonthlyData} unit={LENGTH_UNITS[unitIndex]} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="heat-map" className={tabContentStyles} tabIndex={-1} asChild>
        <div className={clsx(tabContentStyles)}>
          <RunningHeatMap runningLogs={dailyData} unit={LENGTH_UNITS[unitIndex]} />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
