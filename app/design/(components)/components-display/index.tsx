import { Children, isValidElement } from 'react';

import DesignComponentsDisplayAccordion from './accordion';
import clsx from 'clsx';
import { Circle } from 'lucide-react';
import prettier from 'prettier';
import { twMerge } from 'tailwind-merge';

import FiveoutofnineAvatar from '@/components/common/fiveoutofnine-avatar';
import { ToastButton } from '@/components/templates/mdx';
import {
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  CodeBlock,
  HoverCard,
  IconButton,
  Input,
  Select,
  Switch,
  Tooltip,
} from '@/components/ui';
import type { CodeBlockProps } from '@/components/ui/code-block/types';

const COMPONENT_NAMES = [
  { component: Badge, displayName: 'Badge' },
  { component: Button, displayName: 'Button' },
  { component: ButtonGroup, displayName: 'ButtonGroup' },
  { component: Checkbox, displayName: 'Checkbox' },
  { component: CodeBlock, displayName: 'CodeBlock' },
  { component: HoverCard, displayName: 'HoverCard' },
  { component: IconButton, displayName: 'IconButton' },
  { component: Input, displayName: 'Input' },
  { component: Select, displayName: 'Select' },
  { component: Switch, displayName: 'Switch' },
  { component: ToastButton, displayName: 'ToastButton' },
  { component: Tooltip, displayName: 'Tooltip' },
  // Other
  { component: Circle, displayName: 'Circle' },
  { component: FiveoutofnineAvatar, displayName: 'FiveoutofnineAvatar' },
];

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type DesignComponentsDisplayProps = JSX.IntrinsicElements['div'] &
  Pick<CodeBlockProps, 'highlightLines'> & {
    showSource?: boolean;
    source?: string;
    sourceInitiallyDisplayed?: boolean;
  };

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DesignComponentsDisplay: React.FC<DesignComponentsDisplayProps> = async ({
  className,
  highlightLines,
  showSource = true,
  sourceInitiallyDisplayed = false,
  source,
  children,
  ...rest
}) => {
  const getJsxString = (node: React.ReactNode): string => {
    if (!isValidElement(node)) {
      if (!node) return 'undefined';

      const nodeString = `${node}`;
      if (nodeString.indexOf('\n') > -1) return `\n{\n\`${node}\`\n}\n`;
      return nodeString;
    }
    let children: React.ReactNode | undefined | null;

    // Attempt to figure out the component's name.
    let componentName = undefined;
    // If it's a string, just return it.
    if (typeof node.type === 'string') {
      componentName = node.type;
    } else {
      // Loop through the components in the design system to try and match. This
      // way, we also retain the full name, rather than the minified name
      // webpack gives.
      for (let i = 0; i < COMPONENT_NAMES.length; ++i) {
        if (node.type === COMPONENT_NAMES[i].component) {
          componentName = COMPONENT_NAMES[i].displayName;
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
          children = prop[1] as React.ReactNode;
          return;
        }
        if (typeof prop[1] === 'string') return `${prop[0]}="${prop[1]}"`;
        else if (isValidElement(prop[1])) return `${prop[0]}={${getJsxString(prop[1])}}`;
        else if (typeof prop[1] === 'object') return `${prop[0]}={${JSON.stringify(prop[1])}}`;
        return `${prop[0]}={${prop[1]}}`;
      })
      .join(' ')
      .trim();

    const componentChildren = Children.toArray(children);
    const childrenJsxString = componentChildren.map((child) => getJsxString(child)).join('');

    return componentChildren.length > 0
      ? `<${componentName} ${propString}>${childrenJsxString}</${componentName}>`
      : `<${componentName} ${propString}/>`;
  };

  const code = await (async () => {
    if (!showSource) return '';
    else if (source) {
      // If `source` is provided, skip trying to determine the source from
      // `children`.
      try {
        return await prettier.format(source, {
          bracketSpacing: true,
          semi: true,
          trailingComma: 'all',
          printWidth: 100,
          tabWidth: 2,
          singleQuote: true,
          parser: 'babel',
        });
      } catch (e) {
        return source;
      }
    }

    try {
      const componentChildren = Children.toArray(children).filter((child) => isValidElement(child));

      return (
        await prettier.format(
          `<DesignComponentsDisplay${className ? ` className="${className}"` : ''}>\n${componentChildren
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
          },
        )
      )
        .replace('</DesignComponentsDisplay>;', '</DesignComponentsDisplay>')
        .trim();
    } catch (e) {
      return '';
    }
  })();

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
        <DesignComponentsDisplayAccordion
          code={code}
          highlightLines={highlightLines}
          sourceInitiallyDisplayed={sourceInitiallyDisplayed}
        />
      ) : null}
    </div>
  );
};

export default DesignComponentsDisplay;
