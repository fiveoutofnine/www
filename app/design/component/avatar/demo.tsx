'use client';

import { Avatar } from '@/components/ui';

export const AvatarFallbackDemo: React.FC = () => {
  return (
    <Avatar.Root size={64}>
      <Avatar.Image src="INVALID_SRC" alt="Invalid image source." />
      <Avatar.Fallback>Fallback</Avatar.Fallback>
    </Avatar.Root>
  );
};
