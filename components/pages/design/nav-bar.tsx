import { type FC, Fragment, useMemo, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { ChevronRight, Menu, X } from 'lucide-react';

import { DESIGN_COMPONENT_PAGES, DESIGN_PAGES } from '@/lib/constants/site';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import type { PageSlug } from '@/lib/types/site';

import { Button, IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type DesignNavBarProps = {
  selected?: PageSlug;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DesignNavBar: FC<DesignNavBarProps> = (props) => {
  return (
    <Fragment>
      <DesignNavBarDesktop {...props} />
      <DesignNavBarMobile {...props} />
    </Fragment>
  );
};

const DesignNavBarDesktop: FC<DesignNavBarProps> = ({ selected }) => {
  return (
    <nav
      className="hide-scrollbar sticky top-28 -ml-3 hidden min-w-[11rem] max-w-[11rem] flex-col overflow-y-scroll px-0.5 md:flex"
      style={{ height: 'calc(100vh - 11rem)' }}
    >
      <DesignNavBarInternal selected={selected} />
    </nav>
  );
};

const DesignNavBarMobile: FC<DesignNavBarProps> = ({ selected }) => {
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
    <Dialog.Root open={open && isSmallScreen} onOpenChange={setOpen}>
      <div className="pointer-events-auto sticky top-12 z-popover mb-6 flex h-12 w-full items-center border-b border-gray-6 bg-white px-4 dark:bg-black md:hidden">
        <Dialog.Trigger asChild>
          <IconButton
            variant="outline"
            aria-label={open ? 'Close design nav bar' : 'Open design nav bar'}
          >
            {open ? <X /> : <Menu />}
          </IconButton>
        </Dialog.Trigger>
        <ol className="ml-4 flex text-sm">
          <li className="flex items-center text-gray-11">
            {selectedSectionName}
            <ChevronRight className="mx-1 h-4 w-4" />
          </li>
          <li className="font-medium text-gray-12">{selectedPageName}</li>
        </ol>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-overlay outline-none backdrop-brightness-50 animate-in fade-in-50 focus:outline-none md:hidden" />
        <Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} asChild>
          <nav className="hide-scrollbar fixed inset-0 z-overlay overflow-y-scroll bg-gray-1 p-4 pt-28 animate-in slide-in-from-top-1 md:hidden">
            <DesignNavBarInternal selected={selected} />
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const DesignNavBarInternal: FC<DesignNavBarProps> = ({ selected }) => {
  return (
    <Fragment>
      <div className="ml-3 text-base font-medium text-gray-12">Foundations</div>
      {DESIGN_PAGES.map((page) => {
        const pageSelected = selected === page.slug;

        return (
          <div key={page.slug}>
            <Button
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
          </div>
        );
      })}

      <div className="ml-3 mt-4 text-base font-medium text-gray-12">Components</div>
      {DESIGN_COMPONENT_PAGES.map((page) => {
        const pageSelected = selected === page.slug;

        return (
          <div key={page.slug}>
            <Button
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
          </div>
        );
      })}
    </Fragment>
  );
};

export default DesignNavBar;
