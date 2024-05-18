import { buttonIconVariants, buttonVariants } from '../button/styles';
import { cva } from 'class-variance-authority';

export const iconButtonExtraVariants = cva(['px-0'], {
  variants: {
    size: {
      sm: ['w-6'],
      md: ['w-8'],
      lg: ['w-10'],
      xl: ['w-12'],
    },
  },
});

export { buttonIconVariants as iconButtonIconVariants, buttonVariants as iconButtonVariants };
