import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import { Download, Github, Linkedin } from 'lucide-react';

import KentMiguelAvatar from '@/components/common/kentmiguel-avatar';
import { Button } from '@/components/ui';

const KentMiguelHeader: FC = () => {
  const currentPath = usePathname();
  return (
    <div className="relative flex flex-col items-center rounded-xl border border-gray-6 bg-gray-2 p-3 md:flex-row md:justify-between md:rounded-2xl md:p-6">
      <div className="jumbo absolute inset-0 z-0 opacity-50"></div>
      <div className="relative z-10 flex h-full w-full items-center">
        <div className="flex w-full items-center">
          {/* Avatar (desktop) */}
          <KentMiguelAvatar className="mr-4 hidden md:block" size={56} />
          {/* Avatar (mobile) */}
          <KentMiguelAvatar className="mr-2 md:hidden" size={40} />
          <div>
            <div className="text-base font-semibold md:text-2xl">Kent Miguel</div>
            <span className="mt-0.5 text-sm text-gray-11 md:mt-1 md:text-base">
              Full-Stack Developer , Security Researcher
              {/* Working on{' '} */}
              {/* <LinkPreview
              className="font-medium text-gray-12 hover:underline"
              href="https://waterfall.market"
              src="/static/waterfall-market-preview.webp"
              target="_blank"
              rel="noreferrer noopener"
            >
              Waterfall
            </LinkPreview>{' '}
            and{' '}
            <LinkPreview
              className="font-medium text-gray-12 hover:underline"
              href="https://curta.wtf"
              src="/static/curta-wtf-preview.webp"
              target="_blank"
              rel="noreferrer noopener"
            >
              Curta
            </LinkPreview>
            . */}
            </span>
          </div>
        </div>
      </div>

      {/* Links (Desktop) */}
      <div className="hidden space-x-2 md:flex">
        <Button
          intent="primary"
          href="https://www.linkedin.com/in/kent-miguel/"
          leftIcon={<Linkedin />}
          newTab
        >
          LinkedIn
        </Button>
        <Button
          href="https://github.com/kmiguel10"
          leftIcon={<Github />}
          intent="success"
          variant="primary"
          newTab
        >
          GitHub
        </Button>
        {currentPath === '/resume' && (
          <Button
            size="md"
            className="w-full"
            leftIcon={<Download />}
            intent="success"
            variant="outline"
            newTab
          >
            <a href="/kentmiguel.pdf" download>
              Resume
            </a>
          </Button>
        )}
      </div>
      {/* Links (Mobile) */}
      <div className="mt-4 flex w-full space-x-2 md:hidden">
        <Button
          size="md"
          intent="primary"
          className="w-full"
          href="https://www.linkedin.com/in/kent-miguel/"
          leftIcon={<Linkedin />}
          newTab
        >
          LinkedIn
        </Button>
        <Button
          size="md"
          className="w-full"
          intent="success"
          variant="primary"
          href="https://github.com/kmiguel10"
          leftIcon={<Github />}
          newTab
        >
          GitHub
        </Button>
        {currentPath === '/resume' && (
          <Button
            size="md"
            className="w-full"
            leftIcon={<Download />}
            intent="success"
            variant="outline"
            newTab
          >
            <a href="/kentmiguel.pdf" download>
              Resume
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

KentMiguelHeader.displayName = 'KentMiguelHeader';

export default KentMiguelHeader;
