import { badgeVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

/* Variant Props */
export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

/* Component Props */
export type BadgeProps = JSX.IntrinsicElements['div'] & BadgeVariantProps;
