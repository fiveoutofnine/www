import Link from 'next/link';
import { type ForwardedRef, forwardRef } from 'react';

import { buttonIconVariants, buttonVariants } from './styles';
import type { ButtonProps } from './types';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const Button = forwardRef(
  (
    {
      className,
      size = 'md',
      variant = 'primary',
      intent = 'none',
      disabled = false,
      href,
      leftIcon,
      rightIcon,
      children,
      ...rest
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const props = {
      className: twMerge(
        cx(
          buttonVariants({ size, variant, intent: !disabled ? intent : undefined, disabled }),
          className,
        ),
      ),
      'data-variant': variant,
      'data-disabled': disabled,
      'aria-disabled': disabled,
      disabled,
      ref,
      ...rest,
    };

    if (href) {
      return (
        <Link href={href} passHref legacyBehavior>
          <button {...props}>
            {leftIcon && variant !== 'text' ? (
              <span className={buttonIconVariants({ size })}>{leftIcon}</span>
            ) : null}
            <span>{children}</span>
            {rightIcon && variant !== 'text' ? (
              <span className={buttonIconVariants({ size })}>{rightIcon}</span>
            ) : null}
          </button>
        </Link>
      );
    }

    return (
      <button {...props}>
        {leftIcon && variant !== 'text' ? (
          <span className={buttonIconVariants({ size })}>{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {rightIcon && variant !== 'text' ? (
          <span className={buttonIconVariants({ size })}>{rightIcon}</span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
