import { codeBlockContainerVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

type CodeBlockVariantProps = VariantProps<typeof codeBlockContainerVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type CodeBlockProps = Omit<JSX.IntrinsicElements['pre'], 'children'> &
  CodeBlockVariantProps & {
    fileName?: string;
    language?:
      | 'javascript'
      | 'js'
      | 'typescript'
      | 'ts'
      | 'jsx'
      | 'tsx'
      | 'solidity'
      | 'sol'
      | 'python'
      | 'py'
      | 'bash'
      | 'sh'
      | 'none';
    highlightLines?: number[];
    showLineNumbers?: boolean;
    children: string;
  };
