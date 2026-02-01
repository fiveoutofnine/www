import { isValidElement } from 'react';

import type { MDXComponents } from 'mdx/types';

import {
  A,
  Blockquote,
  Callout,
  Code,
  H1,
  H2,
  H3,
  Hr,
  MathDisplay,
  P,
  ToastButton,
} from '@/components/mdx';
import { CodeBlock } from '@/components/ui';
import type { CodeBlockLanguage, CodeBlockProps } from '@/components/ui/code-block/types';

import DesignComponentsDisplay from '@/app/design/(components)/components-display';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <A {...props} />,
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => <Blockquote {...props} />,
    code: (props: React.HTMLAttributes<HTMLModElement>) => <Code {...props} />,
    h1: (props: React.HtmlHTMLAttributes<HTMLHeadingElement>) => <H1 {...props} />,
    h2: (props: React.HtmlHTMLAttributes<HTMLHeadingElement>) => <H2 {...props} />,
    h3: (props: React.HtmlHTMLAttributes<HTMLHeadingElement>) => <H3 {...props} />,
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => <Hr {...props} />,
    p: (props: React.HtmlHTMLAttributes<HTMLParagraphElement>) => <P {...props} />,
    pre: ({
      children,
      ...rest
    }: React.HTMLAttributes<HTMLPreElement> & Omit<CodeBlockProps, 'children'>) => {
      const childrenProps = isValidElement<{ className?: string; children?: string }>(children)
        ? children.props
        : undefined;
      const language = childrenProps?.className
        ? (childrenProps.className.substring(9) as CodeBlockLanguage)
        : undefined;
      const code = typeof childrenProps?.children === 'string' ? childrenProps.children.trim() : '';

      return (
        <CodeBlock language={language} {...rest}>
          {code}
        </CodeBlock>
      );
    },
    Blockquote,
    Callout,
    DesignComponentsDisplay,
    MathDisplay,
    ToastButton,
    ...components,
  };
}

export default useMDXComponents;
