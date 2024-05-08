'use client';

import { useEffect, useState } from 'react';

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
      <div className={twMerge(clsx(toastVariants({ intent }), className))}>
        <div className="flex w-full items-start gap-2">
          {icon ? (
            <span className={clsx(toastIconContainerVariants({ intent }))}>{icon}</span>
          ) : null}
          <div className={clsx(toastContainerStyles)}>
            <div className={toastTitleVariants({ intent })}>{title}</div>
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
    { unstyled: true, className: 'w-full', ...rest },
  );
};

const ToastCloseButton: React.FC<ToastCloseButtonProps> = ({ id, intent }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  const isTouchScreen = mounted ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) : false;

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
