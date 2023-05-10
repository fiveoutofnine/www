import { FC, useState } from 'react';

import RunningFeatureDetailBarChart from './bar-chart';
import * as Tabs from '@radix-ui/react-tabs';
import clsx from 'clsx';
import { ArrowLeftRight, BarChart, Grid, Mountain } from 'lucide-react';

import { LENGTH_UNITS } from '@/lib/constants/units';
import type { MileageLog } from '@/lib/types/running';

import FeatureDisplay from '@/components/templates/feature-display';
import { IconButton } from '@/components/ui';

/* Props */
type RunningFeatureProps = {
  mileageLogs: MileageLog[];
};

type RunningFeatureDetailProps = RunningFeatureProps;

/* Component */
const RunningFeature: FC<RunningFeatureProps> = ({ mileageLogs }) => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[560px]:col-span-4"
      name="Running"
      description="I run a lot"
      symbol={<Mountain />}
    >
      <RunningFeatureDetail mileageLogs={mileageLogs} />
    </FeatureDisplay>
  );
};

const RunningFeatureDetail: FC<RunningFeatureDetailProps> = ({ mileageLogs }) => {
  const [unitIndex, setUnitIndex] = useState<number>(0);

  const tabContentStyles = 'h-full grow overflow-hidden bg-gray-3';
  const tabTriggerStyles = 'data-[state=active]:bg-gray-5 data-[state=active]:hover:bg-gray-5';

  const handleUnitChange = () => {
    setUnitIndex((unitIndex + 1) % LENGTH_UNITS.length);
  };

  return (
    <Tabs.Root className="flex h-full w-full" defaultValue="running-bar" orientation="vertical">
      <div className="flex h-full w-10 flex-col items-center justify-between border-r border-gray-6">
        <Tabs.List className="flex w-10 flex-col items-center space-y-2 p-2">
          <Tabs.Trigger value="running-bar" asChild>
            <IconButton size="sm" variant="ghost" className={tabTriggerStyles}>
              <BarChart />
            </IconButton>
          </Tabs.Trigger>
          <Tabs.Trigger value="running-heatmap" asChild>
            <IconButton size="sm" variant="ghost" className={tabTriggerStyles}>
              <Grid />
            </IconButton>
          </Tabs.Trigger>
        </Tabs.List>
        <div className="border-t border-gray-6 p-2">
          <IconButton size="sm" aria-label="Change units" onClick={handleUnitChange}>
            <ArrowLeftRight />
          </IconButton>
        </div>
      </div>
      <Tabs.Content value="running-bar" tabIndex={-1} asChild>
        <div className={clsx(tabContentStyles, 'flex flex-col p-2')}>
          <RunningFeatureDetailBarChart mileageLogs={mileageLogs} unit={LENGTH_UNITS[unitIndex]} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="running-heatmap" className={tabContentStyles} tabIndex={-1} asChild>
        <div className={clsx(tabContentStyles)}>heatmap{/* <RunningFeatureDetailHeatmap /> */}</div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default RunningFeature;
