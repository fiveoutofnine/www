'use client';

import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import ConnectButton from './connect-button';
import Logo from './logo';
import clsx from 'clsx';

import { NAVBAR_PAGES } from '@/lib/constants/site';

import { Button, IconButton, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type NavBarInternalProps = {
  selected?: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const NavBar: React.FC = () => {
  // Determine which page is selected.
  const pathname = usePathname() ?? '';
  const path = pathname.split('/');
  const selected = `/${!path || path.length < 1 ? '' : path[1]}`;

  return (
    <Fragment>
      <NavBarDesktop selected={selected} />
      <NavBarMobile selected={selected} />
    </Fragment>
  );
};

const NavBarDesktop: React.FC<NavBarInternalProps> = ({ selected }) => {
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
      <ConnectButton />
    </nav>
  );
};

const NavBarMobile: React.FC<NavBarInternalProps> = ({ selected }) => {
  return (
    <nav className="pointer-events-auto sticky top-0 z-popover flex h-12 items-center border-b border-gray-6 bg-white px-4 dark:bg-black md:hidden">
      <Logo />
      {NAVBAR_PAGES.map((page) => {
        const pageSelected = selected === page.slug;

        return (
          <Tooltip key={page.slug} content={page.name} triggerProps={{ asChild: true }}>
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
      <ConnectButton />
    </nav>
  );
};

export default NavBar;
