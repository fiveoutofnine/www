import { cva } from 'class-variance-authority';

export const popoverArrowVariants = cva(['animate-in', 'fade-in-50', 'shadow-md'], {
  variants: {
    inverted: {
      true: ['fill-gray-12'],
      false: ['fill-gray-3', 'stroke-2', 'stroke-gray-6'],
    },
  },
});

export const popoverVariants = cva(
  [
    'font-normal',
    'text-sm',
    'p-3',
    'rounded-md',
    'shadow-md',
    'z-50',
    'overflow-hidden',
    'animate-in',
    'fade-in-50',
    'zoom-in-90',
    'focus:outline-none',
    'data-[side=bottom]:slide-in-from-top-1',
    'data-[side=left]:slide-in-from-right-1',
    'data-[side=right]:slide-in-from-left-1',
    'data-[side=top]:slide-in-from-bottom-1',
  ],
  {
    variants: {
      inverted: {
        true: ['bg-gray-12', 'text-gray-1'],
        false: ['bg-gray-3', 'text-gray-12', 'border', 'border-gray-6'],
      },
    },
  },
);
