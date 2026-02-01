import { inputVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

type InputVariantProps = VariantProps<typeof inputVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
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
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    containerized?: boolean;
  };
