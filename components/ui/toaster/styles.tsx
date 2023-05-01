import { cva } from 'class-variance-authority';

export const toastCloseStyles =
  'absolute right-1.5 top-1.5 opacity-0 group-hover:opacity-100 transition-opacity';

export const toastDescriptionVariants = cva(['text-xs'], {
  variants: {
    intent: {
      none: ['text-gray-11'],
      primary: ['text-blue-11'],
      success: ['text-green-11'],
      fail: ['text-red-11'],
      warning: ['text-yellow-11'],
    },
  },
});

export const toastTitleVariants = cva(['text-sm', 'font-medium'], {
  variants: {
    intent: {
      none: ['text-gray-12'],
      primary: ['text-blue-12'],
      success: ['text-green-12'],
      fail: ['text-red-12'],
      warning: ['text-yellow-12'],
    },
  },
});

export const toastVariants = cva(
  'data-[swipe=move]:transition-none group relative pointer-events-auto border flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-3 transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full',
  {
    variants: {
      intent: {
        none: ['bg-gray-3', 'border-gray-6'],
        primary: ['bg-blue-3', 'border-blue-6'],
        success: ['bg-green-3', 'border-green-6'],
        fail: ['bg-red-3', 'border-red-6'],
        warning: ['bg-yellow-3', 'border-yellow-6'],
      },
    },
  },
);

export const toastViewportStyles =
  'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]';
