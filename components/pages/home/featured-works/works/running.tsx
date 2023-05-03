import { type FC, useMemo, useRef } from 'react';

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
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const width = graphContainerRef.current?.clientWidth ?? 0;
  const height = graphContainerRef.current?.clientHeight ?? 0;

  const data = useMemo(() => [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], []);

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
      <Tabs.Content value="running-bar" className="flex h-full w-full flex-col bg-gray-3 p-2">
        <div className="font-medium">
          <span className="text-gray-12">7081</span>
          <span className="text-xs text-gray-11">km</span>
        </div>
        <div className="mt-0.5 text-xs text-gray-11">May 2022 to May 2023</div>
        <div className="mt-2 flex grow" ref={graphContainerRef}></div>
      </Tabs.Content>
      <Tabs.Content value="running-heatmap" className="h-full w-full bg-gray-3 p-2">
        heatmap
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default RunningFeature;
