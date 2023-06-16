import type { FC } from 'react';

import clsx from 'clsx';

import { DESIGN_COMPONENT_PAGES, DESIGN_PAGES } from '@/lib/constants/site';
import type { PageSlug } from '@/lib/types/site';

import { Button } from '@/components/ui';

/* Props */
type DesignNavBarProps = {
  selected?: PageSlug;
};

/* Component */
const DesignNavBar: FC<DesignNavBarProps> = ({ selected }) => {
  return (
    <nav
      className="hidden sticky top-28 -ml-3 min-w-[10rem] max-w-[10rem] flex-col md:flex"
      style={{ height: 'calc(100vh - 11rem)' }}
    >
      <div className="ml-3 text-base font-medium text-gray-12">Foundations</div>
      {DESIGN_PAGES.map((page) => {
        const pageSelected = selected === page.slug;

        return (
          <Button
            key={page.slug}
            className={clsx(
              'mt-1 w-full justify-start',
              pageSelected ? 'cursor-default bg-gray-4' : '',
            )}
            variant="ghost"
            href={page.slug}
            disabled={pageSelected}
          >
            {page.name}
          </Button>
        );
      })}

      <div className="ml-3 mt-4 text-base font-medium text-gray-12">Components</div>
      {DESIGN_COMPONENT_PAGES.map((page) => {
        const pageSelected = selected === page.slug;

        return (
          <Button
            key={page.slug}
            className={clsx(
              'mt-1 w-full justify-start',
              pageSelected ? 'cursor-default bg-gray-4' : '',
            )}
            variant="ghost"
            href={page.slug}
            disabled={pageSelected}
          >
            {page.name}
          </Button>
        );
      })}
    </nav>
  );
};

export default DesignNavBar;
