import { Slot } from '@radix-ui/react-slot';
import type { FieldPath, FieldValues } from 'react-hook-form';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export type FormItemContextValue = {
  id: string;
};

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type FormControlProps = React.ComponentPropsWithoutRef<typeof Slot>;

export type FormDescriptionProps = JSX.IntrinsicElements['p'];

export type FormItemProps = JSX.IntrinsicElements['div'];

export type FormLabelProps = JSX.IntrinsicElements['label'];

export type FormMessageProps = JSX.IntrinsicElements['p'];
