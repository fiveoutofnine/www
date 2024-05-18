'use client';

import { forwardRef, useId } from 'react';

import {
  radioDetailedDescriptionVariants,
  radioDetailedIconContainerVariants,
  radioDetailedIndicatorIconVariants,
  radioDetailedIndicatorVariants,
  radioDetailedItemVariants,
  radioDetailedTitleVariants,
  radioGroupStyles,
  radioIndicatorIconStyles,
  radioIndicatorStyles,
  radioItemStyles,
} from './styles';
import type { RadioComposition, RadioGroupProps, RadioItemProps } from './types';
import * as RadioPrimitive from '@radix-ui/react-radio-group';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const RadioGroup = forwardRef<React.ElementRef<typeof RadioPrimitive.Root>, RadioGroupProps>(
  ({ className, ...rest }, ref) => (
    <RadioPrimitive.Root
      className={twMerge(clsx(radioGroupStyles, className))}
      ref={ref}
      {...rest}
    />
  ),
);

const RadioItem = forwardRef<React.ElementRef<typeof RadioPrimitive.Item>, RadioItemProps>(
  ({ className, type = 'normal', ...rest }, ref) => {
    // Generate ID for radio items that are of `type` `detailed`.
    const id = useId();

    if (type === 'normal') {
      return (
        <RadioPrimitive.Item
          className={twMerge(clsx(radioItemStyles, className))}
          ref={ref}
          {...rest}
        >
          <RadioPrimitive.Indicator className={clsx(radioIndicatorStyles)}>
            <div className={clsx(radioIndicatorIconStyles)} />
          </RadioPrimitive.Indicator>
        </RadioPrimitive.Item>
      );
    }

    // @ts-expect-error `description` and `icon` are valid props for `RadioItem`
    // when `type` is `detailed`.
    const { intent: intent_, title, description, icon, ...rest_ } = rest;
    const intent = intent_ ?? 'none';

    return (
      <RadioPrimitive.Item
        id={id}
        className={twMerge(clsx(radioDetailedItemVariants({ intent }), className))}
        {...rest_}
      >
        <div className="flex items-center gap-2.5">
          {icon ? (
            <div className={radioDetailedIconContainerVariants({ intent })}>{icon}</div>
          ) : null}
          <div className="flex flex-col gap-0.5">
            <label htmlFor={id} className={radioDetailedTitleVariants({ intent })}>
              {title}
            </label>
            {description ? (
              <div className={radioDetailedDescriptionVariants({ intent })}>{description}</div>
            ) : null}
          </div>
        </div>
        <div className={radioDetailedIndicatorVariants({ intent })}>
          <RadioPrimitive.Indicator className={radioDetailedIndicatorIconVariants({ intent })} />
        </div>
      </RadioPrimitive.Item>
    );
  },
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

RadioGroup.displayName = RadioPrimitive.Root.displayName;
RadioItem.displayName = RadioPrimitive.Item.displayName;

const Radio: RadioComposition = {
  Group: RadioGroup,
  Item: RadioItem,
};

export default Radio;
