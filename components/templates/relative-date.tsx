'use client';

import clsx from 'clsx';
import ReactTimeago from 'react-timeago';
import { twMerge } from 'tailwind-merge';

import ClickableTooltip from '@/components/templates/clickable-tooltip';
import { Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type RelativeDateProps = {
  className?: string;
  date: Date;
  type?: 'absolute' | 'relative';
  clickable?: boolean;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const RelativeDate: React.FC<RelativeDateProps> = ({
  className,
  date,
  type = 'absolute',
  clickable = true,
}) => {
  const MaybeClickableTooltip = clickable ? ClickableTooltip : Tooltip;

  return (
    <MaybeClickableTooltip
      triggerProps={{ className: 'rounded', type: 'button', asChild: false }}
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
      hasArrow
      inverted={false}
    >
      <span
        className={twMerge(
          clsx(
            'line-clamp-1 flex h-5 w-fit items-center rounded border border-gray-7 bg-gray-3 px-1 text-xs font-medium text-gray-11 transition-colors hover:border-gray-8 md:text-sm',
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
    </MaybeClickableTooltip>
  );
};

export default RelativeDate;
