import { cva } from 'class-variance-authority';

export const dropdownCheckboxContainerStyles = [
  'absolute',
  'left-2',
  'flex',
  'h-4',
  'w-4',
  'items-center',
  'justify-center',
];

export const dropdownCheckboxStyles = [
  'relative',
  'flex',
  'cursor-default',
  'select-none',
  'items-center',
  'rounded',
  'h-8',
  'pl-8',
  'pr-2',
  'text-sm',
  'outline-none',
  'transition-colors',
  'text-gray-12',
  'focus:bg-gray-4',
  'data-[disabled=true]:pointer-events-none',
  'data-[disabled=true]:text-gray-11',
];

export const dropdownContentStyles = [
  'text-gray-12',
  'z-50',
  'min-w-[8rem]',
  'overflow-hidden',
  'rounded-md',
  'border',
  'bg-gray-2',
  'p-1',
  'border-gray-6',
  'data-[state=open]:animate-in',
  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0',
  'data-[state=open]:fade-in-0',
  'data-[state=closed]:zoom-out-95',
  'data-[state=open]:zoom-in-95',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2',
];

export const dropdownItemIconContainerStyles = [
  'flex',
  'items-center',
  'justify-center',
  'text-gray-11',
  'w-4',
  'h-4',
  'ml-auto',
];

export const dropdownItemVariants = cva(
  [
    'relative',
    'flex',
    'cursor-default',
    'select-none',
    'items-center',
    'rounded',
    'px-2',
    'h-8',
    'text-sm',
    'outline-none',
    'transition-colors',
    'text-gray-12',
    'focus:bg-gray-4',
    'data-[disabled=true]:pointer-events-none',
    'data-[disabled=true]:text-gray-11',
  ],
  {
    variants: {
      inset: {
        true: ['pl-8'],
        false: [],
      },
    },
  },
);

export const dropdownLabelVariants = cva(
  ['px-2', 'py-1.5', 'text-sm', 'font-medium', 'text-gray-12'],
  {
    variants: {
      inset: {
        true: ['pl-8'],
        false: [],
      },
    },
  },
);

export const dropdownRadioItemContainerStyles = [
  'absolute',
  'left-2',
  'flex',
  'h-4',
  'w-4',
  'items-center',
  'justify-center',
];

export const dropdownRadioItemStyles = [
  'relative',
  'flex',
  'cursor-default',
  'select-none',
  'items-center',
  'rounded',
  'h-8',
  'pl-8',
  'pr-2',
  'text-sm',
  'outline-none',
  'transition-colors',
  'text-gray-12',
  'focus:bg-gray-4',
  'data-[disabled=true]:pointer-events-none',
  'data-[disabled=true]:text-gray-11',
];

export const dropdownSeparatorStyles = ['-mx-1', 'my-1', 'h-px', 'bg-gray-6'];

export const dropdownSubContentStyles = [
  'text-gray-12',
  'z-50',
  'min-w-[8rem]',
  'overflow-hidden',
  'rounded-md',
  'border',
  'bg-gray-2',
  'p-1',
  'border-gray-6',
  'data-[state=open]:animate-in',
  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0',
  'data-[state=open]:fade-in-0',
  'data-[state=closed]:zoom-out-95',
  'data-[state=open]:zoom-in-95',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2',
];

export const dropdownSubTriggerVariants = cva(
  [
    'flex',
    'cursor-default',
    'select-none',
    'items-center',
    'rounded',
    'h-8',
    'px-2',
    'text-sm',
    'outline-none',
    'text-gray-12',
    'focus:bg-gray-4',
    'data-[state=open]:text-gray-12',
    'data-[state=open]:bg-gray-4',
  ],
  {
    variants: {
      inset: {
        true: ['pl-8'],
        false: [],
      },
    },
  },
);
