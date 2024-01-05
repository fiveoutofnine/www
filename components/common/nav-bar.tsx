import { type FC, Fragment } from 'react';

import Logo from './logo';
import clsx from 'clsx';

import { NAVBAR_PAGES } from '@/lib/constants/site';
import type { PageSlug } from '@/lib/types/site';

import ConnectButton from '@/components/common/connect-button';
import { Button, IconButton, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type NavBarProps = {
  selected?: PageSlug;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const NavBar: FC<NavBarProps> = ({ selected }) => {
  return (
    <Fragment>
      <DesktopNavBar selected={selected} />
      <MobileNavBar selected={selected} />
    </Fragment>
  );
};

const DesktopNavBar: FC<NavBarProps> = ({ selected }) => {
  return (
    <nav className="pointer-events-auto sticky top-0 z-popover hidden h-12 items-center border-b border-gray-6 bg-white px-4 dark:bg-black md:flex">
      <Logo />
      {NAVBAR_PAGES.map((page) => {
        const pageSelected = selected === page.slug;

        return (
          <Button
            key={page.slug}
            className={clsx('ml-2', pageSelected ? 'cursor-default bg-gray-4' : '')}
            variant="ghost"
            href={page.slug}
            disabled={pageSelected}
          >
            {page.name}
          </Button>
        );
      })}
      <div className="flex-grow" />
      {/* <ConnectButton /> */}
    </nav>
  );
};

const MobileNavBar: FC<NavBarProps> = ({ selected }) => {
  return (
    <nav className="pointer-events-auto sticky top-0 z-popover flex h-12 items-center border-b border-gray-6 bg-white px-4 dark:bg-black md:hidden">
      <Logo />
      {NAVBAR_PAGES.map((page) => {
        const pageSelected = selected === page.slug;

        return (
          <Tooltip key={page.slug} content={page.name}>
            <IconButton
              className={clsx('ml-2', pageSelected ? 'cursor-default bg-gray-4' : '')}
              variant="ghost"
              href={page.slug}
              disabled={pageSelected}
            >
              {page.icon}
            </IconButton>
          </Tooltip>
        );
      })}
      <div className="flex-grow" />
      {/* <ConnectButton /> */}
    </nav>
  );
};

export default NavBar;
