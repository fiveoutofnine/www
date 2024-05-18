import { forwardRef } from 'react';

import {
  inputContainerIconVariants,
  inputContainerVariants,
  inputExtraVariants,
  inputParentVariants,
  inputVariants,
} from './styles';
import type { InputProps } from './types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Input = forwardRef(
  (
    {
      className,
      size = 'md',
      prefix,
      suffix,
      leftIcon,
      rightIcon,
      containerized,
      disabled = false,
      fullWidth = true,
      ...rest
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const hasLeft = !!prefix || !!leftIcon;
    const hasRight = !!suffix || !!rightIcon;
    // We always containerize if the add-on is not an icon. If it is an icon, we
    //default to `true`.
    const leftContainerized = hasLeft && (leftIcon !== undefined ? containerized ?? true : true);
    const rightContainerized = hasRight && (rightIcon !== undefined ? containerized ?? true : true);

    return (
      <div className={inputParentVariants({ size, fullWidth })}>
        <input
          className={twMerge(
            clsx(
              inputVariants({ size, fullWidth }),
              inputExtraVariants({ size, hasLeft, hasRight }),
              !leftContainerized && hasLeft ? 'pl-0' : '',
              !rightContainerized && hasRight ? 'pr-0' : '',
              className,
            ),
          )}
          ref={ref}
          disabled={disabled}
          data-disabled={disabled}
          aria-disabled={disabled}
          {...rest}
        />
        {hasLeft ? (
          <span
            className={inputContainerVariants({
              size,
              side: 'left',
              isIcon: leftIcon !== undefined,
              containerized: leftContainerized,
              disabled,
            })}
          >
            {prefix ?? <span className={inputContainerIconVariants({ size })}>{leftIcon}</span>}
          </span>
        ) : null}
        {hasRight ? (
          <span
            className={inputContainerVariants({
              size,
              side: 'right',
              isIcon: rightIcon !== undefined,
              containerized: rightContainerized,
              disabled,
            })}
          >
            {suffix ?? <span className={inputContainerIconVariants({ size })}>{rightIcon}</span>}
          </span>
        ) : null}
      </div>
    );
  },
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Input.displayName = 'Input';

export default Input;
