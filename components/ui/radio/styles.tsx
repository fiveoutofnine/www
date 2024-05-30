import { cva } from 'class-variance-authority';

export const radioGroupStyles = ['grid', 'gap-2'];

// -----------------------------------------------------------------------------
// `<Radio.Item type="normal" />`
// -----------------------------------------------------------------------------

export const radioIndicatorIconStyles = [
  'aspect-square',
  'size-[0.5625rem]',
  'rounded-full',
  'bg-blue-9',
];

export const radioIndicatorStyles = [
  'aspect-square',
  'flex',
  'size-3',
  'items-center',
  'justify-center',
  'rounded-full',
];

export const radioItemStyles = [
  'text-blue-9',
  'aspect-square',
  'size-3.5',
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
// `<Radio.Item type="detailed" />`
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
    'transition-colors',
    'group-disabled:text-gray-11',
  ],
  {
    variants: {
      intent: {
        none: ['text-gray-11'],
        info: ['text-blue-11'],
        success: ['text-green-11'],
        fail: ['text-red-11'],
        warning: ['text-yellow-11'],
        orange: ['text-orange-11'],
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
    'p-2',
    'transition-colors',
    'group-disabled:bg-gray-5',
    'group-disabled:text-gray-11',
    'group-disabled:border-gray-6',
  ],
  {
    variants: {
      intent: {
        none: [
          'text-gray-11',
          'border-gray-6',
          'bg-gray-3',
          'group-data-[state=checked]:bg-gray-5',
        ],
        info: [
          'text-blue-11',
          'border-blue-6',
          'bg-blue-3',
          'group-data-[state=checked]:bg-blue-5',
        ],
        success: [
          'text-green-11',
          'border-green-6',
          'bg-green-3',
          'group-data-[state=checked]:bg-green-5',
        ],
        fail: ['text-red-11', 'border-red-6', 'bg-red-3', 'group-data-[state=checked]:bg-red-5'],
        warning: [
          'text-yellow-11',
          'border-yellow-6',
          'bg-yellow-3',
          'group-data-[state=checked]:bg-yellow-5',
        ],
        orange: [
          'text-orange-11',
          'border-orange-6',
          'bg-orange-3',
          'group-data-[state=checked]:bg-orange-5',
        ],
      },
    },
  },
);

export const radioDetailedIndicatorIconVariants = cva(
  ['aspect-square', 'size-[0.5625rem]', 'rounded-full', 'transition-colors'],
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
    'size-3.5',
    'min-w-3.5',
    'rounded-full',
    'aspect-square',
    'flex',
    'items-center',
    'justify-center',
    'border',
    'group-disabled:bg-gray-9',
    'group-disabled:border-gray-6',
  ],
  {
    variants: {
      intent: {
        none: ['border-gray-6'],
        info: ['border-blue-6'],
        success: ['border-green-6'],
        fail: ['border-red-6'],
        warning: ['border-yellow-6'],
        orange: ['border-orange-6'],
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
    'transition-colors',
    'disabled:cursor-not-allowed',
    'disabled:border-gray-7',
    'focus:outline-none',
    'focus-visible:ring-blue-9',
    'focus-visible:ring-2',
    'data-[state=unchecked]:disabled:bg-gray-5',
    'data-[state=unchecked]:disabled:hover:bg-gray-5',
    'data-[state=unchecked]:disabled:hover:border-gray-7',
  ],
  {
    variants: {
      intent: {
        none: [
          'border-gray-7',
          'data-[state=unchecked]:hover:border-gray-8',
          'data-[state=unchecked]:hover:bg-gray-2',
          'data-[state=checked]:bg-gray-3',
          'data-[state=checked]:hover:border-gray-7',
        ],
        info: [
          'border-blue-7',
          'data-[state=unchecked]:hover:border-blue-8',
          'data-[state=unchecked]:hover:bg-blue-2',
          'data-[state=checked]:bg-blue-3',
          'data-[state=checked]:hover:border-blue-7',
        ],
        success: [
          'border-green-7',
          'data-[state=unchecked]:hover:border-green-8',
          'data-[state=unchecked]:hover:bg-green-2',
          'data-[state=checked]:bg-green-3',
          'data-[state=checked]:hover:border-green-7',
        ],
        fail: [
          'border-red-7',
          'data-[state=unchecked]:hover:border-red-8',
          'data-[state=unchecked]:hover:bg-red-2',
          'data-[state=checked]:bg-red-3',
          'data-[state=checked]:hover:border-red-7',
        ],
        warning: [
          'border-yellow-7',
          'data-[state=unchecked]:hover:border-yellow-8',
          'data-[state=unchecked]:hover:bg-yellow-2',
          'data-[state=checked]:bg-yellow-3',
          'data-[state=checked]:hover:border-yellow-7',
        ],
        orange: [
          'border-orange-7',
          'data-[state=unchecked]:border-orange-8',
          'data-[state=unchecked]:hover:bg-orange-2',
          'data-[state=checked]:bg-orange-3',
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
    'transition-colors',
    'group-disabled:text-gray-11',
  ],
  {
    variants: {
      intent: {
        none: ['text-gray-12'],
        info: ['text-blue-12'],
        success: ['text-green-12'],
        fail: ['text-red-12'],
        warning: ['text-yellow-12'],
        orange: ['text-orange-12'],
      },
    },
  },
);
