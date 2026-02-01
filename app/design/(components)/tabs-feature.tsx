'use client';

import { Tabs } from '@/components/ui';

const DesignTabsFeature: React.FC = () => {
  return (
    <Tabs.Root
      className="w-full rounded-lg border border-gray-6"
      orientation="horizontal"
      defaultValue="1"
    >
      <Tabs.List className="px-2">
        <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      {/* TODO: v4 migration: reference variable. */}
      <Tabs.Content className="focus-visible:rounded-b-[7px]" value="1">
        five out of nine
      </Tabs.Content>
      {/* TODO: v4 migration: reference variable. */}
      <Tabs.Content className="focus-visible:rounded-b-[7px]" value="2">
        five ninths
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default DesignTabsFeature;
