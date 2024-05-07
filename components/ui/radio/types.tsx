import { radioDetailedItemVariants } from './styles';
import * as RadioPrimitive from '@radix-ui/react-radio-group';
import type { VariantProps } from 'class-variance-authority';

// ---------------------------------------–-------------------------------------
// Variant props
// ---------------------------------------–-------------------------------------

type RadioDetailedItemVariants = VariantProps<typeof radioDetailedItemVariants>;

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioPrimitive.Root>;

export type RadioItemProps =
  | (Omit<React.ComponentPropsWithoutRef<typeof RadioPrimitive.Item>, 'type'> & { type?: 'normal' })
  | (Omit<React.ComponentPropsWithoutRef<typeof RadioPrimitive.Item>, 'id' | 'type'> &
      RadioDetailedItemVariants & {
        type?: 'detailed';
        title: string;
        description?: string;
        icon?: React.ReactNode;
      });

// -----------------------------------------------------------------------------
// Composition
// -----------------------------------------------------------------------------

export type RadioComposition = {
  Group: React.FC<RadioGroupProps>;
  Item: React.FC<RadioItemProps>;
};
