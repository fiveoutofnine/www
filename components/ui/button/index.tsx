import Link from 'next/link';
import { type ForwardedRef, forwardRef } from 'react';

import { buttonIconVariants, buttonVariants } from './styles';
import type { ButtonProps } from './types';
import { Slot } from '@radix-ui/react-slot';
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
      newTab,
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

    // Destructure `ref` from `props: JSX.IntrinsicElements['button']`, so the
    // remaining props are type-compatible with `<Link />` for the `<Slot />`
    // component to merge in.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ref: _, ...restWithoutRef } = props;

    if (href && !disabled) {
      return (
        <Slot ref={ref} {...restWithoutRef}>
          <Link href={href} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {leftIcon && variant !== 'text' ? (
              <span className={buttonIconVariants({ size })}>{leftIcon}</span>
            ) : null}
            <span>{children}</span>
            {rightIcon && variant !== 'text' ? (
              <span className={buttonIconVariants({ size })}>{rightIcon}</span>
            ) : null}
          </Link>
        </Slot>
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
