import { cva } from 'class-variance-authority';

export const textAreaVariants = cva(
  [
    'block',
    'w-full',
    'leading-normal',
    'text-sm',
    'text-gray-12',
    'rounded-md',
    // `(input_height_md - height_1_line) / 2 = (36 - (14 * 1.5)) / 2 = 7.5`.
    'py-[7.5px]',
    'px-2.5',
    'transition-colors',
    'border',
    'border-gray-7',
    'hover:border-gray-8',
    'bg-gray-2',
    'focus:outline-none',
    'placeholder:text-gray-11',
    'focus-visible:ring-blue-9',
    'focus-visible:ring-1',
    'disabled:bg-gray-9',
    'disabled:border-gray-6',
    'invalid:bg-red-3',
    'invalid:text-red-11',
    'invalid:border-red-7',
    'invalid:hover:border-red-8',
  ],
  {
    variants: {
      resizable: {
        true: ['resize-y'],
        false: ['resize-none'],
      },
    },
  },
);
