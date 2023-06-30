import { type FC, useState } from 'react';

import type { CodeBlockProps } from './types';
import clsx from 'clsx';
import { Check, Copy } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';

import { IconButton } from '@/components/ui';

const CodeBlock: FC<CodeBlockProps> = ({
  fileName,
  language = 'tsx',
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
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-6">
      {fileName !== undefined ? (
        <div className="flex h-10 grow items-center justify-between border-b border-gray-6 bg-gray-2 pl-4 pr-2">
          <div className="text-sm text-gray-11">{fileName}</div>
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
          <pre className="py-5" style={style} {...rest}>
            <code className="text-xs font-normal leading-5">
              {tokens.map((line, i) => {
                const { className, ...restLineProps } = getLineProps({ line });

                return (
                  <div
                    key={i}
                    className={clsx(
                      className,
                      'px-5',
                      highlightLines.includes(i + 1)
                        ? 'bg-blue-5 shadow-[inset_2px_0] shadow-blue-9'
                        : '',
                    )}
                    {...restLineProps}
                  >
                    {showLineNumbers ? (
                      <div className="mr-4 inline-block w-6 text-gray-11">{i + 1}</div>
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
