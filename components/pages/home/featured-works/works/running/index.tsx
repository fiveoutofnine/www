import { FC, useState } from 'react';

import RunningFeatureDetailBarChart from './bar-chart';
import * as Tabs from '@radix-ui/react-tabs';
import { ArrowLeftRight, BarChart, Grid, Mountain } from 'lucide-react';

import { DISTANCE_UNITS } from '@/lib/constants/units';

import FeatureDisplay from '@/components/templates/feature-display';
import { IconButton } from '@/components/ui';

const RunningFeature: FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[560px]:col-span-4"
      name="Running"
      description="I run a lot"
      symbol={<Mountain />}
    >
      <RunningFeatureDetail />
    </FeatureDisplay>
  );
};

const RunningFeatureDetail: FC = () => {
  const [unitIndex, setUnitIndex] = useState<number>(0);

  const handleUnitChange = () => {
    setUnitIndex((unitIndex + 1) % DISTANCE_UNITS.length);
  };

  return (
    <Tabs.Root className="flex h-full w-full" defaultValue="running-bar" orientation="vertical">
      <div className="flex h-full w-10 flex-col items-center justify-between border-r border-gray-6">
        <Tabs.List className="flex w-10 flex-col items-center space-y-2 p-2">
          <Tabs.Trigger value="running-bar" asChild>
            <IconButton size="sm" variant="ghost" className="data-[state=active]:bg-gray-4">
              <BarChart />
            </IconButton>
          </Tabs.Trigger>
          <Tabs.Trigger value="running-heatmap" asChild>
            <IconButton size="sm" variant="ghost" className="data-[state=active]:bg-gray-4">
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
      <Tabs.Content
        value="running-bar"
        className="flex h-full grow flex-col overflow-hidden bg-gray-3 p-2 data-[state=inactive]:hidden"
        tabIndex={-1}
      >
        <RunningFeatureDetailBarChart unit={DISTANCE_UNITS[unitIndex]} />
      </Tabs.Content>
      <Tabs.Content
        value="running-heatmap"
        className="h-full grow overflow-hidden bg-gray-3 p-2 data-[state=inactive]:hidden"
        tabIndex={-1}
      >
        heatmap
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default RunningFeature;
