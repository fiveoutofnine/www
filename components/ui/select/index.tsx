import { type FC, type ForwardedRef, forwardRef } from 'react';

import { selectContainerStyles, selectIconContainerVariants, selectVariants } from './styles';
import type { SelectComposition, SelectItemProps, SelectProps } from './types';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Select: FC<SelectProps> & SelectComposition = ({
  className,
  size = 'md',
  variant = 'primary',
  intent = 'none',
  disabled = false,
  rightIcon,
  selectSize,
  children,
  ...rest
}) => {
  return (
    <div className={selectContainerStyles}>
      <select
        className={twMerge(
          clsx(
            selectVariants({ size, variant, intent: !disabled ? intent : undefined, disabled }),
            className,
          ),
        )}
        size={selectSize}
        data-variant={variant}
        data-disabled={disabled}
        aria-disabled={disabled}
        disabled={disabled}
        {...rest}
      >
        {children}
      </select>
      <span
        className={selectIconContainerVariants({
          size,
          variant,
          intent: !disabled ? intent : undefined,
          disabled,
        })}
      >
        {rightIcon ?? <ChevronDown />}
      </span>
    </div>
  );
};

export const SelectItem = forwardRef(
  ({ ...rest }: SelectItemProps, ref: ForwardedRef<HTMLOptionElement>) => {
    return <option {...rest} ref={ref} />;
  },
);

SelectItem.displayName = 'SelectItem';

Select.displayName = 'Select';

Select.Item = SelectItem;

export default Select;
