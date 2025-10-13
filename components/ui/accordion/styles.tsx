import { cva } from 'class-variance-authority';

export const accordionContentContainerStyles = [
  'text-sm',
  'text-gray-11',
  'overflow-hidden',
  'data-[state=closed]:animate-accordion-up',
  'data-[state=open]:animate-accordion-down',
];

export const accordionContentVariants = cva([], {
  variants: {
    variant: {
      container: [
        'p-3',
        'border',
        'border-b-0',
        'border-gray-7',
        'group-last:border-b',
        'group-last:rounded-b',
      ],
      normal: ['pb-3', 'pt-0'],
    },
  },
});

export const accordionItemVariants = cva(['group'], {
  variants: {
    variant: {
      container: ['-space-y-[1px]'],
      normal: ['border-b', 'border-gray-6'],
    },
  },
});

export const accordionTriggerChevronStyles = [
  'h-4',
  'w-4',
  'shrink-0',
  'text-gray-11',
  'transition-transform',
  'duration-200',
  'group-data-[state=open]:-rotate-90',
];

export const accordionTriggerContentStyles = ['line-clamp-1', 'grow', 'text-left'];

export const accordionTriggerVariants = cva(
  [
    'group',
    'flex',
    'flex-1',
    'items-center',
    'justify-between',
    'text-sm',
    'font-medium',
    'focus-visible:ring-blue-9',
    'focus-visible:rounded-sm',
  ],
  {
    variants: {
      variant: {
        container: [
          'text-gray-11',
          'h-8',
          'pl-3',
          'pr-1.5',
          'border',
          'border-b-0',
          'border-gray-7',
          'group-first:rounded-t',
          'group-last:border-b',
          'group-last:rounded-b',
          'group-only:border-y',
          'transition-colors',
          'active:bg-gray-3',
          'hover:text-gray-12',
          'hover:border-gray-8',
          'hover:z-10',
          'focus:z-20',
          'data-[state=open]:text-gray-12',
          'group-last:data-[state=open]:rounded-b-none',
          'group-last:data-[state=open]:focus-visible:rounded-b-sm',
          'data-[state=open]:focus-visible:rounded-b-sm',
        ],
        normal: ['text-gray-12', 'py-3', 'hover:underline'],
      },
    },
  },
);
