'use client';

import { forwardRef, Fragment } from 'react';

import { hoverCardArrowVariants, hoverCardVariants } from './styles';
import type { HoverCardProps } from './types';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const HoverCard = forwardRef<React.ElementRef<typeof HoverCardPrimitive.Content>, HoverCardProps>(
  (
    {
      className,
      defaultOpen = false,
      open,
      onOpenChange,
      openDelay = 500,
      closeDelay = 300,
      sideOffset = 4,
      inPortal = true,
      hasArrow = true,
      inverted = true,
      trigger,
      triggerProps = { asChild: true },
      children,
      ...rest
    },
    ref,
  ) => {
    const MaybePortal = inPortal ? HoverCardPrimitive.Portal : Fragment;

    return (
      <HoverCardPrimitive.Root
        openDelay={openDelay}
        closeDelay={closeDelay}
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        <HoverCardPrimitive.Trigger {...triggerProps}>{trigger}</HoverCardPrimitive.Trigger>
        <MaybePortal>
          <HoverCardPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={twMerge(clsx(hoverCardVariants({ inverted }), className))}
            {...rest}
          >
            {hasArrow ? (
              <HoverCardPrimitive.Arrow
                className={hoverCardArrowVariants({ inverted })}
                width={8}
                height={4}
              />
            ) : null}
            {children}
          </HoverCardPrimitive.Content>
        </MaybePortal>
      </HoverCardPrimitive.Root>
    );
  },
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

HoverCard.displayName = HoverCardPrimitive.Content.displayName;

export default HoverCard;
