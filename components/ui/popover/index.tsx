'use client';

import { forwardRef, Fragment } from 'react';

import { popoverArrowVariants, popoverVariants } from './styles';
import type { PopoverComposition, PopoverContentProps } from './types';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    {
      className,
      sideOffset = 4,
      inverted = false,
      hasArrow = false,
      inPortal = true,
      children,
      ...rest
    },
    ref,
  ) => {
    const MaybePortal = inPortal ? PopoverPrimitive.Portal : Fragment;

    return (
      <MaybePortal>
        <PopoverPrimitive.Content
          className={twMerge(clsx(popoverVariants({ inverted }), className))}
          ref={ref}
          sideOffset={sideOffset}
          {...rest}
        >
          {hasArrow ? (
            <PopoverPrimitive.Arrow
              className={popoverArrowVariants({ inverted })}
              width={8}
              height={4}
            />
          ) : null}
          {children}
        </PopoverPrimitive.Content>
      </MaybePortal>
    );
  },
);

const PopoverRoot = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

PopoverContent.displayName = PopoverPrimitive.Content.displayName;
PopoverRoot.displayName = PopoverPrimitive.Root.displayName;
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

const Popover: PopoverComposition = {
  Content: PopoverContent,
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
};

export default Popover;
