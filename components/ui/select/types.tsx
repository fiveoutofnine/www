import type { ReactNode } from 'react';

import { SelectItem } from '.';
import { selectVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

export type SelectVariantProps = VariantProps<typeof selectVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type SelectItemProps = JSX.IntrinsicElements['option'];

export type SelectProps = Omit<JSX.IntrinsicElements['select'], 'size'> &
  SelectVariantProps & {
    rightIcon?: ReactNode;
    selectSize?: number;
  };

// -----------------------------------------------------------------------------
// Composition
// -----------------------------------------------------------------------------

export type SelectComposition = {
  Item: typeof SelectItem;
};
