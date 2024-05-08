import { badgeVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type BadgeProps = JSX.IntrinsicElements['span'] &
  Omit<BadgeVariantProps, 'variant' | 'intent'> &
  (
    | {
        variant?: 'primary' | 'outline';
        intent: BadgeVariantProps['intent'];
      }
    | {
        variant?: 'secondary';
        intent?: Exclude<BadgeVariantProps['intent'], 'black' | 'white'>;
      }
  );
