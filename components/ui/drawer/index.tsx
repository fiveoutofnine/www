'use client';

import { forwardRef } from 'react';

import {
  drawerContentContainerStyles,
  drawerContentHandleContainerStyles,
  drawerContentHandleStyles,
  drawerContentStyles,
  drawerDescriptionStyles,
  drawerFooterStyles,
  drawerHeaderStyles,
  drawerOverlayStyles,
  drawerTitleStyles,
} from './styles';
import type {
  DrawerComposition,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerOverlayProps,
  DrawerRootProps,
  DrawerTitleProps,
} from './types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Drawer as DrawerPrimitive } from 'vaul';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DrawerClose = DrawerPrimitive.Close;

const DrawerContent = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, ...rest }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={twMerge(clsx(drawerContentStyles, className))}
      {...rest}
    >
      <div className={clsx(drawerContentHandleContainerStyles)}>
        <div className={clsx(drawerContentHandleStyles)} />
      </div>
      {/* We wrap the inner contents so the overflow scrolls are dealt with
          properly without messing up other components of `<Drawer />`. */}
      <div className={clsx(drawerContentContainerStyles)} drawer-content="">
        {children}
      </div>
    </DrawerPrimitive.Content>
  </DrawerPortal>
));

const DrawerDescription = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  DrawerDescriptionProps
>(({ className, ...rest }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={twMerge(clsx(drawerDescriptionStyles, className))}
    {...rest}
  />
));

const DrawerFooter = ({ className, ...rest }: DrawerFooterProps) => (
  <div className={twMerge(clsx(drawerFooterStyles, className))} {...rest} />
);

const DrawerHeader = ({ className, ...rest }: DrawerHeaderProps) => (
  <div className={twMerge(clsx(drawerHeaderStyles, className))} {...rest} />
);

const DrawerOverlay = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  DrawerOverlayProps
>(({ className, ...rest }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={twMerge(clsx(drawerOverlayStyles, className))}
    {...rest}
  />
));

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerRoot = ({ shouldScaleBackground = false, ...rest }: DrawerRootProps) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...rest} />
);

const DrawerTitle = forwardRef<React.ElementRef<typeof DrawerPrimitive.Title>, DrawerTitleProps>(
  ({ className, ...rest }, ref) => (
    <DrawerPrimitive.Title
      ref={ref}
      className={twMerge(clsx(drawerTitleStyles, className))}
      {...rest}
    />
  ),
);

const DrawerTrigger = DrawerPrimitive.Trigger;

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

DrawerClose.displayName = DrawerPrimitive.Close.displayName;
DrawerContent.displayName = DrawerPrimitive.Content.displayName;
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;
DrawerFooter.displayName = 'DrawerFooter';
DrawerHeader.displayName = 'DrawerHeader';
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
DrawerPortal.displayName = DrawerPrimitive.Portal.displayName;
DrawerRoot.displayName = 'DrawerRoot';
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;
DrawerTrigger.displayName = DrawerPrimitive.Trigger.displayName;

const Drawer: DrawerComposition = {
  Close: DrawerClose,
  Content: DrawerContent,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Header: DrawerHeader,
  Overlay: DrawerOverlay,
  Portal: DrawerPortal,
  Root: DrawerRoot,
  Title: DrawerTitle,
  Trigger: DrawerTrigger,
};

export default Drawer;
