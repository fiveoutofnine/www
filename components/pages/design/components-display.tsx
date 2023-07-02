import { Children, type FC, isValidElement, type ReactNode, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import prettier from 'prettier';
import babel from 'prettier/parser-babel';
import { twMerge } from 'tailwind-merge';

import { CodeBlock } from '@/components/ui';

/* Props */
type DesignComponentsDisplayProps = JSX.IntrinsicElements['div'] & {
  showSource?: boolean;
};

/* Component */
const DesignComponentsDisplay: FC<DesignComponentsDisplayProps> = ({
  className,
  showSource = true,
  children,
  ...rest
}) => {
  const getJsxString = useCallback((node: ReactNode): string => {
    if (!isValidElement(node)) return `${node}`.trimEnd();
    let children: ReactNode | undefined | null;

    const componentName =
      typeof node.type !== 'string' && node.type.name ? node.type.name : 'Unknown';
    const propString = Object.entries(node.props)
      .map((prop) => {
        if (prop[0] === 'children') {
          children = prop[1] as ReactNode;
          return;
        }
        if (typeof prop[1] === 'string') return `${prop[0]}="${prop[1]}"`;
        else if (isValidElement(prop[1])) return `${prop[0]}={${getJsxString(prop[1])}}`;
        return `${prop[0]}={${prop[1]}}`;
      })
      .join(' ')
      .trim();

    const componentChildren = Children.toArray(children);
    const childrenJsxString = componentChildren.map((child) => getJsxString(child)).join();

    return componentChildren.length > 0
      ? `<${componentName} ${propString}>${childrenJsxString}</${componentName}>`
      : `<${componentName} ${propString}/>`;
  }, []);

  const code = useMemo(() => {
    if (!showSource) return '';

    try {
      const componentChildren = Children.toArray(children).filter((child) => isValidElement(child));

      return prettier
        .format(
          `<DesignComponentsDisplay${
            className ? ` className="${className}"` : ''
          }>\n${componentChildren
            .map((child) => getJsxString(child))
            .join('\n')}</DesignComponentsDisplay>`,
          {
            bracketSpacing: true,
            semi: true,
            trailingComma: 'all',
            printWidth: 100,
            tabWidth: 2,
            singleQuote: true,
            parser: 'babel',
            plugins: [babel],
          },
        )
        .trim();
    } catch (e) {
      return '';
    }
  }, [children, className, getJsxString, showSource]);

  return (
    <div className="grid w-full">
      <div
        className={twMerge(
          clsx(
            'grid w-full items-center justify-evenly gap-4 border border-gray-6 bg-gray-2 py-8',
            code.length > 0 ? 'rounded-t-xl border-b-0' : 'rounded-xl',
            className,
          ),
        )}
        {...rest}
      >
        {children}
      </div>
      {code.length > 0 ? (
        <CodeBlock language="tsx" roundedTop={false}>
          {code}
        </CodeBlock>
      ) : null}
    </div>
  );
};

export default DesignComponentsDisplay;
