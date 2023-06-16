import { type FC, Fragment, useMemo, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { ChevronRight, Menu, X } from 'lucide-react';

import { DESIGN_COMPONENT_PAGES, DESIGN_PAGES } from '@/lib/constants/site';
import type { PageSlug } from '@/lib/types/site';

import { Button, IconButton } from '@/components/ui';

/* Props */
type DesignNavBarProps = {
  selected?: PageSlug;
};

/* Component */
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
      className="sticky top-28 -ml-3 hidden min-w-[10rem] max-w-[10rem] flex-col md:flex"
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

const DesignNavBarMobile: FC<DesignNavBarProps> = ({ selected }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [selectedSectionName, selectedPageName] = useMemo(() => {
    const page = DESIGN_PAGES.find((page) => page.slug === selected);
    if (page) return ['Foundations', page.name];

    const componentPage = DESIGN_COMPONENT_PAGES.find((page) => page.slug === selected);
    if (componentPage) return ['Components', componentPage.name];

    return ['', ''];
  }, [selected]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="sticky top-12 z-popover mb-6 flex h-12 w-full items-center border-b border-gray-6 bg-black px-4 md:hidden">
        <Dialog.Trigger asChild>
          <IconButton>{open ? <X /> : <Menu />}</IconButton>
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
        <Dialog.Overlay
          className="fixed bottom-0 left-0 z-overlay w-full outline-none backdrop-brightness-50 animate-in fade-in-50 focus:outline-none md:hidden"
          style={{ height: 'calc(100vh - 6rem)' }}
        />
        <Dialog.Content asChild>
          <nav
            className="fixed bottom-0 left-0 z-overlay w-full overflow-y-auto border-r border-gray-6 bg-gray-1 p-4 animate-in slide-in-from-top-1 md:hidden"
            style={{ height: 'calc(100vh - 6rem)' }}
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DesignNavBar;
