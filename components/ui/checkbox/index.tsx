'use client';

import { forwardRef } from 'react';

import { checkboxIndicatorIconVariants, checkboxIndicatorStyles, checkboxVariants } from './styles';
import type { CheckboxProps } from './types';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Checkbox = forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <CheckboxPrimitive.Root
      className={twMerge(clsx(checkboxVariants({ size }), className))}
      ref={ref}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={clsx(checkboxIndicatorStyles)}>
        <Check className={checkboxIndicatorIconVariants({ size })} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
