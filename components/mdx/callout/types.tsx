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
  React.HTMLAttributes<HTMLDivElement> & {
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  };
