import { Drawer as DrawerPrimitive } from 'vaul';

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type DrawerCloseProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>;

export type DrawerContentProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
  contentContainerProps?: React.HTMLAttributes<HTMLDivElement>;
};

export type DrawerDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Description
>;

export type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;

export type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export type DrawerOverlayProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>;

export type DrawerPortalProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Portal>;

export type DrawerRootProps = React.ComponentPropsWithRef<typeof DrawerPrimitive.Root>;

export type DrawerTitleProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>;

export type DrawerTriggerProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>;

// -----------------------------------------------------------------------------
// Composition
// -----------------------------------------------------------------------------

export type DrawerComposition = {
  Close: React.FC<DrawerCloseProps>;
  Content: React.FC<DrawerContentProps>;
  Description: React.FC<DrawerDescriptionProps>;
  Footer: React.FC<DrawerFooterProps>;
  Header: React.FC<DrawerHeaderProps>;
  Overlay: React.FC<DrawerOverlayProps>;
  Portal: React.FC<DrawerPortalProps>;
  Root: React.FC<DrawerRootProps>;
  Title: React.FC<DrawerTitleProps>;
  Trigger: React.FC<DrawerTriggerProps>;
};
