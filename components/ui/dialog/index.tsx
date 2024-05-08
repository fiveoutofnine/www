'use client';

import { forwardRef } from 'react';

import { IconButton } from '..';
import {
  dialogContentStyles,
  dialogDescriptionStyles,
  dialogFooterStyles,
  dialogHeaderStyles,
  dialogOverlayStyles,
  dialogTitleStyles,
} from './styles';
import type {
  DialogComposition,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogTitleProps,
} from './types';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DialogClose = DialogPrimitive.Close;

const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, hasCloseButton = true, fakeOverlay = false, children, ...rest }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    {fakeOverlay ? <div className={twMerge(clsx(dialogOverlayStyles))} /> : null}
    <DialogPrimitive.Content
      ref={ref}
      className={twMerge(clsx(dialogContentStyles, className))}
      {...rest}
    >
      {children}
      {hasCloseButton ? (
        <DialogPrimitive.Close className="absolute right-2 top-2" asChild>
          <IconButton size="md" variant="ghost">
            <X />
            <span className="sr-only">Close</span>
          </IconButton>
        </DialogPrimitive.Close>
      ) : null}
    </DialogPrimitive.Content>
  </DialogPortal>
));

const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, ...rest }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={twMerge(clsx(dialogDescriptionStyles, className))}
    {...rest}
  />
));

const DialogFooter: React.FC<DialogFooterProps> = ({ className, ...rest }) => (
  <div className={twMerge(clsx(dialogFooterStyles, className))} {...rest} />
);

const DialogHeader: React.FC<DialogHeaderProps> = ({ className, ...rest }) => (
  <div className={twMerge(clsx(dialogHeaderStyles, className))} {...rest} />
);

const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...rest }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={twMerge(clsx(dialogOverlayStyles, className))}
    {...rest}
  />
));

const DialogPortal = DialogPrimitive.Portal;

const DialogRoot = DialogPrimitive.Root;

const DialogTitle = forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, DialogTitleProps>(
  ({ className, ...rest }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={twMerge(clsx(dialogTitleStyles, className))}
      {...rest}
    />
  ),
);

const DialogTrigger = DialogPrimitive.Trigger;

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

DialogClose.displayName = DialogPrimitive.Close.displayName;
DialogContent.displayName = DialogPrimitive.Content.displayName;
DialogDescription.displayName = DialogPrimitive.Description.displayName;
DialogFooter.displayName = 'DialogFooter';
DialogHeader.displayName = 'DialogHeader';
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
DialogPortal.displayName = DialogPrimitive.Portal.displayName;
DialogRoot.displayName = DialogPrimitive.Root.displayName;
DialogTitle.displayName = DialogPrimitive.Title.displayName;
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;

const Dialog: DialogComposition = {
  Close: DialogClose,
  Content: DialogContent,
  Description: DialogDescription,
  Footer: DialogFooter,
  Header: DialogHeader,
  Overlay: DialogOverlay,
  Portal: DialogPortal,
  Root: DialogRoot,
  Title: DialogTitle,
  Trigger: DialogTrigger,
};

export default Dialog;
