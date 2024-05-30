'use client';

import { forwardRef } from 'react';

import {
  accordionContentContainerStyles,
  accordionContentVariants,
  accordionItemVariants,
  accordionTriggerChevronStyles,
  accordionTriggerContentStyles,
  accordionTriggerVariants,
} from './styles';
import type {
  AccordionComposition,
  AccordionContentProps,
  AccordionItemProps,
  AccordionTriggerProps,
} from './types';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, variant = 'normal', children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={clsx(accordionContentContainerStyles)}
    {...props}
  >
    <div className={twMerge(clsx(accordionContentVariants({ variant }), className))}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));

const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant = 'normal', ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={twMerge(clsx(accordionItemVariants({ variant }), className))}
    {...props}
  />
));

const AccordionRoot = AccordionPrimitive.Root;

const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, variant = 'normal', children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={twMerge(clsx(accordionTriggerVariants({ variant }), className))}
      {...props}
    >
      <span className={clsx(accordionTriggerContentStyles)} accordion-trigger-content="">
        {children}
      </span>
      <ChevronRight className={clsx(accordionTriggerChevronStyles)} />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

AccordionContent.displayName = AccordionPrimitive.Content.displayName;
AccordionItem.displayName = AccordionPrimitive.Item.displayName;
AccordionRoot.displayName = AccordionPrimitive.Root.displayName;
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const Accordion: AccordionComposition = {
  Content: AccordionContent,
  Item: AccordionItem,
  Root: AccordionRoot,
  Trigger: AccordionTrigger,
};

export default Accordion;
