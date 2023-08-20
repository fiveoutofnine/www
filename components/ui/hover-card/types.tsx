import type { ComponentPropsWithoutRef, ReactNode } from 'react';

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

export type HoverCardProps = ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> &
  HoverCardVariantProps & {
    trigger: ReactNode;
    openDelay?: number;
    closeDelay?: number;
    hasArrow?: boolean;
  };
