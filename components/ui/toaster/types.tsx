import type { ComponentPropsWithoutRef } from 'react';

import { toastDescriptionVariants, toastTitleVariants, toastVariants } from './styles';
import * as ToastPrimitives from '@radix-ui/react-toast';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

export type ToastDescriptionVariantProps = VariantProps<typeof toastDescriptionVariants>;

export type ToastTitleVariantProps = VariantProps<typeof toastTitleVariants>;

export type ToastVariantProps = VariantProps<typeof toastVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type ToastActionProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Action> &
  Pick<ToastProps, 'intent'>;

export type ToastCloseProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Close> &
  Pick<ToastProps, 'intent'>;

export type ToastDescriptionProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Description> &
  ToastDescriptionVariantProps;

export type ToastProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & ToastVariantProps;

export type ToastTitleProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Title> &
  ToastTitleVariantProps;

export type ToastViewportProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>;
