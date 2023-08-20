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
  IconButtonVariantProps & {
    href?: string;
    newTab?: boolean;
  };
