import { cva } from 'class-variance-authority';

export const toastCloseButtonVariants = cva(
  [
    'absolute',
    '-right-2.5',
    '-top-2.5',
    'size-5',
    'items-center',
    'justify-center',
    'rounded-full',
    'border',
    'transition-colors',
    'focus:outline-none',
    'focus-visible:ring-blue-9',
    'focus-visible:ring-2',
  ],
  {
    variants: {
      intent: {
        none: [
          'bg-[var(--gray3)]',
          'text-[var(--gray11)]',
          'border-[var(--gray7)]',
          'hover:border-[var(--gray8)]',
          'hover:bg-[var(--gray4)]',
          'active:bg-[var(--gray5)]',
        ],
        info: [
          'bg-blue-3',
          'text-blue-11',
          'border-blue-7',
          'hover:border-blue-8',
          'hover:bg-blue-4',
          'active:bg-blue-5',
        ],
        success: [
          'bg-green-3',
          'text-green-11',
          'border-green-7',
          'hover:border-green-8',
          'hover:bg-green-4',
          'active:bg-green-5',
        ],
        fail: [
          'bg-red-3',
          'text-red-11',
          'border-red-7',
          'hover:border-red-8',
          'hover:bg-red-4',
          'active:bg-red-5',
        ],
        warning: [
          'bg-yellow-3',
          'text-yellow-11',
          'border-yellow-7',
          'hover:border-yellow-8',
          'hover:bg-yellow-4',
          'active:bg-yellow-5',
        ],
        orange: [
          'bg-orange-3',
          'text-orange-11',
          'border-orange-7',
          'hover:border-orange-8',
          'hover:bg-orange-4',
          'active:bg-orange-5',
        ],
      },
      isTouchScreen: {
        true: ['flex'],
        false: ['animate-in', 'fade-in', 'hidden', 'group-hover:flex'],
      },
    },
  },
);

export const toastContainerStyles = ['flex', 'flex-col', 'gap-1', 'w-full'];

export const toastDescriptionVariants = cva(['text-xs', 'font-normal', 'leading-4', 'w-full'], {
  variants: {
    intent: {
      none: ['text-[var(--gray11)]'],
      info: ['text-blue-11'],
      success: ['text-green-11'],
      fail: ['text-red-11'],
      warning: ['text-yellow-11'],
      orange: ['text-orange-11'],
    },
    clip: {
      true: ['overflow-hidden', 'text-ellipsis', 'line-clamp-1'],
      false: [],
    },
  },
});

export const toastIconContainerVariants = cva(
  ['flex', 'items-center', 'justify-center', 'w-5', '[&>svg]:h-5'],
  {
    variants: {
      intent: {
        none: ['text-[var(--gray11)]'],
        info: ['text-blue-11'],
        success: ['text-green-11'],
        fail: ['text-red-11'],
        warning: ['text-yellow-11'],
        orange: ['text-orange-11'],
      },
    },
  },
);

export const toastTitleVariants = cva(
  [
    'text-sm',
    'font-medium',
    'leading-[1.125rem]',
    'overflow-hidden',
    'text-ellipsis',
    'line-clamp-1',
    'relative',
  ],
  {
    variants: {
      intent: {
        none: ['text-[var(--gray12)]'],
        info: ['text-blue-12'],
        success: ['text-green-12'],
        fail: ['text-red-12'],
        warning: ['text-yellow-12'],
        orange: ['text-orange-12'],
      },
    },
  },
);

export const toastVariants = cva(
  [
    'group',
    'w-full',
    'flex',
    'items-center',
    'justify-between',
    'space-x-4',
    'overflow-hidden',
    'p-3',
    'border',
    'rounded-md',
    'pointer-events-auto',
  ],
  {
    variants: {
      intent: {
        none: ['bg-[var(--gray3)]', 'border-[var(--gray6)]'],
        info: ['bg-blue-3', 'border-blue-6'],
        success: ['bg-green-3', 'border-green-6'],
        fail: ['bg-red-3', 'border-red-6'],
        warning: ['bg-yellow-3', 'border-yellow-6'],
        orange: ['bg-orange-3', 'border-orange-6'],
      },
    },
  },
);
