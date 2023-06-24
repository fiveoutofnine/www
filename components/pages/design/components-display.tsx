import type { FC } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const DesignComponentsDisplay: FC<JSX.IntrinsicElements['div']> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'grid w-full items-center justify-evenly gap-4 rounded-xl border border-gray-6 bg-gray-2 py-8',
          className,
        ),
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default DesignComponentsDisplay;
