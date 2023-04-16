import Link from 'next/link';
import { type ForwardedRef, forwardRef } from 'react';

import { iconButtonIconVariants, iconButtonVariants } from './styles';
import type { IconButtonProps } from './types';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const IconButton = forwardRef(
  (
    {
      className,
      size = 'md',
      variant = 'primary',
      intent = 'none',
      disabled = false,
      href,
      children,
      ...rest
    }: IconButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const props = {
      className: twMerge(
        cx(
          iconButtonVariants({ size, variant, intent: !disabled ? intent : undefined, disabled }),
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
            <span className={iconButtonIconVariants({ size })}>{children}</span>
          </button>
        </Link>
      );
    }

    return (
      <button {...props}>
        <span className={iconButtonIconVariants({ size })}>{children}</span>
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
