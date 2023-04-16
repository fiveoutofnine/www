import type { FC, ReactNode } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/* Props */
type ContainerLayoutProps = JSX.IntrinsicElements['div'] & {
  children?: ReactNode;
};

/* Component */
const ContainerLayout: FC<ContainerLayoutProps> = ({ className, children, ...rest }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'mx-auto w-full max-w-[60rem] grow px-3 pb-6 pt-3 lg:px-20 lg:pb-16 lg:pt-12',
          className,
        ),
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ContainerLayout;
