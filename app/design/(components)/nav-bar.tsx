'use client';

import { usePathname } from 'next/navigation';
import { Fragment, useMemo, useState } from 'react';

import clsx from 'clsx';
import { ChevronRight, Menu, X } from 'lucide-react';

import { DESIGN_COMPONENT_PAGES, DESIGN_PAGES } from '@/lib/constants/site';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

import { Button, Drawer, IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type DesignNavBarInternalProps = {
  selected: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DesignNavBar: React.FC = () => {
  const pathname = usePathname() ?? '';

  return (
    <Fragment>
      <DesignNavBarDesktop selected={pathname} />
      <DesignNavBarMobile selected={pathname} />
    </Fragment>
  );
};

const DesignNavBarDesktop: React.FC<DesignNavBarInternalProps> = ({ selected }) => {
  return (
    <aside
      className="hide-scrollbar sticky top-28 -ml-3 hidden min-w-[11rem] max-w-[11rem] flex-col overflow-y-scroll px-0.5 focus:outline-none md:flex"
      style={{ height: 'calc(100vh - 11rem)' }}
      tabIndex={-1}
    >
      <DesignNavBarInternal selected={selected} />
    </aside>
  );
};

const DesignNavBarMobile: React.FC<DesignNavBarInternalProps> = ({ selected }) => {
  const [open, setOpen] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // `md` breakpoint

  const [selectedSectionName, selectedPageName] = useMemo(() => {
    const page = DESIGN_PAGES.find((page) => page.slug === selected);
    if (page) return ['Foundations', page.name];

    const componentPage = DESIGN_COMPONENT_PAGES.find((page) => page.slug === selected);
    if (componentPage) return ['Components', componentPage.name];

    return ['', ''];
  }, [selected]);

  return (
    <Drawer.Root open={open && isSmallScreen} onOpenChange={setOpen}>
      <div className="pointer-events-auto sticky top-12 z-popover mb-6 flex h-12 w-full items-center border-b border-gray-6 bg-white px-4 dark:bg-black md:hidden">
        <Drawer.Trigger asChild>
          <IconButton
            variant="outline"
            aria-label={open ? 'Close design navigation bar' : 'Open design navigation bar'}
          >
            {open ? <X className="animate-in fade-in" /> : <Menu className="animate-in fade-in" />}
          </IconButton>
        </Drawer.Trigger>
        <ol className="ml-4 flex text-sm">
          <li className="flex items-center text-gray-11">
            {selectedSectionName}
            <ChevronRight className="mx-1 size-4" />
          </li>
          <li className="font-medium text-gray-12">{selectedPageName}</li>
        </ol>
      </div>

      <Drawer.Content onOpenAutoFocus={(e) => e.preventDefault()}>
        <DesignNavBarInternal selected={selected} />
      </Drawer.Content>
    </Drawer.Root>
  );
};

const DesignNavBarInternal: React.FC<DesignNavBarInternalProps> = ({ selected }) => {
  return (
    <Fragment>
      <div className="ml-3 text-base font-medium text-gray-12">Foundations</div>
      {DESIGN_PAGES.map((page) => {
        const pageSelected = selected === page.slug;

        return (
          <Button
            key={page.slug}
            className={clsx(
              'mt-1 w-full justify-start',
              pageSelected ? 'cursor-default bg-gray-5 text-gray-12' : '',
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
              pageSelected ? 'cursor-default bg-gray-5 text-gray-12' : '',
            )}
            variant="ghost"
            href={page.slug}
            disabled={pageSelected}
          >
            {page.name}
          </Button>
        );
      })}
    </Fragment>
  );
};

export default DesignNavBar;
