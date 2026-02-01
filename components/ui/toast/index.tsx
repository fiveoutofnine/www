'use client';

import { Button } from '..';
import {
  toastCloseButtonVariants,
  toastContainerStyles,
  toastDescriptionVariants,
  toastIconContainerVariants,
  toastTitleVariants,
  toastVariants,
} from './styles';
import type { ToastCloseButtonProps, ToastFactoryComposition, ToastFactoryProps } from './types';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { Toaster as ToasterSonner, toast as toastSonner } from 'sonner';
import { twMerge } from 'tailwind-merge';

import { useIsTouchScreen } from '@/lib/hooks';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Toaster = ({
  toastOptions,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<typeof ToasterSonner>) => (
  <ToasterSonner
    toastOptions={{
      unstyled: true,
      className: twMerge(clsx(['rounded-lg'], className)),
      ...toastOptions,
    }}
    {...rest}
  />
);

const toast: ToastFactoryProps & ToastFactoryComposition = ({
  className,
  intent = 'info',
  title,
  description,
  hasCloseButton = false,
  icon,
  action,
  ...rest
}) => {
  return toastSonner.custom(
    (id) => (
      <div className={twMerge(clsx(toastVariants({ intent }), className))} tabIndex={-1}>
        <div className="flex w-full items-start gap-2">
          {icon ? (
            <span className={clsx(toastIconContainerVariants({ intent }))}>{icon}</span>
          ) : null}
          <div className={clsx(toastContainerStyles)}>
            {title ? <div className={toastTitleVariants({ intent })}>{title}</div> : null}
            {description ? (
              typeof description === 'string' || typeof description === 'number' ? (
                <div className={toastDescriptionVariants({ intent, clip: true })}>
                  {description}
                </div>
              ) : (
                <div className={toastDescriptionVariants({ intent, clip: false })}>
                  {description}
                </div>
              )
            ) : null}
          </div>
        </div>
        {action ? (
          typeof action === 'object' && 'label' in action ? (
            <Button size="sm" variant="primary" intent={intent} onClick={action.onClick}>
              {action.label}
            </Button>
          ) : (
            action
          )
        ) : null}
        {hasCloseButton ? <ToastCloseButton id={id} intent={intent} /> : null}
      </div>
    ),
    { unstyled: true, className: 'w-full focus:outline-none', ...rest },
  );
};

const ToastCloseButton: React.FC<ToastCloseButtonProps> = ({ id, intent }) => {
  const isTouchScreen = useIsTouchScreen();

  return (
    <button
      className={toastCloseButtonVariants({ intent, isTouchScreen })}
      onClick={() => toast.dismiss(id)}
      aria-label="Close toast."
    >
      <X className="size-2.5" />
    </button>
  );
};

toast.dismiss = toastSonner.dismiss;
toast.promise = toastSonner.promise;

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Toaster.displayName = 'Toaster';

export { toast };
export default Toaster;
