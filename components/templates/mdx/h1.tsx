'use client';

import { usePathname } from 'next/navigation';

import { Link } from 'lucide-react';

import { toast } from '@/components/ui';

const H1: React.FC<JSX.IntrinsicElements['h1']> = ({ children, ...rest }) => {
  const pathname = usePathname();

  if (typeof children === 'string') {
    const id = children
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim();

    return (
      <h1 id={id} {...rest}>
        <a
          href={`#${id}`}
          className="not-prose group mb-4 flex w-fit items-center gap-3 rounded text-3xl font-semibold tracking-tight text-gray-12 no-underline md:gap-4 md:text-4xl"
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://fiveoutofnine.com'}${pathname}#${id}`,
            );
            toast({
              intent: 'info',
              title: 'Copied to clipboard',
              description: 'URL copied to clipboard.',
            });
          }}
        >
          {children}
          <Link className="hidden size-5 text-gray-11 animate-in fade-in-50 group-hover:flex group-focus-visible:flex md:size-6" />
        </a>
      </h1>
    );
  }

  return <h1 {...rest}>{children}</h1>;
};

export default H1;
