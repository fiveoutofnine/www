'use client';

import CodeBlockActions from './actions';
import CodeBlockLanguageLogo from './language-logo';
import {
  codeBlockContainerVariants,
  codeBlockHeaderFileNameContainerStyles,
  codeBlockHeaderFileNameIconStyles,
  codeBlockHeaderFileNameStyles,
  codeBlockHeaderStyles,
  codeBlockLineHighlightedStyles,
  codeBlockLineNumberStyles,
  codeBlockLineVariants,
  codeBlockPreVariants,
  codeBlockStyles,
} from './styles';
import { theme } from './theme';
import type { CodeBlockProps } from './types';
import clsx from 'clsx';
import { File, FileDiff, TerminalSquare } from 'lucide-react';
import { Highlight } from 'prism-react-renderer';
import Prism from 'prismjs';
import { twMerge } from 'tailwind-merge';

// Add support for additional languagaes.
(typeof global === 'undefined' ? window : global).Prism = Prism;
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-tsx');
require('prismjs/components/prism-solidity');
require('prismjs/components/prism-python');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-diff');

const CodeBlock: React.FC<CodeBlockProps> = ({
  className,
  fileName,
  language = 'none',
  logo,
  switcher,
  highlightLines = [],
  breakLines = false,
  showLineNumbers = true,
  roundedTop = true,
  containerized = true,
  children,
  ...rest
}) => {
  const hasHeader = fileName !== undefined;

  const Icon = logo
    ? logo
    : language === 'javascript' || language === 'js'
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
                : language === 'bash' || language === 'sh'
                  ? TerminalSquare
                  : language === 'diff'
                    ? FileDiff
                    : File;

  return (
    <div
      className={twMerge(
        clsx(codeBlockContainerVariants({ roundedTop, containerized }), className),
      )}
      code-block-container=""
      tabIndex={-1}
    >
      {hasHeader ? (
        <div className={codeBlockHeaderStyles} code-block-header="">
          <div className={codeBlockHeaderFileNameContainerStyles}>
            <Icon className={codeBlockHeaderFileNameIconStyles} />
            <div className={codeBlockHeaderFileNameStyles}>{fileName}</div>
          </div>
          <CodeBlockActions code={children} switcher={switcher} inHeader />
        </div>
      ) : null}
      <Highlight prism={Prism} theme={theme} code={children} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <div className="relative">
            <pre
              className={codeBlockPreVariants({ hasHeader: hasHeader || !roundedTop, breakLines })}
              {...rest}
              code-block-pre=""
            >
              <code className={clsx(codeBlockStyles)}>
                {tokens.map((line, i) => {
                  const { className, ...restLineProps } = getLineProps({ line });

                  return (
                    <div
                      key={i}
                      className={clsx(
                        codeBlockLineVariants({ breakLines }),
                        highlightLines.includes(i + 1) ? codeBlockLineHighlightedStyles : '',
                        className,
                      )}
                      {...restLineProps}
                      code-block-line=""
                    >
                      {showLineNumbers ? (
                        <div className={codeBlockLineNumberStyles} code-block-line-number="">
                          {i + 1}
                        </div>
                      ) : null}
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} code-block-token="" />
                      ))}
                    </div>
                  );
                })}
                {!hasHeader ? <CodeBlockActions code={children} switcher={switcher} /> : null}
              </code>
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
