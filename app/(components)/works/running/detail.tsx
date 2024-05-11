'use client';

import { useState } from 'react';

import clsx from 'clsx';
import { ArrowRightLeft, BarChart, Grid } from 'lucide-react';

import { LENGTH_UNITS } from '@/lib/constants/units';
import type { MileageLog } from '@/lib/types/running';

import { IconButton, Tabs, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type RunningFeatureDetailProps = {
  mileageLogs: MileageLog[];
  runningLogs: MileageLog[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const RunningFeatureDetail: React.FC<RunningFeatureDetailProps> = ({
  mileageLogs,
  runningLogs,
}) => {
  const [unitIndex, setUnitIndex] = useState<number>(0);

  const handleUnitChange = () => {
    setUnitIndex((unitIndex + 1) % LENGTH_UNITS.length);
  };

  console.log(mileageLogs, runningLogs);

  return (
    <Tabs.Root className="flex h-full w-full" defaultValue="running-bar" orientation="vertical">
      <div className="flex h-full w-10 flex-col items-center justify-between border-r border-gray-6">
        <Tabs.List className="flex w-10 flex-col items-center gap-2 p-2">
          {[
            {
              value: 'running-bar',
              label: 'Bar graph',
              icon: <BarChart />,
              ariaLabel: 'Running bar graph',
            },
            {
              value: 'running-heatmap',
              label: 'Heatmap',
              icon: <Grid />,
              ariaLabel: 'Running heatmap',
            },
          ].map(({ value, label, icon, ...rest }) => (
            <Tabs.Trigger key={value} value={value} asChild>
              <IconButton
                className="data-[state=active]:data-[variant=ghost]:bg-gray-5 data-[state=active]:data-[variant=ghost]:text-gray-12 data-[state=active]:data-[variant=ghost]:hover:bg-gray-5"
                size="sm"
                variant="ghost"
                title={label}
                {...rest}
              >
                {icon}
              </IconButton>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="border-t border-gray-6 p-2">
          <Tooltip content="Change units" side="left" triggerProps={{ asChild: true }} inverted>
            <IconButton size="sm" aria-label="Change units" onClick={handleUnitChange}>
              <ArrowRightLeft />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {[
        { value: 'running-bar', className: 'flex flex-col p-2', children: unitIndex },
        { value: 'running-heatmap', children: unitIndex },
      ].map(({ value, className, ...rest }) => (
        <Tabs.Content key={value} value={value} tabIndex={-1} asChild>
          <div className={clsx(className, 'h-full grow overflow-hidden bg-gray-3')} {...rest} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default RunningFeatureDetail;
