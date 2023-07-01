export type CodeBlockProps = Omit<JSX.IntrinsicElements['pre'], 'children'> & {
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
