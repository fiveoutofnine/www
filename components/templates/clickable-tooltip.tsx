'use client';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useIsTouchScreen } from '@/lib/hooks';

import { Popover, Tooltip } from '@/components/ui';
import type { TooltipProps } from '@/components/ui/tooltip/types';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type ClickableTooltipProps = Omit<TooltipProps, 'inverted'>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ClickableTooltip: React.FC<ClickableTooltipProps> = ({
  className,
  content,
  triggerProps,
  children,
  ...rest
}) => {
  const isTouchScreen = useIsTouchScreen();

  if (isTouchScreen) {
    return (
      <Popover.Root>
        <Popover.Trigger {...triggerProps}>{children}</Popover.Trigger>
        <Popover.Content
          className={twMerge(clsx('max-w-[15rem] bg-gray-2 p-2 focus:outline-none', className))}
          onOpenAutoFocus={(e) => e.preventDefault()}
          tabIndex={-1}
          {...rest}
        >
          {content}
        </Popover.Content>
      </Popover.Root>
    );
  }

  return (
    <Tooltip
      className={className}
      content={content}
      triggerProps={triggerProps}
      inverted={false}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export default ClickableTooltip;
