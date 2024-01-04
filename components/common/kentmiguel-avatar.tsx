import Image from 'next/image';
import type { FC } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import avatar from '@/public/profile.webp';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type FiveoutofnineAvatarProps = {
  className?: string;
  size?: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const KentMiguelAvatar: FC<FiveoutofnineAvatarProps> = ({ className, size = 40 }) => {
  return (
    <Image
      className={clsx(twMerge('my-0 rounded-full border border-gray-6', className))}
      width={size}
      height={size}
      src={avatar}
      alt="Kent Miguel avatar"
    />
  );
};

KentMiguelAvatar.displayName = 'KentMiguelAvatar';

export default KentMiguelAvatar;
