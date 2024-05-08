import { commandRootVariants } from './styles';
import type { DialogProps } from '@radix-ui/react-dialog';
import type { VariantProps } from 'class-variance-authority';
import { Command as CommandPrimitive } from 'cmdk';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

type CommandRootVariantProps = VariantProps<typeof commandRootVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type CommandDialogProps = DialogProps;

export type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>;

export type CommandGroupProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>;

export type CommandInputProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>;

export type CommandItemProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
  icon?: React.ReactNode;
};

export type CommandListProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>;

export type CommandRootProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive> &
  CommandRootVariantProps;

export type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
>;

// -----------------------------------------------------------------------------
// Composition
// -----------------------------------------------------------------------------

export type CommandComposition = {
  Dialog: React.FC<CommandDialogProps>;
  Empty: React.FC<CommandEmptyProps>;
  Group: React.FC<CommandGroupProps>;
  Input: React.FC<CommandInputProps>;
  Item: React.FC<CommandItemProps>;
  List: React.FC<CommandListProps>;
  Root: React.FC<CommandRootProps>;
  Separator: React.FC<CommandSeparatorProps>;
};
