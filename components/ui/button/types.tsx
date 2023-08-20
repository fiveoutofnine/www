import type { ReactNode } from 'react';

import { buttonVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type ButtonProps = JSX.IntrinsicElements['button'] &
  ButtonVariantProps & {
    href?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    newTab?: boolean;
  };
