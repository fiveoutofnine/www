import { cva } from 'class-variance-authority';

export const calloutIconContainerVariants = cva([], {
  variants: {
    size: {
      sm: [],
      md: ['pt-0.5'],
    },
  },
});

export const calloutIconVariants = cva([], {
  variants: {
    size: {
      sm: ['size-4'],
      md: ['size-5'],
    },
    intent: {
      none: ['text-gray-11'],
      info: ['text-blue-11'],
      success: ['text-green-11'],
      fail: ['text-red-11'],
      warning: ['text-yellow-11'],
      orange: ['text-orange-11'],
    },
  },
});

export const calloutVariants = cva(
  [
    'group',
    'mdx--callout',
    'my-4',
    'not-prose',
    'border',
    'relative',
    'flex',
    'w-full',
    'overflow-hidden',
    'p-3',
  ],
  {
    variants: {
      size: {
        sm: ['text-xs', 'gap-1.5', 'rounded-md', 'leading-4'],
        md: ['text-sm', 'gap-2', 'rounded-lg', 'leading-6'],
      },
      intent: {
        none: ['bg-gray-3', 'text-gray-12', 'border-gray-6'],
        info: ['bg-blue-3', 'text-blue-12', 'border-blue-6'],
        success: ['bg-green-3', 'text-green-12', 'border-green-6'],
        fail: ['bg-red-3', 'text-red-12', 'border-red-6'],
        warning: ['bg-yellow-3', 'text-yellow-12', 'border-yellow-6'],
        orange: ['bg-orange-3', 'text-orange-12', 'border-orange-6'],
      },
    },
  },
);
