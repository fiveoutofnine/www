import { type FC, Fragment } from 'react';

import { Button } from '@/components/ui';

const RunningFeatureDetailHeatmap: FC = () => {
  return (
    <Fragment>
      <div className="flex w-full grow items-center justify-between px-2 pt-2">
        <div className="font-medium">
          <span className="text-gray-12">100km</span>
          <span className="text-xs text-gray-11"> in 2022</span>
        </div>
        <Button size="sm">2023</Button>
      </div>
      <div className="mt-2 flex flex-col space-y-1 overflow-x-scroll px-2">
        <div className="flex w-fit grow space-x-1">
          {[...Array(53)].map((_, i) => (
            <div key={i} className="h-3 w-3 rounded-sm bg-blue-9" />
          ))}
        </div>
        <div className="flex w-fit grow space-x-1">
          {[...Array(53)].map((_, i) => (
            <div key={i} className="h-3 w-3 rounded-sm bg-blue-9" />
          ))}
        </div>
        <div className="flex w-fit grow space-x-1">
          {[...Array(53)].map((_, i) => (
            <div key={i} className="h-3 w-3 rounded-sm bg-blue-9" />
          ))}
        </div>
        <div className="flex w-fit grow space-x-1">
          {[...Array(53)].map((_, i) => (
            <div key={i} className="h-3 w-3 rounded-sm bg-blue-9" />
          ))}
        </div>
        <div className="flex w-fit grow space-x-1">
          {[...Array(53)].map((_, i) => (
            <div key={i} className="h-3 w-3 rounded-sm bg-blue-9" />
          ))}
        </div>
        <div className="flex w-fit grow space-x-1">
          {[...Array(53)].map((_, i) => (
            <div key={i} className="h-3 w-3 rounded-sm bg-blue-9" />
          ))}
        </div>
        <div className="flex w-fit grow space-x-1">
          {[...Array(53)].map((_, i) => (
            <div key={i} className="h-3 w-3 rounded-sm bg-blue-9" />
          ))}
        </div>
      </div>
      <div className="mt-2.5 flex w-full grow items-center justify-between px-2 pb-2 text-xs text-gray-11">
        Lmfao.
      </div>
    </Fragment>
  );
};

export default RunningFeatureDetailHeatmap;
