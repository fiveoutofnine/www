import { textAreaVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

type TextAreaVariantProps = VariantProps<typeof textAreaVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  TextAreaVariantProps;
