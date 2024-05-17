import { calloutVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// ---------------------------------------–-------------------------------------
// Variant props
// ---------------------------------------–-------------------------------------

export type CalloutVariantProps = VariantProps<typeof calloutVariants>;

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type CalloutProps = CalloutVariantProps &
  JSX.IntrinsicElements['div'] & {
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  };
