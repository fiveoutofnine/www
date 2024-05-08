import { badgeVariants } from './styles';
import type { BadgeProps } from './types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Badge: React.FC<BadgeProps> = ({
  className,
  size = 'md',
  variant = 'primary',
  intent = 'none',
  type = 'text',
  children,
  ...rest
}) => (
  <span
    className={twMerge(clsx(badgeVariants({ size, variant, intent, type }), className))}
    data-length-one={children?.toString().length === 1 ?? false}
    data-size={size}
    data-variant={variant}
    {...rest}
  >
    {children}
  </span>
);
// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Badge.displayName = 'Badge';

export default Badge;
