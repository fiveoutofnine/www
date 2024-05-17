import { Github } from 'lucide-react';

import FiveoutofnineAvatar from '@/components/common/fiveoutofnine-avatar';
import LogoIcon from '@/components/common/logo-icon';
import LinkPreview from '@/components/templates/link-preview';
import { Button } from '@/components/ui';

const FiveoutofnineHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-6 bg-gray-2 p-3 md:flex-row md:justify-between md:rounded-2xl md:p-6">
      <div className="flex w-full items-center">
        {/* Avatar (desktop) */}
        <FiveoutofnineAvatar className="mr-4 hidden md:block" size={56} />
        {/* Avatar (mobile) */}
        <FiveoutofnineAvatar className="mr-2 md:hidden" size={40} />
        <div>
          <div className="text-base font-semibold md:text-2xl">5/9</div>
          <span className="mt-0.5 text-sm text-gray-11 md:mt-1 md:text-base">
            Working on{' '}
            <LinkPreview
              className="font-medium text-gray-12 hover:underline"
              href="https://curta.wtf"
              src="/static/curta-wtf-preview.webp"
              target="_blank"
              rel="noreferrer noopener"
            >
              Curta
            </LinkPreview>
            .
          </span>
        </div>
      </div>

      {/* Links (desktop) */}
      <div className="hidden space-x-2 md:flex">
        <Button intent="info" href="https://x.com/fiveoutofnine" leftIcon={<LogoIcon.X />} newTab>
          Twitter
        </Button>
        <Button href="https://github.com/fiveoutofnine" leftIcon={<Github />} newTab>
          GitHub
        </Button>
      </div>
      {/* Links (mobile) */}
      <div className="mt-4 flex w-full space-x-2 md:hidden">
        <Button
          size="md"
          intent="info"
          className="w-full"
          href="https://x.com/fiveoutofnine"
          leftIcon={<LogoIcon.X />}
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

export default FiveoutofnineHeader;
