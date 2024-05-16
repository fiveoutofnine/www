import type { MDXComponents } from 'mdx/types';

import { H1, H2, H3 } from '@/components/templates/mdx';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: JSX.IntrinsicElements['h1']) => <H1 {...props} />,
    h2: (props: JSX.IntrinsicElements['h2']) => <H2 {...props} />,
    h3: (props: JSX.IntrinsicElements['h3']) => <H3 {...props} />,
    ...components,
  };
}

export default useMDXComponents;
