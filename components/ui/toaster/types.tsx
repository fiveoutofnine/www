import type { ComponentPropsWithoutRef } from 'react';

import { toastVariants } from './styles';
import * as ToastPrimitives from '@radix-ui/react-toast';
import type { VariantProps } from 'class-variance-authority';

/* Variant Props */
export type ToastVariantProps = VariantProps<typeof toastVariants>;

/* Component Props */
export type ToastActionProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Action>;

export type ToastCloseProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Close>;

export type ToastDescriptionProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Description>;

export type ToastProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & ToastVariantProps;

export type ToastTitleProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Title>;

export type ToastViewport = ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>;
