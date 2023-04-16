import type { FC } from 'react';

import { badgeVariants } from './styles';
import type { BadgeProps } from './types';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const Badge: FC<BadgeProps> = ({
  className,
  size = 'md',
  variant = 'primary',
  intent = 'none',
  children,
  ...rest
}) => {
  return (
    <div
      className={twMerge(cx(badgeVariants({ size, variant, intent }), className))}
      data-variant={variant}
      {...rest}
    >
      {children}
    </div>
  );
};

Badge.displayName = 'Badge';

export default Badge;
