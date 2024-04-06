import Image from 'next/image';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import avatar from '@/public/avatar.svg';

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

const FiveoutofnineAvatar: React.FC<FiveoutofnineAvatarProps> = ({ className, size = 40 }) => {
  return (
    <Image
      className={clsx(twMerge('my-0 rounded-full border border-gray-6', className))}
      width={size}
      height={size}
      src={avatar}
      alt="5/9 avatar"
    />
  );
};

export default FiveoutofnineAvatar;
