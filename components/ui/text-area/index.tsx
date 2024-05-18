import { forwardRef } from 'react';

import { textAreaVariants } from './styles';
import type { TextAreaProps } from './types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const TextArea = forwardRef(
  (
    { className, resizable = false, ...rest }: TextAreaProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>,
  ) => (
    <textarea
      className={twMerge(clsx(textAreaVariants({ resizable }), className))}
      ref={ref}
      {...rest}
    />
  ),
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

TextArea.displayName = 'TextArea';

export default TextArea;
