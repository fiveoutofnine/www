import { type ForwardedRef, forwardRef } from 'react';

import { hoverCardArrowVariants, hoverCardVariants } from './styles';
import type { HoverCardProps } from './types';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const HoverCard = forwardRef(
  (
    {
      className,
      openDelay = 500,
      closeDelay = 300,
      sideOffset = 4,
      hasArrow = true,
      inverted = true,
      trigger,
      children,
      ...rest
    }: HoverCardProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay}>
      <HoverCardPrimitive.Trigger asChild>{trigger}</HoverCardPrimitive.Trigger>
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
    </HoverCardPrimitive.Root>
  ),
);
HoverCard.displayName = HoverCardPrimitive.Content.displayName;

export default HoverCard;
