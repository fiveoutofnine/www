'use client';

import { usePathname } from 'next/navigation';
import { Fragment, useMemo, useState } from 'react';

import clsx from 'clsx';
import { ChevronRight, Menu, X } from 'lucide-react';

import { DESIGN_COMPONENT_PAGES, DESIGN_PAGES } from '@/lib/constants/site';
import { useMediaQuery } from '@/lib/hooks';

import { Button, Drawer, IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type DesignNavBarInternalProps = {
  selected: string;
  scrollTop?: number;
  onTrigger?: () => void;
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
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [scrollIsAtBottom, setScrollIsAtBottom] = useState<boolean>(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    setScrollTop(scrollTop);
    setScrollIsAtBottom(scrollHeight - scrollTop <= clientHeight);
  };

  return (
    <aside
      className={clsx(
        'hide-scrollbar design--desktop group sticky top-28 -ml-3 hidden min-w-[11rem] max-w-[11rem] flex-col overflow-y-scroll px-0.5 focus:outline-none md:flex',
        // Note that the height on this gradient overflow indicator is greater
        // because it requires more clarity than the dividers directly below
        // each sections' title that there's more to scroll.
        'after:pointer-events-none after:sticky after:bottom-0 after:left-0 after:z-[35] after:min-h-8 after:w-full after:bg-gradient-to-t after:from-gray-1 after:transition-opacity after:content-[""]',
        scrollIsAtBottom ? 'after:opacity-0' : 'after:opacity-100',
      )}
      style={{ height: 'calc(100vh - 11rem)' }}
      onScroll={handleScroll}
      tabIndex={-1}
    >
      <DesignNavBarInternal selected={selected} scrollTop={scrollTop} />
    </aside>
  );
};

const DesignNavBarMobile: React.FC<DesignNavBarInternalProps> = ({ selected }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // `md` breakpoint

  const [selectedSectionName, selectedPageName] = useMemo(() => {
    const page = DESIGN_PAGES.find((page) => page.slug === selected);
    if (page) return ['Foundations', page.name];

    const componentPage = DESIGN_COMPONENT_PAGES.find((page) => page.slug === selected);
    if (componentPage) return ['Components', componentPage.name];

    return ['', ''];
  }, [selected]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollTop = target.scrollTop;

    setScrollTop(scrollTop);
  };

  return (
    <Drawer.Root open={open && isSmallScreen} onOpenChange={setOpen}>
      <div className="pointer-events-auto sticky top-12 z-popover mb-4 flex h-12 w-full items-center border-b border-gray-6 bg-white px-4 dark:bg-black md:hidden">
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

      <Drawer.Content
        className="design--mobile group"
        onOpenAutoFocus={(e) => e.preventDefault()}
        contentContainerProps={{ onScroll: handleScroll }}
        // This positions the top of the drawer to be `0.5rem` below the two nav
        // bars on small screens. Note that we don't need this to be responsive
        // to account for when there's only 1 nav bar present on large screens
        // because the drawer is set to be closed on large screens.
        style={{ maxHeight: 'calc(100% - 6.5rem' }}
      >
        <DesignNavBarInternal
          selected={selected}
          scrollTop={scrollTop}
          onTrigger={() => setOpen(false)}
        />
      </Drawer.Content>
    </Drawer.Root>
  );
};

const DesignNavBarInternal: React.FC<DesignNavBarInternalProps> = ({
  selected,
  scrollTop,
  onTrigger,
}) => {
  // Scroll is at the top if the user hasn't scrolled yet.
  const scrollBreakpoint1 = (scrollTop ?? 0) <= 4;
  // Scroll has scrolled past the 1st section. `36` is the height and margin of
  // a page button, `16` is the margin between any 2 sections, and `4` is the
  // the margin for the 2nd section's 1st page button.
  const scrollBreakpoint2 = (scrollTop ?? 0) <= 36 * DESIGN_PAGES.length + 16 + 4;

  return (
    <Fragment>
      <div
        className={clsx(
          'sticky top-0 z-40 pl-3 text-base font-medium text-gray-12',
          'group-[.design--desktop]:bg-gray-1 group-[.design--desktop]:after:from-gray-1',
          'group-[.design--mobile]:bg-gray-2 group-[.design--mobile]:after:from-gray-2',
          'after:pointer-events-none after:absolute after:left-0 after:top-6 after:z-[35] after:h-6 after:w-full after:bg-gradient-to-b after:transition-opacity after:content-[""]',
          scrollBreakpoint1 ? 'after:opacity-0' : 'after:opacity-100',
        )}
      >
        Foundations
      </div>
      {DESIGN_PAGES.map((page) => {
        const pageSelected = selected === page.slug;

        return (
          <Button
            key={page.slug}
            className={clsx(
              'mt-1 min-h-8 w-full justify-start',
              pageSelected ? 'cursor-default bg-gray-5 text-gray-12' : '',
            )}
            variant="ghost"
            href={page.slug}
            onClick={onTrigger ?? undefined}
            disabled={pageSelected}
          >
            {page.name}
          </Button>
        );
      })}

      <div
        className={clsx(
          'sticky top-6 z-40 mt-4 pl-3 text-base font-medium text-gray-12',
          'group-[.design--desktop]:bg-gray-1 group-[.design--desktop]:after:from-gray-1',
          'group-[.design--mobile]:bg-gray-2 group-[.design--mobile]:after:from-gray-2',
          'after:pointer-events-none after:absolute after:left-0 after:top-6 after:z-[35] after:h-6 after:w-full after:bg-gradient-to-b after:transition-opacity after:content-[""]',
          scrollBreakpoint2 ? 'after:opacity-0' : 'after:opacity-100',
        )}
      >
        Components
      </div>
      {DESIGN_COMPONENT_PAGES.map((page) => {
        const pageSelected = selected === page.slug;

        return (
          <Button
            key={page.slug}
            className={clsx(
              'mt-1 min-h-8 w-full justify-start',
              pageSelected ? 'cursor-default bg-gray-5 text-gray-12' : '',
            )}
            variant="ghost"
            href={page.slug}
            onClick={onTrigger ?? undefined}
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
