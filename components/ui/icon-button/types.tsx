import { iconButtonVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

export type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type IconButtonProps = JSX.IntrinsicElements['button'] &
  Omit<IconButtonVariantProps, 'variant' | 'intent'> &
  (
    | {
        variant?: 'solid';
        intent?: 'black' | 'white';
      }
    | {
        variant?: Exclude<IconButtonVariantProps['variant'], 'solid'>;
        intent?: Exclude<IconButtonVariantProps['intent'], 'black' | 'white'>;
      }
  ) & {
    href?: string;
    newTab?: boolean;
  };
