'use client';

import { forwardRef } from 'react';

import { avatarFallbackStyles, avatarImageStyles, avatarStyles } from './styles';
import type {
  AvatarComposition,
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarRootProps,
} from './types';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const AvatarFallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={twMerge(clsx(avatarFallbackStyles, className))}
    {...props}
  />
));

const AvatarImage = forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
      ref={ref}
      className={twMerge(clsx(avatarImageStyles, className))}
      {...props}
    />
  ),
);

const AvatarRoot = forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarRootProps>(
  ({ className, size = 40, style, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={twMerge(clsx(avatarStyles, className))}
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  ),
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

AvatarRoot.displayName = AvatarPrimitive.Root.displayName;
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const Avatar: AvatarComposition = {
  Fallback: AvatarFallback,
  Image: AvatarImage,
  Root: AvatarRoot,
};

export default Avatar;
