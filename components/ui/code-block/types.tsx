import { codeBlockActionsVariants, codeBlockContainerVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// -----------------------------------------------------------------------------
// Variant props
// -----------------------------------------------------------------------------

type CodeBlockActionsVariantProps = VariantProps<typeof codeBlockActionsVariants>;

type CodeBlockVariantProps = VariantProps<typeof codeBlockContainerVariants>;

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type CodeBlockActionsProps = CodeBlockActionsVariantProps & {
  code: string;
  switcher?: {
    options: { label: string; value: CodeBlockLanguage }[];
    value: CodeBlockLanguage;
    onChange: (value: CodeBlockLanguage) => void;
  };
};

export type CodeBlockLanguage =
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
  | 'diff'
  | 'none';

export type CodeBlockProps = Omit<JSX.IntrinsicElements['pre'], 'children'> &
  CodeBlockVariantProps & {
    fileName?: string;
    language?: CodeBlockLanguage;
    logo?: React.FC<JSX.IntrinsicElements['svg']>;
    highlightLines?: number[];
    showLineNumbers?: boolean;
    breakLines?: boolean;
    switcher?: {
      options: { label: string; value: CodeBlockLanguage }[];
      value: CodeBlockLanguage;
      onChange: (value: CodeBlockLanguage) => void;
    };
    children: string;
  };
