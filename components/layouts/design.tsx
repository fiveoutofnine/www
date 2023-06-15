import type { FC, ReactNode } from 'react';

import { MDXProvider } from '@mdx-js/react';

import BaseLayout from '@/components/layouts/base';
import ContainerLayout from '@/components/layouts/container';

/* Props */
type DesignLayoutProps = {
  children?: ReactNode;
};

/* Component */
const DesignLayout: FC<DesignLayoutProps> = ({ children }) => {
  const components = {
    h1: ({ children }: JSX.IntrinsicElements['h1']) => (
      <h1 className="font-semibold tracking-tight text-gray-12">{children}</h1>
    ),
    h2: ({ children }: JSX.IntrinsicElements['h2']) => (
      <h2 className="font-semibold tracking-tight text-gray-12">{children}</h2>
    ),
    p: ({ children }: JSX.IntrinsicElements['p']) => <p className="text-gray-11">{children}</p>,
  };

  return (
    <BaseLayout name="Design" pageSlug="/design">
      <ContainerLayout className="max-w-[80rem]">
        <MDXProvider components={components}>
          <article className="prose prose-gray max-w-none dark:prose-invert">{children}</article>
        </MDXProvider>
      </ContainerLayout>
    </BaseLayout>
  );
};

export default DesignLayout;
