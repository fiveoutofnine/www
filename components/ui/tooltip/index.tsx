import { type ForwardedRef, forwardRef } from 'react';

import { tooltipArrowVariants, tooltipVariants } from './styles';
import type { TooltipProps } from './types';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Tooltip = forwardRef(
  (
    {
      className,
      sideOffset = 4,
      content,
      inverted = true,
      hasArrow = true,
      noDelay = false,
      children,
      ...rest
    }: TooltipProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <TooltipPrimitive.Provider delayDuration={noDelay ? 0 : 500}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
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
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  ),
);
Tooltip.displayName = TooltipPrimitive.Content.displayName;

export default Tooltip;
