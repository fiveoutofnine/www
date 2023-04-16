import type { FC } from 'react';

import FiveoutofnineAvatar from '../common/fiveoutofnine-avatar';
import { Github, Twitter } from 'lucide-react';

import { Button } from '@/components/ui';

const FiveoutofnineProfileHeader: FC = () => {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-6 bg-gray-2 p-3 md:flex-row md:justify-between md:rounded-2xl md:p-6">
      <div className="flex w-full items-center">
        {/* Avatar (desktop) */}
        <FiveoutofnineAvatar className="mr-4 hidden md:block" size={56} />
        {/* Avatar (mobile) */}
        <FiveoutofnineAvatar className="mr-2 md:hidden" size={40} />
        <div>
          <div className="text-base font-semibold md:text-2xl">fiveoutofnine</div>
          <span className="mt-0.5 text-sm text-gray-11 md:mt-1 md:text-base">
            Working on{' '}
            <a
              className="font-medium text-gray-12"
              href="https://waterfall.market"
              target="_blank"
              rel="noreferrer noopener"
            >
              Waterfall
            </a>{' '}
            and{' '}
            <a
              className="font-medium text-gray-12"
              href="https://curta.wtf"
              target="_blank"
              rel="noreferrer noopener"
            >
              Curta
            </a>
            .
          </span>
        </div>
      </div>

      {/* Links (desktop) */}
      <div className="hidden space-x-2 md:flex">
        <Button intent="primary" href="https://twitter.com/fiveoutofnine" leftIcon={<Twitter />}>
          Twitter
        </Button>
        <Button href="https://github.com/fiveoutofnine" leftIcon={<Github />}>
          GitHub
        </Button>
      </div>
      {/* Links (mobile) */}
      <div className="mt-4 flex w-full space-x-2 md:hidden">
        <Button
          size="md"
          intent="primary"
          className="w-full"
          href="https://twitter.com/fiveoutofnine"
          leftIcon={<Twitter />}
        >
          Twitter
        </Button>
        <Button
          size="md"
          className="w-full"
          href="https://github.com/fiveoutofnine"
          leftIcon={<Github />}
        >
          GitHub
        </Button>
      </div>
    </div>
  );
};

FiveoutofnineProfileHeader.displayName = 'FiveoutofnineProfileHeader';

export default FiveoutofnineProfileHeader;
