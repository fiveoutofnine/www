import { toastVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';
import { Toaster as ToasterSonner, toast as toastSonner } from 'sonner';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

export type ToastVariantProps = VariantProps<typeof toastVariants>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export type ToastCloseButtonProps = ToastVariantProps & {
  id: string | number;
};

export type ToasterProps = React.ComponentPropsWithoutRef<typeof ToasterSonner>;

export type ToastFactoryProps = (
  props: ToastProps & Parameters<typeof toastSonner.custom>[1],
) => ReturnType<typeof toastSonner>;

export type ToastProps = ToastVariantProps & {
  title?: string;
  description?: React.ReactNode;
  hasCloseButton?: boolean;
};

// -----------------------------------------------------------------------------
// Composition
// -----------------------------------------------------------------------------

export type ToastFactoryComposition = {
  dismiss: typeof toastSonner.dismiss;
  promise: typeof toastSonner.promise;
};
