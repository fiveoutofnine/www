'use client';

import { usePathname } from 'next/navigation';

import { Link } from 'lucide-react';

import { toast } from '@/components/ui';

const H2: React.FC<React.HtmlHTMLAttributes<HTMLHeadingElement>> = ({ children, ...rest }) => {
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
      <h2 id={id} {...rest}>
        <a
          href={`#${id}`}
          className="not-prose group flex w-fit items-center gap-2 rounded text-xl font-semibold tracking-tight text-gray-12 no-underline md:text-2xl"
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
          <Link className="hidden size-4 text-gray-11 animate-in fade-in-50 group-hover:flex group-focus-visible:flex md:size-5" />
        </a>
      </h2>
    );
  }

  return <h2 {...rest}>{children}</h2>;
};

export default H2;
