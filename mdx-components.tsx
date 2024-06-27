import { isValidElement } from 'react';

import type { MDXComponents } from 'mdx/types';

import {
  A,
  Blockquote,
  Callout,
  Code,
  Grid,
  H1,
  H2,
  H3,
  Hr,
  MathDisplay,
  P,
  ToastButton,
} from '@/components/templates/mdx';
import { CodeBlock, Table } from '@/components/ui';
import type { CodeBlockProps } from '@/components/ui/code-block/types';

import DesignComponentsDisplay from '@/app/design/(components)/components-display';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props: JSX.IntrinsicElements['a']) => <A {...props} />,
    blockquote: (props: JSX.IntrinsicElements['blockquote']) => <Blockquote {...props} />,
    code: (props: JSX.IntrinsicElements['code']) => <Code {...props} />,
    h1: (props: JSX.IntrinsicElements['h1']) => <H1 {...props} />,
    h2: (props: JSX.IntrinsicElements['h2']) => <H2 {...props} />,
    h3: (props: JSX.IntrinsicElements['h3']) => <H3 {...props} />,
    hr: (props: JSX.IntrinsicElements['hr']) => <Hr {...props} />,
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
    Blockquote,
    Callout,
    Grid,
    DesignComponentsDisplay,
    MathDisplay,
    Table,
    ToastButton,
    ...components,
  };
}

export default useMDXComponents;
