import { cva } from 'class-variance-authority';

export const checkboxIndicatorIconVariants = cva([], {
  variants: {
    size: {
      sm: ['size-2'],
      md: ['size-2.5'],
      lg: ['size-3'],
    },
  },
});

export const checkboxIndicatorStyles = [
  'flex',
  'items-center',
  'justify-center',
  'animate-in',
  'zoom-in',
];

export const checkboxVariants = cva(
  [
    'border-gray-7',
    'shrink-0',
    'border',
    'transition-colors',
    'rounded-sm',
    'active:bg-gray-3',
    'disabled:cursor-not-allowed',
    'disabled:text-gray-11',
    'disabled:bg-gray-5',
    'disabled:active:bg-gray-5',
    'disabled:hover:border-gray-7',
    'hover:border-gray-8',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-9',
    'data-[state=checked]:bg-blue-9',
    'data-[state=checked]:border-blue-9',
    'data-[state=checked]:text-white',
    'data-[state=checked]:hover:bg-blue-10',
  ],
  {
    variants: {
      size: {
        sm: ['size-3'],
        md: ['size-3.5'],
        lg: ['size-4'],
      },
    },
  },
);
