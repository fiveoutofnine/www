'use client';

import { GitBranch, GitPullRequest } from 'lucide-react';

import { Tabs } from '@/components/ui';

export default function Page() {
  return (
    <div className="p-4">
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value="tab_0" icon={<GitPullRequest />} stat={3}>
            Pulls
          </Tabs.Trigger>
          <Tabs.Trigger value="tab_1" icon={<GitBranch />}>
            Branches
          </Tabs.Trigger>
          <Tabs.Trigger value="tab_2">About</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab_0">Pull requests</Tabs.Content>
        <Tabs.Content value="tab_1">Branches</Tabs.Content>
        <Tabs.Content value="tab_2">About</Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
