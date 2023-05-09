import type { FC } from 'react';

import RunningFeatureDetailBarChart from './bar-chart';
import * as Tabs from '@radix-ui/react-tabs';
import { BarChart, Grid, Mountain } from 'lucide-react';

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
  return (
    <Tabs.Root className="flex h-full w-full" defaultValue="running-bar" orientation="vertical">
      <Tabs.List className="flex h-full w-10 flex-col items-center space-y-2 border-r border-gray-6 p-2">
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
      <Tabs.Content
        value="running-bar"
        className="flex h-full grow flex-col overflow-hidden bg-gray-3 p-2"
      >
        <RunningFeatureDetailBarChart />
      </Tabs.Content>
      <Tabs.Content value="running-heatmap" className="h-full w-full bg-gray-3 p-2">
        heatmap
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default RunningFeature;
