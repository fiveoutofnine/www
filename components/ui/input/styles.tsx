import { cva } from 'class-variance-authority';

export const inputContainerIconVariants = cva(['flex', 'items-center', 'justify-center'], {
  variants: {
    size: {
      sm: ['size-4'],
      md: ['size-[1.125rem]'],
      lg: ['size-5'],
    },
  },
});

export const inputContainerVariants = cva(
  [
    'relative',
    'flex',
    'w-fit',
    'items-center',
    'whitespace-nowrap',
    'justify-center',
    'text-gray-11',
    'border',
    'border-gray-7',
    'transition-colors',
    'peer-invalid:text-red-11',
    'peer-invalid:bg-red-3',
    'peer-invalid:border-red-7',
  ],
  {
    variants: {
      size: {
        sm: ['h-8', 'text-xs', 'rounded'],
        md: ['h-9', 'text-sm', 'rounded-md'],
        lg: ['h-10', 'text-base', 'rounded-md'],
      },
      side: {
        left: ['rounded-r-none', 'order-1'],
        right: ['rounded-l-none', 'order-3'],
      },
      isIcon: {
        true: [],
        false: [],
      },
      containerized: {
        true: [],
        false: [],
      },
      disabled: {
        true: [],
        false: [],
      },
    },
    compoundVariants: [
      { size: 'sm', isIcon: true, className: ['min-w-[2rem]'] },
      { size: 'md', isIcon: true, className: ['min-w-[2.25rem]'] },
      { size: 'lg', isIcon: true, className: ['min-w-[2.5rem]'] },
      { size: 'sm', isIcon: false, className: ['px-2'] },
      { size: 'md', isIcon: false, className: ['px-2.5'] },
      { size: 'lg', isIcon: false, className: ['px-2.5'] },
      { containerized: true, disabled: true, className: ['bg-gray-9'] },
      { containerized: false, disabled: true, className: ['bg-gray-9'] },
      { containerized: true, disabled: false, className: ['bg-gray-5'] },
      { containerized: false, disabled: false, className: ['bg-gray-2'] },
      { containerized: false, side: 'left', className: ['border-r-0'] },
      { containerized: false, side: 'right', className: ['border-l-0'] },
    ],
  },
);

export const inputExtraVariants = cva([], {
  variants: {
    size: {
      sm: [],
      md: [],
      lg: [],
    },
    hasLeft: {
      true: ['border-l-0'],
      false: [],
    },
    hasRight: {
      true: ['border-r-0'],
      false: [],
    },
  },
  compoundVariants: [
    { size: 'sm', hasLeft: false, className: ['rounded-l'] },
    { size: 'sm', hasRight: false, className: ['rounded-r'] },
    { size: 'md', hasLeft: false, className: ['rounded-l-md'] },
    { size: 'md', hasRight: false, className: ['rounded-r-md'] },
    { size: 'lg', hasLeft: false, className: ['rounded-l-md'] },
    { size: 'lg', hasRight: false, className: ['rounded-r-md'] },
  ],
});

export const inputParentVariants = cva(
  ['flex', 'focus-within:ring-blue-9', 'focus-within:ring-1'],
  {
    variants: {
      size: {
        sm: ['h-8', 'rounded'],
        md: ['h-9', 'rounded-md'],
        lg: ['h-10', 'rounded-md'],
      },
      fullWidth: {
        true: ['w-full'],
        false: ['w-fit'],
      },
    },
  },
);

export const inputVariants = cva(
  [
    'peer',
    'flex',
    'order-2',
    'items-center',
    'border',
    'text-gray-12',
    'bg-gray-2',
    'transition-colors',
    'border-gray-7',
    'hover:border-gray-8',
    'focus:outline-none',
    'only:focus-visible:ring-1',
    'focus-visible:ring-blue-9',
    'placeholder:text-gray-11',
    'disabled:bg-gray-9',
    'invalid:bg-red-3',
    'invalid:text-red-11',
    'invalid:border-red-7',
    'invalid:hover:border-red-8',
  ],
  {
    variants: {
      size: {
        sm: ['h-8', 'text-xs', 'px-2'],
        md: ['h-9', 'text-sm', 'px-2.5'],
        lg: ['h-10', 'text-base', 'px-3'],
      },
      fullWidth: {
        true: ['w-full'],
        false: [],
      },
    },
  },
);
