import { selectVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

export type SelectVariantProps = VariantProps<typeof selectVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type SelectItemProps = JSX.IntrinsicElements['option'];

export type SelectProps = Omit<JSX.IntrinsicElements['select'], 'size'> &
  Omit<SelectVariantProps, 'variant' | 'intent'> &
  (
    | {
        variant?: 'solid';
        intent?: 'black' | 'white';
      }
    | {
        variant?: Exclude<SelectVariantProps['variant'], 'solid' | 'text'>;
        intent?: Exclude<SelectVariantProps['intent'], 'black' | 'white'>;
      }
  ) & {
    rightIcon?: React.ReactNode;
    selectSize?: number;
    fullWidth?: boolean;
  };
