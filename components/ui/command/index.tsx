'use client';

import { forwardRef } from 'react';

import { Dialog } from '..';
import {
  commandDialogStyles,
  commandEmptyStyles,
  commandGroupStyles,
  commandInputIconStyles,
  commandInputParentStyles,
  commandInputStyles,
  commandItemIconContainerStyles,
  commandItemStyles,
  commandListStyles,
  commandRootVariants,
  commandSeparatorStyles,
} from './styles';
import type {
  CommandComposition,
  CommandDialogProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandInputProps,
  CommandItemProps,
  CommandListProps,
  CommandRootProps,
  CommandSeparatorProps,
} from './types';
import clsx from 'clsx';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CommandDialog: React.FC<CommandDialogProps> = ({ children, ...rest }) => {
  return (
    <Dialog.Root {...rest}>
      <Dialog.Content className="overflow-hidden p-0">
        <CommandRoot className={clsx(commandDialogStyles)}>{children}</CommandRoot>
      </Dialog.Content>
    </Dialog.Root>
  );
};

const CommandEmpty = forwardRef<React.ElementRef<typeof CommandPrimitive.Empty>, CommandEmptyProps>(
  ({ className, ...rest }, ref) => (
    <CommandPrimitive.Empty
      ref={ref}
      className={twMerge(clsx(commandEmptyStyles, className))}
      {...rest}
    />
  ),
);

const CommandGroup = forwardRef<React.ElementRef<typeof CommandPrimitive.Group>, CommandGroupProps>(
  ({ className, ...rest }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      className={twMerge(clsx(commandGroupStyles, className))}
      {...rest}
    />
  ),
);

const CommandInput = forwardRef<React.ElementRef<typeof CommandPrimitive.Input>, CommandInputProps>(
  ({ className, ...rest }, ref) => (
    <div className={clsx(commandInputParentStyles)} cmdk-input-wrapper="">
      <Search className={clsx(commandInputIconStyles)} />
      <CommandPrimitive.Input
        ref={ref}
        className={twMerge(clsx(commandInputStyles, className))}
        {...rest}
      />
    </div>
  ),
);

const CommandItem = forwardRef<React.ElementRef<typeof CommandPrimitive.Item>, CommandItemProps>(
  ({ className, icon, children, ...rest }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      className={twMerge(clsx(commandItemStyles, className))}
      {...rest}
    >
      {icon ? (
        <span className={clsx(commandItemIconContainerStyles)} cmdk-item-icon="">
          {icon}
        </span>
      ) : null}
      <span cmdk-item-content="">{children}</span>
    </CommandPrimitive.Item>
  ),
);

const CommandList = forwardRef<React.ElementRef<typeof CommandPrimitive.List>, CommandListProps>(
  ({ className, ...rest }, ref) => (
    <CommandPrimitive.List
      ref={ref}
      className={twMerge(clsx(commandListStyles, className))}
      {...rest}
    />
  ),
);

const CommandRoot = forwardRef<React.ElementRef<typeof CommandPrimitive>, CommandRootProps>(
  ({ className, noBorder = false, ...rest }, ref) => (
    <CommandPrimitive
      ref={ref}
      className={twMerge(clsx(commandRootVariants({ noBorder }), className))}
      {...rest}
    />
  ),
);

const CommandSeparator = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(({ className, ...rest }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={twMerge(clsx(commandSeparatorStyles, className))}
    {...rest}
  />
));

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

CommandDialog.displayName = CommandPrimitive.Dialog.displayName;
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
CommandGroup.displayName = CommandPrimitive.Group.displayName;
CommandInput.displayName = CommandPrimitive.Input.displayName;
CommandItem.displayName = CommandPrimitive.Item.displayName;
CommandList.displayName = CommandPrimitive.List.displayName;
CommandRoot.displayName = 'CommandRoot';
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const Command: CommandComposition = {
  Dialog: CommandDialog,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Input: CommandInput,
  Item: CommandItem,
  List: CommandList,
  Root: CommandRoot,
  Separator: CommandSeparator,
};

export default Command;
