export type CodeBlockProps = Omit<JSX.IntrinsicElements['pre'], 'children'> & {
  fileName?: string;
  language?: 'javascript' | 'js' | 'jsx' | 'tsx' | 'solidity' | 'py' | 'none';
  highlightLines?: number[];
  showLineNumbers?: boolean;
  children: string;
};
