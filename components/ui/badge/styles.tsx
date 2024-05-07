import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  [
    'rounded-full',
    'justify-center',
    'items-center',
    'font-medium',
    'flex',
    'min-w-fit',
    'w-fit',
    'text-nowrap',
    'whitespace-nowrap',
    'overflow-hidden',
    'text-ellipsis',
  ],
  {
    variants: {
      size: {
        sm: ['min-w-[1rem]', 'h-4', 'text-xs'],
        md: ['min-w-[1.25rem]', 'h-5', 'text-sm'],
        lg: ['min-w-[1.5rem]', 'h-6', 'text-base'],
      },
      variant: {
        primary: [],
        secondary: [],
        outline: ['border'],
      },
      intent: {
        none: [
          'data-[variant=primary]:bg-gray-9',
          'data-[variant=primary]:text-white',
          'data-[variant=secondary]:bg-gray-3',
          'data-[variant=secondary]:text-gray-11',
          'data-[variant=outline]:bg-gray-3',
          'data-[variant=outline]:text-gray-11',
          'data-[variant=outline]:border-gray-6',
        ],
        primary: [
          'data-[variant=primary]:bg-blue-9',
          'data-[variant=primary]:text-white',
          'data-[variant=secondary]:bg-blue-3',
          'data-[variant=secondary]:text-blue-11',
          'data-[variant=outline]:bg-blue-3',
          'data-[variant=outline]:text-blue-11',
          'data-[variant=outline]:border-blue-6',
        ],
        success: [
          'data-[variant=primary]:bg-green-9',
          'data-[variant=primary]:text-white',
          'data-[variant=secondary]:bg-green-3',
          'data-[variant=secondary]:text-green-11',
          'data-[variant=outline]:bg-green-3',
          'data-[variant=outline]:text-green-11',
          'data-[variant=outline]:border-green-6',
        ],
        fail: [
          'data-[variant=primary]:bg-red-9',
          'data-[variant=primary]:text-white',
          'data-[variant=secondary]:bg-red-3',
          'data-[variant=secondary]:text-red-11',
          'data-[variant=outline]:bg-red-3',
          'data-[variant=outline]:text-red-11',
          'data-[variant=outline]:border-red-6',
        ],
        warning: [
          'data-[variant=primary]:bg-yellow-9',
          'data-[variant=primary]:text-black',
          'data-[variant=secondary]:bg-yellow-3',
          'data-[variant=secondary]:text-yellow-11',
          'data-[variant=outline]:bg-yellow-3',
          'data-[variant=outline]:text-yellow-11',
          'data-[variant=outline]:border-yellow-6',
        ],
        orange: [
          'data-[variant=primary]:bg-orange-9',
          'data-[variant=primary]:text-white',
          'data-[variant=secondary]:bg-orange-3',
          'data-[variant=secondary]:text-orange-11',
          'data-[variant=outline]:bg-orange-3',
          'data-[variant=outline]:text-orange-11',
          'data-[variant=outline]:border-orange-6',
        ],
        black: [
          'data-[variant=primary]:bg-black',
          'data-[variant=primary]:text-white',
          'data-[variant=outline]:bg-black',
          'data-[variant=outline]:text-white',
          'data-[variant=outline]:border-white',
        ],
      },
      type: {
        number: [
          'data-[length-one=false]:data-[size=sm]:px-1.5',
          'data-[length-one=false]:data-[size=md]:px-2',
          'data-[length-one=false]:data-[size=lg]:px-2.5',
        ],
        text: ['data-[size=sm]:px-2', 'data-[size=md]:px-2.5', 'data-[size=lg]:px-3'],
      },
    },
  },
);
