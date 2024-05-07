import { cva } from 'class-variance-authority';

export const radioGroupStyles = ['grid', 'gap-2'];

// -----------------------------------------------------------------------------
// `normal` Radio item
// -----------------------------------------------------------------------------

export const radioIndicatorIconStyles = [
  'aspect-square',
  'h-[0.5625rem]',
  'w-[0.5625rem]',
  'rounded-full',
  'bg-white',
];

export const radioIndicatorStyles = [
  'aspect-square',
  'flex',
  'h-3',
  'w-3',
  'items-center',
  'justify-center',
  'rounded-full',
];

export const radioItemStyles = [
  'text-white',
  'aspect-square',
  'h-3.5',
  'w-3.5',
  'rounded-full',
  'border',
  'border-gray-7',
  'transition-colors',
  'hover:border-gray-8',
  'focus:outline-none',
  'focus-visible:ring-blue-9',
  'focus-visible:ring-2',
  'disabled:bg-gray-5',
  'disabled:hover:border-gray-7',
  'disabled:cursor-not-allowed',
];

// -----------------------------------------------------------------------------
// `detailed` Radio item
// -----------------------------------------------------------------------------

export const radioDetailedDescriptionVariants = cva(
  [
    'line-clamp-1',
    'overflow-hidden',
    'text-ellipsis',
    'text-left',
    'text-sm',
    'font-normal',
    'leading-4',
    'text-gray-11',
    'transition-colors',
  ],
  {
    variants: {
      intent: {
        none: [],
        info: ['group-data-[state=checked]:text-blue-11'],
        success: ['group-data-[state=checked]:text-green-11'],
        fail: ['group-data-[state=checked]:text-red-11'],
        warning: ['group-data-[state=checked]:text-yellow-11'],
        orange: ['group-data-[state=checked]:text-orange-11'],
      },
    },
  },
);

export const radioDetailedIconContainerVariants = cva(
  [
    'aspect-square',
    'flex',
    'size-10',
    'items-center',
    'justify-center',
    'rounded',
    'border',
    'border-gray-6',
    'bg-gray-3',
    'p-2',
    'text-gray-11',
    'transition-colors',
    'group-disabled:bg-gray-5',
    'group-disabled:text-gray-11',
  ],
  {
    variants: {
      intent: {
        none: [
          'group-data-[state=checked]:bg-gray-5',
          'group-data-[state=checked]:text-gray-11',
          'group-data-[state=checked]:border-gray-6',
        ],
        info: [
          'group-data-[state=checked]:bg-blue-5',
          'group-data-[state=checked]:text-blue-11',
          'group-data-[state=checked]:border-blue-6',
        ],
        success: [
          'group-data-[state=checked]:bg-green-5',
          'group-data-[state=checked]:text-green-11',
          'group-data-[state=checked]:border-green-6',
        ],
        fail: [
          'group-data-[state=checked]:bg-red-5',
          'group-data-[state=checked]:text-red-11',
          'group-data-[state=checked]:border-red-6',
        ],
        warning: [
          'group-data-[state=checked]:bg-yellow-5',
          'group-data-[state=checked]:text-yellow-11',
          'group-data-[state=checked]:border-yellow-6',
        ],
        orange: [
          'group-data-[state=checked]:bg-orange-5',
          'group-data-[state=checked]:text-orange-11',
          'group-data-[state=checked]:border-orange-6',
        ],
      },
    },
  },
);

export const radioDetailedIndicatorIconVariants = cva(
  ['aspect-square', 'h-[0.5625rem]', 'w-[0.5625rem]', 'rounded-full', 'transition-colors'],
  {
    variants: {
      intent: {
        none: ['bg-gray-11'],
        info: ['bg-blue-11'],
        success: ['bg-green-11'],
        fail: ['bg-red-11'],
        warning: ['bg-yellow-11'],
        orange: ['bg-orange-11'],
      },
    },
  },
);

export const radioDetailedIndicatorVariants = cva(
  [
    'h-3.5',
    'w-3.5',
    'rounded-full',
    'aspect-square',
    'flex',
    'items-center',
    'justify-center',
    'border',
    'border-gray-6',
    'group-disabled:bg-gray-9',
  ],
  {
    variants: {
      intent: {
        none: ['group-data-[state=checked]:border-gray-6'],
        info: ['group-data-[state=checked]:border-blue-6'],
        success: ['group-data-[state=checked]:border-green-6'],
        fail: ['group-data-[state=checked]:border-red-6'],
        warning: ['group-data-[state=checked]:border-yellow-6'],
        orange: ['group-data-[state=checked]:border-orange-6'],
      },
    },
  },
);

export const radioDetailedItemVariants = cva(
  [
    'group',
    'flex',
    'items-center',
    'justify-between',
    'rounded-xl',
    'p-4',
    'border',
    'border-gray-7',
    'transition-colors',
    'hover:border-gray-8',
    'disabled:cursor-not-allowed',
    'disabled:hover:border-gray-7',
    'disabled:bg-gray-5',
    'focus:outline-none',
    'focus-visible:ring-blue-9',
    'focus-visible:ring-2',
    'data-[state=unchecked]:hover:bg-gray-3',
    'data-[state=unchecked]:disabled:bg-gray-5',
  ],
  {
    variants: {
      intent: {
        none: [
          'data-[state=checked]:bg-gray-3',
          'data-[state=checked]:border-gray-7',
          'data-[state=checked]:hover:border-gray-7',
        ],
        info: [
          'data-[state=checked]:bg-blue-3',
          'data-[state=checked]:border-blue-7',
          'data-[state=checked]:hover:border-blue-7',
        ],
        success: [
          'data-[state=checked]:bg-green-3',
          'data-[state=checked]:border-green-7',
          'data-[state=checked]:hover:border-green-7',
        ],
        fail: [
          'data-[state=checked]:bg-red-3',
          'data-[state=checked]:border-red-7',
          'data-[state=checked]:hover:border-red-7',
        ],
        warning: [
          'data-[state=checked]:bg-yellow-3',
          'data-[state=checked]:border-yellow-7',
          'data-[state=checked]:hover:border-yellow-7',
        ],
        orange: [
          'data-[state=checked]:bg-orange-3',
          'data-[state=checked]:border-orange-7',
          'data-[state=checked]:hover:border-orange-7',
        ],
      },
    },
  },
);

export const radioDetailedTitleVariants = cva(
  [
    'line-clamp-1',
    'overflow-hidden',
    'text-ellipsis',
    'text-left',
    'text-base',
    'font-medium',
    'leading-5',
    'text-gray-12',
    'transition-colors',
    'group-disabled:text-gray-11',
  ],
  {
    variants: {
      intent: {
        none: [],
        info: ['group-data-[state=checked]:text-blue-12'],
        success: ['group-data-[state=checked]:text-green-12'],
        fail: ['group-data-[state=checked]:text-red-12'],
        warning: ['group-data-[state=checked]:text-yellow-12'],
        orange: ['group-data-[state=checked]:text-orange-12'],
      },
    },
  },
);
