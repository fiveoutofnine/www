import Link from 'next/link';
import { type FC, useMemo } from 'react';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { DESIGN_COMPONENT_PAGES, DESIGN_PAGES } from '@/lib/constants/site';
import type { PageSlug } from '@/lib/types/site';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type DesignPageNavProps = {
  pageSlug?: PageSlug;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DesignPageNav: FC<DesignPageNavProps> = ({ pageSlug }) => {
  const pages = useMemo(() => DESIGN_PAGES.concat(DESIGN_COMPONENT_PAGES), []);
  const prevPage = useMemo(() => {
    const index = pages.findIndex((page) => page.slug === pageSlug);

    return index > 0 ? pages[index - 1] : null;
  }, [pages, pageSlug]);

  const nextPage = useMemo(() => {
    const index = pages.findIndex((page) => page.slug === pageSlug);

    if (index === -1) {
      return null;
    }

    return index !== -1 && index < pages.length - 1 ? pages[index + 1] : null;
  }, [pages, pageSlug]);

  return (
    <div className="flex w-full items-center justify-between">
      {prevPage ? (
        <Link
          className="flex items-center space-x-1 text-sm text-gray-11 no-underline transition-colors hover:text-gray-12"
          href={prevPage.slug}
        >
          <ArrowLeft className="h-4 w-4" />
          <div>{prevPage.name}</div>
        </Link>
      ) : (
        <div />
      )}
      {nextPage ? (
        <Link
          className="flex items-center space-x-1 text-sm text-gray-11 no-underline transition-colors hover:text-gray-12"
          href={nextPage.slug}
        >
          <div>{nextPage.name}</div>
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default DesignPageNav;
