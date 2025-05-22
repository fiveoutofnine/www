'use client';

import clsx from 'clsx';
import ReactTimeago from 'react-timeago';
import { twMerge } from 'tailwind-merge';

import { Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type RelativeDateProps = {
  className?: string;
  date: Date;
  type?: 'absolute' | 'relative';
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const RelativeDate: React.FC<RelativeDateProps> = ({ className, date, type = 'absolute' }) => {
  return (
    <Tooltip
      triggerProps={{ className: 'rounded', asChild: false }}
      content={
        type === 'absolute' ? (
          <div className="flex flex-col items-center">
            {new Date(date).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
            <ReactTimeago className="text-xs leading-4 text-gray-11" date={date} />
          </div>
        ) : (
          new Date(date).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        )
      }
      inverted={false}
    >
      <span
        className={twMerge(
          clsx(
            'flex h-5 w-fit select-text items-center rounded border border-gray-7 bg-gray-3 px-1 text-sm font-medium text-gray-11 transition-colors hover:border-gray-8',
            className,
          ),
        )}
      >
        {type === 'absolute' ? (
          new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        ) : (
          <ReactTimeago date={date} title="" />
        )}
      </span>
    </Tooltip>
  );
};

export default RelativeDate;
