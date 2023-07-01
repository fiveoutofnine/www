import { type FC, useEffect, useState } from 'react';

import CodeBlockLanguageLogo from './language-logo';
import {
  codeBlockContainerStyles,
  codeBlockHeaderFileNameContainerStyles,
  codeBlockHeaderFileNameIconStyles,
  codeBlockHeaderFileNameStyles,
  codeBlockHeaderStyles,
  codeBlockLineHighlightedStyles,
  codeBlockLineNumberStyles,
  codeBlockLineStyles,
  codeBlockPreVariants,
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const isMobile = isMounted ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) : false;

  const hasFileName = fileName !== undefined;

  const Icon =
    language === 'javascript' || language === 'js'
      ? CodeBlockLanguageLogo.JavaScript
      : language === 'typescript' || language === 'ts'
      ? CodeBlockLanguageLogo.TypeScript
      : language === 'jsx'
      ? CodeBlockLanguageLogo.React
      : language === 'tsx'
      ? CodeBlockLanguageLogo.React
      : language === 'solidity' || language === 'sol'
      ? CodeBlockLanguageLogo.Solidity
      : language === 'python' || language === 'py'
      ? CodeBlockLanguageLogo.Python
      : File;

  const copyToClipboard = () => {
    if (!copied) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    navigator.clipboard.writeText(children);
  };

  return (
    <div className={twMerge(clsx(codeBlockContainerStyles, className))}>
      {hasFileName ? (
        <div className={codeBlockHeaderStyles}>
          <div className={codeBlockHeaderFileNameContainerStyles}>
            <Icon className={codeBlockHeaderFileNameIconStyles} />
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
          <div className="relative">
            <pre className={codeBlockPreVariants({ hasFileName })} style={style} {...rest}>
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
                {!hasFileName ? (
                  <IconButton
                    size="sm"
                    className={clsx(
                      'absolute right-2 top-2',
                      isMobile ? 'flex' : 'hidden animate-in fade-in group-hover:flex',
                    )}
                    variant="outline"
                    title="Copy to clipboard"
                    onClick={copyToClipboard}
                    type="button"
                    aria-label="Copy to clipboard"
                  >
                    {copied ? <Check /> : <Copy />}
                  </IconButton>
                ) : null}
              </code>
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  );
};

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
