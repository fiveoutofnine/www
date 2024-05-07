import { buttonVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type ButtonGroupProps = JSX.IntrinsicElements['div'];

export type ButtonProps = JSX.IntrinsicElements['button'] &
  Omit<ButtonVariantProps, 'variant' | 'intent'> &
  (
    | {
        variant?: 'solid';
        intent?: 'black';
      }
    | {
        variant?: Exclude<ButtonVariantProps['variant'], 'solid'>;
        intent?: Exclude<ButtonVariantProps['intent'], 'black'>;
      }
  ) & {
    href?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    newTab?: boolean;
  };
