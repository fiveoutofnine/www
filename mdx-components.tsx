import { isValidElement } from 'react';

import type { MDXComponents } from 'mdx/types';

import { A, Code, H1, H2, H3, P } from '@/components/templates/mdx';
import { CodeBlock } from '@/components/ui';
import type { CodeBlockProps } from '@/components/ui/code-block/types';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props: JSX.IntrinsicElements['a']) => <A {...props} />,
    code: (props: JSX.IntrinsicElements['code']) => <Code {...props} />,
    h1: (props: JSX.IntrinsicElements['h1']) => <H1 {...props} />,
    h2: (props: JSX.IntrinsicElements['h2']) => <H2 {...props} />,
    h3: (props: JSX.IntrinsicElements['h3']) => <H3 {...props} />,
    p: (props: JSX.IntrinsicElements['p']) => <P {...props} />,
    pre: ({
      children,
      ...rest
    }: JSX.IntrinsicElements['pre'] & Omit<CodeBlockProps, 'children'>) => {
      const childrenProps = isValidElement(children) ? children.props : undefined;
      const language = childrenProps?.className ? childrenProps.className.substring(9) : undefined;
      const code = typeof childrenProps?.children === 'string' ? childrenProps.children.trim() : '';

      return (
        <CodeBlock language={language} {...rest}>
          {code}
        </CodeBlock>
      );
    },
    ...components,
  };
}

export default useMDXComponents;
