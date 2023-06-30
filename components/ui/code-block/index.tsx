import type { FC } from 'react';

import type { CodeBlockProps } from './types';
import clsx from 'clsx';
import { Copy } from 'lucide-react';
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
  // TODO: show clipboard button (+ implement when there's no filename)
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-6">
      {fileName !== undefined ? (
        <div className="flex h-10 grow items-center justify-between border-b border-gray-6 bg-gray-2 pl-4 pr-2">
          <div className="text-sm text-gray-11">{fileName}</div>
          <IconButton size="sm" variant="outline" type="button">
            <Copy />
          </IconButton>
        </div>
      ) : null}
      <Highlight theme={themes.vsDark} code={children} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="py-5" style={style} {...rest}>
            <code className="text-xs leading-5">
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
