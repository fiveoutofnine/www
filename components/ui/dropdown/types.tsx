import { dropdownItemVariants, dropdownLabelVariants, dropdownSubTriggerVariants } from './styles';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

type DropdownItemVariantProps = VariantProps<typeof dropdownItemVariants>;

type DropdownLabelVariantProps = VariantProps<typeof dropdownLabelVariants>;

type DropdownSubTriggerVariantProps = VariantProps<typeof dropdownSubTriggerVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type DropdownCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownPrimitive.CheckboxItem
>;

export type DropdownContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownPrimitive.Content
> & {
  inPortal?: boolean;
};

export type DropdownGroupProps = React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Group>;

export type DropdownItemProps = React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Item> &
  DropdownItemVariantProps & {
    icon?: React.ReactNode;
  };

export type DropdownLabelProps = React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Label> &
  DropdownLabelVariantProps;

export type DropdownPortalProps = React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Portal>;

export type DropdownRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof DropdownPrimitive.RadioGroup
>;

export type DropdownRadioItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownPrimitive.RadioItem
>;

export type DropdownRootProps = React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Root>;

export type DropdownSeparatorProps = React.ComponentPropsWithoutRef<
  typeof DropdownPrimitive.Separator
>;

export type DropdownSubProps = React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Sub>;

export type DropdownSubContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownPrimitive.SubContent
>;

export type DropdownSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownPrimitive.SubTrigger
> &
  DropdownSubTriggerVariantProps;

export type DropdownTriggerProps = React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Trigger>;

// -----------------------------------------------------------------------------
// Composition
// -----------------------------------------------------------------------------

export type DropdownComposition = {
  CheckboxItem: React.FC<DropdownCheckboxItemProps>;
  Content: React.FC<DropdownContentProps>;
  Group: React.FC<DropdownGroupProps>;
  Item: React.FC<DropdownItemProps>;
  Label: React.FC<DropdownLabelProps>;
  Portal: React.FC<DropdownPortalProps>;
  RadioGroup: React.FC<DropdownRadioGroupProps>;
  RadioItem: React.FC<DropdownRadioItemProps>;
  Root: React.FC<DropdownRootProps>;
  Separator: React.FC<DropdownSeparatorProps>;
  Sub: React.FC<DropdownSubProps>;
  SubContent: React.FC<DropdownSubContentProps>;
  SubTrigger: React.FC<DropdownSubTriggerProps>;
  Trigger: React.FC<DropdownTriggerProps>;
};
