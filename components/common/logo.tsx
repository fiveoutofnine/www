import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import logo from '@/public/logo.svg';

/* Props */
type LogoProps = {
  className?: string;
  href?: string;
};

/* Component */
const Logo: FC<LogoProps> = ({ className, href = '/' }) => {
  return (
    <Link href={href} className={clsx(twMerge('h-8 w-8 hover:brightness-75', className))}>
      <Image width={512} height={512} src={logo} alt="5/9 logo" />
    </Link>
  );
};

Logo.displayName = 'Logo';

export default Logo;
