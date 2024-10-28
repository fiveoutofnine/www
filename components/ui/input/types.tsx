import { inputVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

type InputVariantProps = VariantProps<typeof inputVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type InputProps = Omit<JSX.IntrinsicElements['input'], 'size'> &
  InputVariantProps &
  (
    | {
        prefix?: undefined;
        leftIcon?: React.ReactNode;
      }
    | {
        prefix?: React.ReactNode;
        leftIcon?: undefined;
      }
  ) &
  (
    | {
        suffix?: undefined;
        rightIcon?: React.ReactNode;
      }
    | {
        suffix?: React.ReactNode;
        rightIcon?: undefined;
      }
  ) & {
    containerProps?: JSX.IntrinsicElements['div'];
    containerized?: boolean;
  };
