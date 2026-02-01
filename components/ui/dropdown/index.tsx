'use client';

import { forwardRef, Fragment } from 'react';

import {
  dropdownCheckboxContainerStyles,
  dropdownCheckboxStyles,
  dropdownContentStyles,
  dropdownItemIconContainerStyles,
  dropdownItemVariants,
  dropdownLabelVariants,
  dropdownRadioItemContainerStyles,
  dropdownRadioItemStyles,
  dropdownSeparatorStyles,
  dropdownSubContentStyles,
  dropdownSubTriggerVariants,
} from './styles';
import type {
  DropdownCheckboxItemProps,
  DropdownComposition,
  DropdownContentProps,
  DropdownItemProps,
  DropdownLabelProps,
  DropdownRadioItemProps,
  DropdownSeparatorProps,
  DropdownSubContentProps,
  DropdownSubTriggerProps,
} from './types';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { Check, ChevronRight, Dot } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DropdownCheckboxItem = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.CheckboxItem>,
  DropdownCheckboxItemProps
>(({ className, children, checked, ...rest }, ref) => (
  <DropdownPrimitive.CheckboxItem
    ref={ref}
    className={twMerge(clsx(dropdownCheckboxStyles, className))}
    checked={checked}
    {...rest}
  >
    <span className={clsx(dropdownCheckboxContainerStyles)}>
      <DropdownPrimitive.ItemIndicator>
        <Check className="size-4" />
      </DropdownPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownPrimitive.CheckboxItem>
));

const DropdownContent = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Content>,
  DropdownContentProps
>(({ className, sideOffset = 4, inPortal = true, ...rest }, ref) => {
  const MaybePortal = inPortal ? DropdownPrimitive.Portal : Fragment;

  return (
    <MaybePortal>
      <DropdownPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={twMerge(clsx(dropdownContentStyles, className))}
        {...rest}
      />
    </MaybePortal>
  );
});

const DropdownGroup = DropdownPrimitive.Group;

const DropdownItem = forwardRef<React.ElementRef<typeof DropdownPrimitive.Item>, DropdownItemProps>(
  ({ className, inset, icon, asChild, children, ...rest }, ref) => (
    <DropdownPrimitive.Item
      ref={ref}
      className={twMerge(clsx(dropdownItemVariants({ inset }), className))}
      asChild={asChild}
      {...rest}
    >
      {asChild ? (
        children
      ) : (
        <Fragment>
          <span dropdown-item-content="">{children}</span>
          {icon ? (
            <span className={clsx(dropdownItemIconContainerStyles)} dropdown-item-icon="">
              {icon}
            </span>
          ) : null}
        </Fragment>
      )}
    </DropdownPrimitive.Item>
  ),
);

const DropdownLabel = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Label>,
  DropdownLabelProps
>(({ className, inset, ...rest }, ref) => (
  <DropdownPrimitive.Label
    ref={ref}
    className={twMerge(clsx(dropdownLabelVariants({ inset }), className))}
    {...rest}
  />
));

const DropdownPortal = DropdownPrimitive.Portal;

const DropdownRadioGroup = DropdownPrimitive.RadioGroup;

const DropdownRadioItem = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.RadioItem>,
  DropdownRadioItemProps
>(({ className, children, ...rest }, ref) => (
  <DropdownPrimitive.RadioItem
    ref={ref}
    className={twMerge(clsx(dropdownRadioItemStyles, className))}
    {...rest}
  >
    <span className={clsx(dropdownRadioItemContainerStyles)}>
      <DropdownPrimitive.ItemIndicator>
        <Dot className="size-4" />
      </DropdownPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownPrimitive.RadioItem>
));

const DropdownRoot = DropdownPrimitive.Root;

const DropdownSeparator = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Separator>,
  DropdownSeparatorProps
>(({ className, ...rest }, ref) => (
  <DropdownPrimitive.Separator
    ref={ref}
    className={twMerge(clsx(dropdownSeparatorStyles, className))}
    {...rest}
  />
));

const DropdownSub = DropdownPrimitive.Sub;

const DropdownSubContent = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.SubContent>,
  DropdownSubContentProps
>(({ className, ...rest }, ref) => (
  <DropdownPrimitive.SubContent
    ref={ref}
    className={twMerge(clsx(dropdownSubContentStyles, className))}
    {...rest}
  />
));

const DropdownSubTrigger = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.SubTrigger>,
  DropdownSubTriggerProps
>(({ className, inset, children, ...rest }, ref) => (
  <DropdownPrimitive.SubTrigger
    ref={ref}
    className={twMerge(clsx(dropdownSubTriggerVariants({ inset }), className))}
    {...rest}
  >
    {children}
    <ChevronRight className="ml-auto size-4 text-gray-11" />
  </DropdownPrimitive.SubTrigger>
));

const DropdownTrigger = DropdownPrimitive.Trigger;

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

DropdownCheckboxItem.displayName = DropdownPrimitive.CheckboxItem.displayName;
DropdownContent.displayName = DropdownPrimitive.Content.displayName;
DropdownItem.displayName = DropdownPrimitive.Item.displayName;
DropdownLabel.displayName = DropdownPrimitive.Label.displayName;
DropdownRadioItem.displayName = DropdownPrimitive.RadioItem.displayName;
DropdownSeparator.displayName = DropdownPrimitive.Separator.displayName;
DropdownSubContent.displayName = DropdownPrimitive.SubContent.displayName;
DropdownSubTrigger.displayName = DropdownPrimitive.SubTrigger.displayName;

const Dropdown: DropdownComposition = {
  CheckboxItem: DropdownCheckboxItem,
  Content: DropdownContent,
  Group: DropdownGroup,
  Item: DropdownItem,
  Label: DropdownLabel,
  Portal: DropdownPortal,
  RadioGroup: DropdownRadioGroup,
  RadioItem: DropdownRadioItem,
  Root: DropdownRoot,
  Separator: DropdownSeparator,
  Sub: DropdownSub,
  SubContent: DropdownSubContent,
  SubTrigger: DropdownSubTrigger,
  Trigger: DropdownTrigger,
};

export default Dropdown;
