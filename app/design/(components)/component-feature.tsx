'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';

import { IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ComponentFeatureProps = {
  className?: string;
  href: string;
  children?: React.ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const ComponentFeature: React.FC<ComponentFeatureProps> = ({
  className,
  href,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const isMobile = isMounted ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) : false;

  return (
    <div
      className={clsx(
        'group relative flex h-32 w-full items-center justify-center rounded-xl border border-gray-7 bg-gray-2 transition-colors hover:border-gray-8',
        className,
      )}
      tabIndex={-1}
    >
      {children}
      <IconButton
        variant="ghost"
        className={clsx(
          'absolute bottom-2 right-2',
          isMobile ? 'flex' : 'hidden animate-in fade-in group-hover:flex',
        )}
        href={href}
      >
        <ArrowRight />
      </IconButton>
    </div>
  );
};

export default ComponentFeature;
