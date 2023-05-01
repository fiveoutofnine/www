import { type FC, type ForwardedRef, forwardRef } from 'react';

import { toastVariants } from './styles';
import type {
  ToastActionProps,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastProps,
  ToastTitleProps,
  ToastViewport,
} from './types';
import { useToast } from './useToast';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Toast = forwardRef(
  ({ className, variant, ...rest }: ToastProps, ref: ForwardedRef<HTMLLIElement>) => {
    return (
      <ToastPrimitives.Root
        ref={ref}
        className={twMerge(clsx(toastVariants({ variant }), className))}
        {...rest}
      />
    );
  },
);
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = forwardRef(
  ({ className, ...rest }: ToastActionProps, ref: ForwardedRef<HTMLButtonElement>) => (
    <ToastPrimitives.Action
      ref={ref}
      className={twMerge(
        clsx(
          'ring-offset-background hover:bg-secondary focus:ring-ring group-[.destructive]:border-destructive/30 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          className,
        ),
      )}
      {...rest}
    />
  ),
);
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = forwardRef(
  ({ className, ...rest }: ToastCloseProps, ref: ForwardedRef<HTMLButtonElement>) => (
    <ToastPrimitives.Close
      ref={ref}
      className={twMerge(
        clsx(
          'text-foreground/50 hover:text-foreground absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
          className,
        ),
      )}
      toast-close=""
      {...rest}
    >
      <X className="h-4 w-4" />
    </ToastPrimitives.Close>
  ),
);
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastDescription = forwardRef(
  ({ className, ...rest }: ToastDescriptionProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ToastPrimitives.Description
      ref={ref}
      className={twMerge(clsx('text-sm opacity-90', className))}
      {...rest}
    />
  ),
);
ToastDescription.displayName = ToastPrimitives.Description.displayName;

const Toaster: FC = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...rest }) {
        return (
          <Toast key={id} {...rest}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};

const ToastProvider = ToastPrimitives.Provider;

const ToastTitle = forwardRef(
  ({ className, ...rest }: ToastTitleProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ToastPrimitives.Title
      ref={ref}
      className={twMerge(clsx('text-sm font-semibold', className))}
      {...rest}
    />
  ),
);
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastViewport = forwardRef(
  ({ className, ...rest }: ToastViewport, ref: ForwardedRef<HTMLOListElement>) => (
    <ToastPrimitives.Viewport
      ref={ref}
      className={twMerge(
        clsx(
          'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
          className,
        ),
      )}
      {...rest}
    />
  ),
);
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  Toaster,
  ToastProvider,
  ToastTitle,
  ToastViewport,
};

export default Toaster;
