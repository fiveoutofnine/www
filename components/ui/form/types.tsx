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

export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export type FormItemProps = React.HTMLAttributes<HTMLDivElement>;

export type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>;
