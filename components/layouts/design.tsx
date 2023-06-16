import type { FC, ReactNode } from 'react';

import { MDXProvider } from '@mdx-js/react';

import type { PageSlug } from '@/lib/types/site';

import BaseLayout from '@/components/layouts/base';
import ContainerLayout from '@/components/layouts/container';
import DesignNavBar from '@/components/pages/design/nav-bar';
import DesignPageNav from '@/components/pages/design/page-nav';

/* Props */
type DesignLayoutProps = {
  name: string;
  selected: PageSlug;
  children?: ReactNode;
};

/* Component */
const DesignLayout: FC<DesignLayoutProps> = ({ name, selected, children }) => {
  const components = {
    a: ({ children, ...rest }: JSX.IntrinsicElements['a']) => (
      <a className="mdx--link group font-medium text-blue-9 no-underline hover:underline" {...rest}>
        {children}
      </a>
    ),
    blockquote: ({ children }: JSX.IntrinsicElements['blockquote']) => (
      <blockquote className="mdx--blockquote group rounded-xl border border-blue-6 bg-blue-3 p-4 text-blue-12">
        {children}
      </blockquote>
    ),
    code: ({ children }: JSX.IntrinsicElements['code']) => (
      <code className="rounded border border-gray-6 bg-gray-3 px-1 py-0.5 font-normal text-gray-12 before:content-none after:content-none group-[.mdx--link]:text-blue-9">
        {children}
      </code>
    ),
    h1: ({ children }: JSX.IntrinsicElements['h1']) => (
      <h1 className="mb-4 text-3xl font-semibold tracking-tight text-gray-12 md:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }: JSX.IntrinsicElements['h2']) => (
      <h2 className="mb-2 mt-6 text-xl font-semibold tracking-tight text-gray-12 md:mb-4 md:mt-12 md:text-2xl">
        {children}
      </h2>
    ),
    p: ({ children }: JSX.IntrinsicElements['p']) => (
      <p className="font-normal not-italic text-gray-11 before:content-none after:content-none group-[.mdx--blockquote]:my-0 group-[.mdx--blockquote]:text-blue-12">
        {children}
      </p>
    ),
  };

  return (
    <BaseLayout name={name} pageSlug="/design">
      {/* Overriding default padding of `p-4` on small devices because this is
      intended to be a docs page, and `p-6` increases readability quite a bit. */}
      <ContainerLayout className="relative flex max-w-[90rem] flex-col space-x-0 p-6 md:flex-row md:space-x-16">
        <DesignNavBar selected={selected} />
        <MDXProvider components={components}>
          <article className="prose prose-gray max-w-none grow dark:prose-invert">
            {children}
            <hr className="mb-6 mt-6 w-full rounded-full border-gray-6 md:mt-12" />
            <DesignPageNav pageSlug={selected} />
          </article>
        </MDXProvider>
      </ContainerLayout>
    </BaseLayout>
  );
};

export default DesignLayout;
