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
        clsx('mx-auto w-full max-w-[60rem] grow p-4 md:px-20 md:py-16', className),
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ContainerLayout;
