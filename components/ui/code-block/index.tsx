import { type FC, useState } from 'react';

import {
  codeBlockContainerStyles,
  codeBlockHeaderFileNameContainerStyles,
  codeBlockHeaderFileNameIconStyles,
  codeBlockHeaderFileNameStyles,
  codeBlockHeaderStyles,
  codeBlockLineHighlightedStyles,
  codeBlockLineNumberStyles,
  codeBlockLineStyles,
  codeBlockPreStyles,
  codeBlockStyles,
} from './styles';
import type { CodeBlockProps } from './types';
import clsx from 'clsx';
import { Check, Copy, File } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';
import { twMerge } from 'tailwind-merge';

import { IconButton } from '@/components/ui';

const CodeBlock: FC<CodeBlockProps> = ({
  className,
  fileName,
  language = 'none',
  highlightLines = [],
  showLineNumbers = true,
  children,
  ...rest
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    if (!copied) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    navigator.clipboard.writeText(children);
  };

  return (
    <div className={twMerge(clsx(codeBlockContainerStyles, className))}>
      {fileName !== undefined ? (
        <div className={codeBlockHeaderStyles}>
          <div className={codeBlockHeaderFileNameContainerStyles}>
            <File className={codeBlockHeaderFileNameIconStyles} />
            <div className={codeBlockHeaderFileNameStyles}>{fileName}</div>
          </div>
          <IconButton
            size="sm"
            variant="outline"
            title="Copy to clipboard"
            onClick={copyToClipboard}
            type="button"
            aria-label="Copy to clipboard"
          >
            {copied ? <Check /> : <Copy />}
          </IconButton>
        </div>
      ) : null}
      <Highlight theme={themes.vsDark} code={children} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className={codeBlockPreStyles} style={style} {...rest}>
            <code className={codeBlockStyles}>
              {tokens.map((line, i) => {
                const { className, ...restLineProps } = getLineProps({ line });

                return (
                  <div
                    key={i}
                    className={clsx(
                      className,
                      codeBlockLineStyles,
                      highlightLines.includes(i + 1) ? codeBlockLineHighlightedStyles : '',
                    )}
                    {...restLineProps}
                  >
                    {showLineNumbers ? (
                      <div className={codeBlockLineNumberStyles}>{i + 1}</div>
                    ) : null}
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
};

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
