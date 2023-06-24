import { iconButtonVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

/* Variant Props */
export type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>;

/* Component Props */
export type IconButtonProps = JSX.IntrinsicElements['button'] &
  IconButtonVariantProps & {
    href?: string;
    newTab?: boolean;
  };
