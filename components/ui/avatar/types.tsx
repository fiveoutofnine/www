import * as AvatarPrimitive from '@radix-ui/react-avatar';

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;

export type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

export type AvatarRootProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  size?: number;
};

// ---------------------------------------–-------------------------------------
// Composition
// ---------------------------------------–-------------------------------------

export type AvatarComposition = {
  Fallback: React.FC<AvatarFallbackProps>;
  Image: React.FC<AvatarImageProps>;
  Root: React.FC<AvatarRootProps>;
};
