import type { FC, ReactNode } from 'react';

import DesignNavBar from '../pages/design/nav-bar';
import { MDXProvider } from '@mdx-js/react';

import BaseLayout from '@/components/layouts/base';
import ContainerLayout from '@/components/layouts/container';

/* Props */
type DesignLayoutProps = {
  name: string;
  selected: string;
  children?: ReactNode;
};

/* Component */
const DesignLayout: FC<DesignLayoutProps> = ({ name, selected, children }) => {
  const components = {
    h1: ({ children }: JSX.IntrinsicElements['h1']) => (
      <h1 className="text-4xl font-semibold tracking-tight text-gray-12">{children}</h1>
    ),
    h2: ({ children }: JSX.IntrinsicElements['h2']) => (
      <h2 className="text-2xl font-semibold tracking-tight text-gray-12">{children}</h2>
    ),
    h3: ({ children }: JSX.IntrinsicElements['h3']) => (
      <h3 className="text-xl font-semibold tracking-tight text-gray-12">{children}</h3>
    ),
    p: ({ children }: JSX.IntrinsicElements['p']) => <p className="text-gray-11">{children}</p>,
  };

  return (
    <BaseLayout name={name} pageSlug="/design">
      <ContainerLayout className="flex max-w-[80rem] flex-col space-x-0 md:flex-row md:space-x-12">
        <DesignNavBar selected={selected} />
        <MDXProvider components={components}>
          <article className="prose prose-gray max-w-none grow dark:prose-invert">
            {children}
          </article>
        </MDXProvider>
      </ContainerLayout>
    </BaseLayout>
  );
};

export default DesignLayout;
