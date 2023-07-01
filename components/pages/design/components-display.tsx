import { Children, type FC, isValidElement, type ReactNode, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { CodeBlock } from '@/components/ui';

const DesignComponentsDisplay: FC<JSX.IntrinsicElements['div']> = ({
  className,
  children,
  ...rest
}) => {
  const getJsxString = useCallback(
    ({ node, depth = 0 }: { node: ReactNode; depth: number }): string => {
      const indents = '  '.repeat(depth + 1);
      if (!isValidElement(node)) return `${indents}${node}`.trimEnd();

      let children: ReactNode | undefined | null;
      const componentName = typeof node.type !== 'string' ? node.type.name : 'Unknown';
      const propArray = Object.entries(node.props).map((prop) => {
        if (prop[0] === 'children') {
          children = prop[1] as ReactNode;
          return;
        }
        if (typeof prop[1] === 'string') return `${prop[0]}="${prop[1]}"`;
        else if (isValidElement(prop[1]))
          return `${prop[0]}={${getJsxString({ node: prop[1], depth: depth + 1 }).trim()}}`;
        return `${prop[0]}={${prop[1]}}`;
      });
      const propString =
        propArray.length < 5
          ? propArray.join(' ').trim()
          : `\n${indents}  ${propArray.join(`\n${indents}  `)}`;

      const componentChildren = Children.toArray(children);
      const childrenJsxString = componentChildren
        .map((child) => getJsxString({ node: child, depth: depth + 1 }))
        .join('\n');

      return componentChildren.length > 0
        ? `${indents}<${componentName} ${propString}>\n${childrenJsxString}\n${indents}</${componentName}>`.trimEnd()
        : `${indents}<${componentName} ${propString}/>\n`.trimEnd();
    },
    [],
  );

  const code = useMemo(() => {
    const componentChildren = Children.toArray(children).filter((child) => isValidElement(child));

    return `<DesignComponentsDisplay${
      className ? ` className="${className}"` : ''
    }>\n${componentChildren
      .map((child) => getJsxString({ node: child, depth: 0 }))
      .join('\n')}\n</DesignComponentsDisplay>`;
  }, [children, className, getJsxString]);

  return (
    <div className="w-full flex-col">
      <div
        className={twMerge(
          clsx(
            'grid w-full items-center justify-evenly gap-4 rounded-t-xl border border-b-0 border-gray-6 bg-gray-2 py-8',
            className,
          ),
        )}
        {...rest}
      >
        {children}
      </div>
      <CodeBlock className="rounded-t-none" language="tsx">
        {code}
      </CodeBlock>
    </div>
  );
};

export default DesignComponentsDisplay;
