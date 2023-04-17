import type { FC, ReactNode } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/* Props */
type FeatureDisplayMinimalProps = {
  className?: string;
  name: string;
  description: string;
  symbol: ReactNode;
  button: ReactNode;
};

/* Component */
const FeatureDisplayMinimal: FC<FeatureDisplayMinimalProps> = ({
  className,
  name,
  description,
  symbol,
  button,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex h-[4.5rem] items-center justify-between rounded-xl border border-gray-7 bg-gray-2 px-4',
        ),
        className,
      )}
    >
      <div className="flex items-center space-x-2.5">
        {/* Symbol */}
        <div className="flex h-10 w-10 items-center justify-center rounded border border-gray-6 bg-gray-3 text-gray-11">
          <div className="flex h-6 w-6 items-center justify-center">{symbol}</div>
        </div>
        {/* Name + description */}
        <div>
          <div className="font-medium text-gray-12">{name}</div>
          <div className="text-sm text-gray-11">{description}</div>
        </div>
      </div>

      {/* Button */}
      {button}
    </div>
  );
};

export default FeatureDisplayMinimal;
