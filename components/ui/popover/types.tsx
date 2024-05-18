import { popoverVariants } from './styles';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

type PopoverVariantProps = VariantProps<typeof popoverVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
  PopoverVariantProps & {
    hasArrow?: boolean;
    inPortal?: boolean;
  };

export type PopoverRootProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;

export type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;

// ---------------------------------------–-------------------------------------
// Composition
// ---------------------------------------–-------------------------------------

export type PopoverComposition = {
  Content: React.FC<PopoverContentProps>;
  Root: React.FC<PopoverRootProps>;
  Trigger: React.FC<PopoverTriggerProps>;
};
