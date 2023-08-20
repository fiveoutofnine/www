import type { FC, ReactNode } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type FeatureDisplayProps = {
  className?: string;
  name: string;
  description: string;
  symbol: ReactNode;
  tags?: ReactNode[];
  button?: ReactNode;
  children: ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const FeatureDisplay: FC<FeatureDisplayProps> = ({
  className,
  name,
  description,
  symbol,
  tags,
  button,
  children,
}) => {
  return (
    <div
      className={twMerge(
        clsx('flex h-64 w-64 flex-col overflow-hidden rounded-xl border border-gray-6 bg-gray-2'),
        className,
      )}
    >
      {/* Header */}
      <div className="flex h-[4.5rem] items-center space-x-2.5 border-b border-gray-7 px-4">
        {/* Symbol */}
        <div className="flex h-10 w-10 items-center justify-center rounded border border-gray-6 bg-gray-3 text-gray-11">
          <div className="flex h-6 w-6 items-center justify-center">{symbol}</div>
        </div>
        {/* Name + description */}
        <div>
          <div className="line-clamp-1 text-ellipsis font-medium text-gray-12">{name}</div>
          <div className="line-clamp-1 text-ellipsis text-sm text-gray-11">{description}</div>
        </div>
      </div>

      {/* Body */}
      <div className="w-full grow">{children}</div>

      {/* Footer */}
      {tags || button ? (
        <div className="flex h-10 items-center justify-between border-t border-gray-6 p-2">
          {/* Tags */}
          <div className="flex items-center space-x-1">{tags ? tags.map((tag) => tag) : null}</div>

          {/* Button */}
          {button}
        </div>
      ) : null}
    </div>
  );
};

export default FeatureDisplay;
