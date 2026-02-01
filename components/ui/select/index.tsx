import { forwardRef } from 'react';

import {
  selectContainerVariants,
  selectExtraVariants,
  selectIconContainerVariants,
  selectVariants,
} from './styles';
import type { SelectProps } from './types';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Select = forwardRef(
  (
    {
      className,
      size = 'md',
      variant = 'primary',
      intent = 'none',
      disabled = false,
      fullWidth = false,
      rightIcon,
      selectSize,
      children,
      ...rest
    }: SelectProps,
    ref: React.ForwardedRef<HTMLSelectElement>,
  ) => {
    return (
      <div className={clsx(selectContainerVariants({ fullWidth }))}>
        <select
          className={twMerge(
            clsx(
              selectVariants({ size, variant, intent: !disabled ? intent : undefined, disabled }),
              selectExtraVariants({ size, disabled }),
              className,
            ),
          )}
          size={selectSize}
          data-variant={variant}
          data-disabled={disabled}
          aria-disabled={Boolean(disabled)}
          disabled={Boolean(disabled)}
          ref={ref}
          select-content=""
          {...rest}
        >
          {children}
        </select>
        <span
          className={selectIconContainerVariants({
            size,
            variant,
            intent: !disabled ? intent : undefined,
            disabled,
          })}
        >
          {rightIcon ?? <ChevronDown />}
        </span>
      </div>
    );
  },
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Select.displayName = 'Select';

export default Select;
