'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { DESIGN_COMPONENT_PAGES, DESIGN_PAGES } from '@/lib/constants/site';

const DesignPageNav: React.FC = () => {
  const pathname = usePathname();

  const pages = useMemo(() => DESIGN_PAGES.concat(DESIGN_COMPONENT_PAGES), []);
  const prevPage = useMemo(() => {
    const index = pages.findIndex((page) => page.slug === pathname);

    return index > 0 ? pages[index - 1] : null;
  }, [pages, pathname]);

  const nextPage = useMemo(() => {
    const index = pages.findIndex((page) => page.slug === pathname);

    return index !== -1 && index < pages.length - 1 ? pages[index + 1] : null;
  }, [pages, pathname]);

  return (
    <div className="flex w-full items-center justify-between">
      {prevPage ? (
        <Link
          className="flex items-center gap-1 rounded-sm text-sm text-gray-11 no-underline transition-colors hover:text-gray-12"
          href={prevPage.slug}
        >
          <ArrowLeft className="size-4" />
          <span>{prevPage.name}</span>
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}
      {nextPage ? (
        <Link
          className="flex items-center gap-1 rounded-sm text-sm text-gray-11 no-underline transition-colors hover:text-gray-12"
          href={nextPage.slug}
        >
          <span>{nextPage.name}</span>
          <ArrowRight className="size-4" />
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}
    </div>
  );
};

export default DesignPageNav;
