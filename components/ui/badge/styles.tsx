import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  ['rounded-full', 'w-fit', 'flex', 'justify-center', 'items-center', 'font-medium'],
  {
    variants: {
      size: {
        sm: ['px-2', 'h-4', 'text-xs'],
        md: ['px-2.5', 'h-5', 'text-sm'],
        lg: ['px-3', 'h-6', 'text-base'],
      },
      variant: {
        primary: [],
        secondary: [],
      },
      intent: {
        none: [
          'data-[variant=primary]:bg-gray-9',
          'data-[variant=primary]:dark:text-gray-12',
          'data-[variant=primary]:text-gray-1',
          'data-[variant=secondary]:bg-gray-3',
          'data-[variant=secondary]:text-gray-11',
        ],
        primary: [
          'data-[variant=primary]:bg-blue-9',
          'data-[variant=primary]:dark:text-gray-12',
          'data-[variant=primary]:text-gray-1',
          'data-[variant=secondary]:bg-blue-3',
          'data-[variant=secondary]:text-blue-9',
        ],
        success: [
          'data-[variant=primary]:bg-green-9',
          'data-[variant=primary]:dark:text-gray-12',
          'data-[variant=primary]:text-gray-1',
          'data-[variant=secondary]:bg-green-3',
          'data-[variant=secondary]:text-green-9',
        ],
        fail: [
          'data-[variant=primary]:bg-red-9',
          'data-[variant=primary]:dark:text-gray-12',
          'data-[variant=primary]:text-gray-1',
          'data-[variant=secondary]:bg-red-3',
          'data-[variant=secondary]:text-red-9',
        ],
        warning: [
          'data-[variant=primary]:bg-yellow-9',
          'data-[variant=primary]:dark:text-gray-1',
          'data-[variant=primary]:text-gray-12',
          'data-[variant=secondary]:bg-yellow-3',
          'data-[variant=secondary]:text-yellow-9',
        ],
        orange: [
          'data-[variant=primary]:bg-orange-9',
          'data-[variant=primary]:dark:text-gray-12',
          'data-[variant=primary]:text-gray-1',
          'data-[variant=secondary]:bg-orange-3',
          'data-[variant=secondary]:text-orange-9',
        ],
      },
    },
  },
);
