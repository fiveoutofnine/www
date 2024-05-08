import * as DialogPrimitive from '@radix-ui/react-dialog';

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type DialogCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

export type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  hasCloseButton?: boolean;
  fakeOverlay?: boolean;
};

export type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;

export type DialogFooterProps = JSX.IntrinsicElements['div'];

export type DialogHeaderProps = JSX.IntrinsicElements['div'];

export type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

export type DialogPortalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;

export type DialogRootProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

export type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

// -----------------------------------------------------------------------------
// Composition
// -----------------------------------------------------------------------------

export type DialogComposition = {
  Close: React.FC<DialogCloseProps>;
  Content: React.FC<DialogContentProps>;
  Description: React.FC<DialogDescriptionProps>;
  Footer: React.FC<DialogFooterProps>;
  Header: React.FC<DialogHeaderProps>;
  Overlay: React.FC<DialogOverlayProps>;
  Portal: React.FC<DialogPortalProps>;
  Root: React.FC<DialogRootProps>;
  Title: React.FC<DialogTitleProps>;
  Trigger: React.FC<DialogTriggerProps>;
};
