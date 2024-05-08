'use client';

import { createContext, forwardRef, useContext, useId } from 'react';

import type {
  FormControlProps,
  FormDescriptionProps,
  FormFieldContextValue,
  FormItemContextValue,
  FormItemProps,
  FormLabelProps,
  FormMessageProps,
} from './types';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const FormControl = forwardRef<React.ElementRef<typeof Slot>, FormControlProps>(
  ({ ...rest }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...rest}
      />
    );
  },
);

const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...rest }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={twMerge(clsx('mt-1 text-xs leading-4 text-gray-11', className))}
        {...rest}
      />
    );
  },
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>,
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormItem = forwardRef<HTMLDivElement, FormItemProps>((props, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} {...props} />
    </FormItemContext.Provider>
  );
});

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(({ className, ...rest }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <label
      ref={ref}
      className={twMerge(
        clsx('mb-1 text-xs leading-4 text-gray-12', error ? 'text-red-11' : '', className),
      )}
      htmlFor={formItemId}
      {...rest}
    />
  );
});

const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...rest }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={twMerge(clsx('mt-1 text-xs text-red-11', className))}
        {...rest}
      >
        {body}
      </p>
    );
  },
);

const FormRoot = FormProvider;

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('`useFormField` should be used within `<Form.Field>`');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

FormControl.displayName = 'FormControl';
FormDescription.displayName = 'FormDescription';
FormItem.displayName = 'FormItem';
FormLabel.displayName = 'FormLabel';
FormMessage.displayName = 'FormMessage';

const Form = {
  Control: FormControl,
  Description: FormDescription,
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Message: FormMessage,
  Root: FormRoot,
};

export { useFormField };
export default Form;
