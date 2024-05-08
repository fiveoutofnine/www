import {
  accordionContentVariants,
  accordionItemVariants,
  accordionTriggerVariants,
} from './styles';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import type { VariantProps } from 'class-variance-authority';

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

type AccordionContentVariantProps = VariantProps<typeof accordionContentVariants>;

type AccordionItemVariantProps = VariantProps<typeof accordionItemVariants>;

type AccordionTriggerVariantProps = VariantProps<typeof accordionTriggerVariants>;

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
> &
  AccordionContentVariantProps;

export type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> &
  AccordionItemVariantProps;

export type AccordionRootProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;

export type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> &
  AccordionTriggerVariantProps;

// ---------------------------------------–-------------------------------------
// Composition
// ---------------------------------------–-------------------------------------

export type AccordionComposition = {
  Content: React.FC<AccordionContentProps>;
  Item: React.FC<AccordionItemProps>;
  Root: React.FC<AccordionRootProps>;
  Trigger: React.FC<AccordionTriggerProps>;
};
