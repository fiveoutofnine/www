import { cva } from 'class-variance-authority';

export const commandDialogStyles = [
  'rounded-lg',
  'border-0',
  '[&_[cmdk-group]]:p-2',
  '[&_[cmdk-input]]:h-[46px]',
  '[&_[cmdk-item]]:h-9',
  '[&_[cmdk-item]]:px-2',
  '[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0',
  '[&_[cmdk-group-heading]]:py-1',
  '[&_[cmdk-separator]_+[cmdk-group]_[cmdk-group-heading]]:pt-3',
];

export const commandEmptyStyles = [
  'text-center',
  'text-sm',
  'py-6',
  'px-4',
  'leading-normal',
  'text-gray-11',
];

export const commandGroupStyles = [
  'text-gray-12',
  'overflow-hidden',
  'p-1',
  '[&_[cmdk-group-heading]]:text-gray-11',
  '[&_[cmdk-group-heading]]:px-2',
  '[&_[cmdk-group-heading]]:py-1',
  '[&_[cmdk-group-heading]]:text-xs',
];

export const commandInputIconStyles = ['shrink-0', 'w-4', 'h-4', 'mr-1.5'];

export const commandInputParentStyles = [
  'flex',
  'items-center',
  'border-b',
  'border-gray-6',
  'px-3',
];

export const commandInputStyles = [
  'flex',
  'h-10',
  'w-full',
  'bg-transparent',
  'text-sm',
  'text-gray-12',
  'outline-none',
  'placeholder:text-gray-11',
  'disabled:cursor-not-allowed',
  'disabled:opacity-50',
];

export const commandItemIconContainerStyles = [
  'flex',
  'items-center',
  'justify-center',
  'text-gray-11',
  'w-4',
  'h-4',
  'mr-1.5',
];

export const commandItemStyles = [
  'relative',
  'flex',
  'cursor-default',
  'select-none',
  'items-center',
  'rounded',
  'font-normal',
  'px-2',
  'h-8',
  'text-sm',
  'outline-none',
  'text-gray-11',
  '[&_[cmdk-item-content]]:line-clamp-1',
  '[&_[cmdk-item-content]]:overflow-hidden',
  '[&_[cmdk-item-content]]:text-ellipsis',
  '[&_[cmdk-item-content]]:text-gray-12',
  '[&_[cmdk-item-icon]]:text-gray-11',
  '[&_[cmdk-item-icon]]:transition-colors',
  '[&_[cmdk-item-icon]]:hover:text-gray-12',
  'aria-selected:bg-gray-4',
  'data-[disabled=true]:pointer-events-none',
  'data-[disabled=true]:opacity-50',
];

export const commandListStyles = [
  'max-h-[300px]',
  'overflow-y-auto',
  'overflow-x-hidden',
  'hide-scrollbar',
];

export const commandRootVariants = cva(
  [
    'flex',
    'max-w-full',
    'flex-col',
    'overflow-hidden',
    'rounded-lg',
    'bg-gray-2',
    'text-gray-12',
    'shadow-none',
  ],
  {
    variants: {
      noBorder: {
        true: [],
        false: ['border', 'border-gray-6'],
      },
    },
  },
);

export const commandSeparatorStyles = ['-mx-1', 'h-px', 'bg-gray-6'];
