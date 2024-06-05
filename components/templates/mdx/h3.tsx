'use client';

import { usePathname } from 'next/navigation';

import { Link } from 'lucide-react';

import { toast } from '@/components/ui';

const H3: React.FC<JSX.IntrinsicElements['h3']> = ({ children, ...rest }) => {
  const pathname = usePathname();

  const stringChildren: string[] = (
    Array.isArray(children) ? children : [typeof children === 'string' ? children : '']
  ).filter((child) => typeof child === 'string' && child.length > 0);

  if (stringChildren.length > 0) {
    const id = stringChildren
      .join('-')
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim();

    return (
      <h3 id={id} {...rest}>
        <a
          href={`#${id}`}
          className="not-prose group mb-2 mt-5 flex w-fit items-center gap-2 rounded text-lg font-semibold tracking-tight text-gray-12 no-underline md:mb-4 md:mt-6 md:text-xl"
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
          <span>{children}</span>
          <Link className="hidden size-4 text-gray-11 animate-in fade-in-50 group-hover:flex group-focus-visible:flex" />
        </a>
      </h3>
    );
  }

  return <h3 {...rest}>{children}</h3>;
};

export default H3;
