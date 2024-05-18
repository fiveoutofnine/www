'use client';

import { forwardRef, Fragment } from 'react';

import { tooltipArrowVariants, tooltipTriggerStyles, tooltipVariants } from './styles';
import type { TooltipProps } from './types';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Tooltip = forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, TooltipProps>(
  (
    {
      className,
      defaultOpen,
      open,
      onOpenChange,
      sideOffset = 4,
      content,
      triggerProps = { asChild: false },
      inverted = true,
      hasArrow = true,
      noDelay = false,
      inPortal = true,
      children,
      ...rest
    },
    ref,
  ) => {
    const MaybePortal = inPortal ? TooltipPrimitive.Portal : Fragment;
    const { className: triggerClassName, ...triggerPropsRest } = triggerProps;

    return (
      <TooltipPrimitive.Provider delayDuration={noDelay ? 0 : 500}>
        <TooltipPrimitive.Root defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
          <TooltipPrimitive.Trigger
            className={twMerge(clsx(tooltipTriggerStyles, triggerClassName))}
            {...triggerPropsRest}
          >
            {children}
          </TooltipPrimitive.Trigger>
          <MaybePortal>
            <TooltipPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              className={twMerge(clsx(tooltipVariants({ inverted }), className))}
              {...rest}
            >
              {hasArrow ? (
                <TooltipPrimitive.Arrow
                  className={tooltipArrowVariants({ inverted })}
                  width={8}
                  height={4}
                />
              ) : null}
              {content}
            </TooltipPrimitive.Content>
          </MaybePortal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  },
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Tooltip.displayName = TooltipPrimitive.Content.displayName;

export default Tooltip;
