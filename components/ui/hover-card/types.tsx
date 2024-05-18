import { hoverCardVariants } from './styles';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

type HoverCardVariantProps = VariantProps<typeof hoverCardVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type HoverCardProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> &
  HoverCardVariantProps & {
    // Root props
    openDelay?: number;
    closeDelay?: number;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    // Remaining props
    trigger: React.ReactNode;
    triggerProps?: React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>;
    hasArrow?: boolean;
    inPortal?: boolean;
  };
