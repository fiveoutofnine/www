import { Children, type FC, isValidElement, type ReactNode, useCallback, useMemo } from 'react';

import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import prettier from 'prettier';
import babel from 'prettier/parser-babel';
import { twMerge } from 'tailwind-merge';

import {
  Badge,
  Button,
  CodeBlock,
  HoverCard,
  IconButton,
  Select,
  Toaster,
  Tooltip,
} from '@/components/ui';
import type { CodeBlockProps } from '@/components/ui/code-block/types';

const COMPONENTS = [Badge, Button, CodeBlock, HoverCard, IconButton, Select, Toaster, Tooltip];

/* Props */
type DesignComponentsDisplayProps = JSX.IntrinsicElements['div'] &
  Pick<CodeBlockProps, 'highlightLines'> & {
    showSource?: boolean;
    sourceInitiallyDisplayed?: boolean;
  };

/* Component */
const DesignComponentsDisplay: FC<DesignComponentsDisplayProps> = ({
  className,
  highlightLines,
  showSource = true,
  sourceInitiallyDisplayed = false,
  children,
  ...rest
}) => {
  const getJsxString = useCallback((node: ReactNode): string => {
    if (!isValidElement(node)) return `${node}`.trimEnd();
    let children: ReactNode | undefined | null;

    // Attempt to figure out the component's name.
    let componentName = undefined;
    // If it's a string, just return it.
    if (typeof node.type === 'string') {
      componentName = node.type;
    } else {
      // Loop through the components in the design system to try and match. This
      // way, we also retain the full name, rather than the minified name weback
      // gives.
      for (let i = 0; i < COMPONENTS.length; ++i) {
        if (node.type === COMPONENTS[i]) {
          componentName = COMPONENTS[i].displayName;
          break;
        }
      }
      // If we still don't have a name try the following in order:
      //     1. Attempt to read `node.type.name`.
      //     2. Attempt to read `node.type.render.displayName`.
      //     3. Attempt to read `node.type.render.name`.
      // If we still don't find a name, return ``Unknown''.
      if (!componentName) {
        if (node.type.name) componentName = node.type.name;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        else if (node.type.render && typeof node.type.render === 'function') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const render = node.type.render;
          if (render.displayName) componentName = render.displayName;
          else if (render.name) componentName = render.name;
        }
      }
    }
    // Failed to determine name.
    componentName = componentName || 'Unknown';

    // Construct string of props.
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
    <div className="grid w-full grid-cols-1">
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
        <Accordion.Root
          type="single"
          defaultValue={sourceInitiallyDisplayed ? 'source-code' : undefined}
          collapsible
        >
          <Accordion.Item value="source-code">
            <Accordion.Trigger className="data-[state='open']:border-b-1 group z-10 flex h-10 w-full items-center space-x-2 border border-gray-6 bg-gray-3 px-4 text-sm text-gray-11 transition-colors hover:border-gray-7 hover:bg-gray-4 hover:text-gray-12 focus:outline-none focus-visible:rounded focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-blue-9 active:bg-gray-5 data-[state='closed']:rounded-b-xl data-[state='open']:border-b-0">
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state='open']:rotate-90" />
              <span>View source</span>
            </Accordion.Trigger>
            <Accordion.Content className="max-w-full">
              <CodeBlock language="tsx" highlightLines={highlightLines} roundedTop={false}>
                {code}
              </CodeBlock>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      ) : null}
    </div>
  );
};

export default DesignComponentsDisplay;
