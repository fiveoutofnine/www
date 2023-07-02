import { codeBlockContainerVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

/* Variant Props */
type CodeBlockVariantProps = VariantProps<typeof codeBlockContainerVariants>;

/* Component Props */
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
      | 'none';
    highlightLines?: number[];
    showLineNumbers?: boolean;
    children: string;
  };
