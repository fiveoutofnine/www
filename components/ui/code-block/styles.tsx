import { cva } from 'class-variance-authority';

export const codeBlockContainerStyles =
  'flex flex-col overflow-hidden rounded-xl border border-gray-6';

export const codeBlockHeaderFileNameContainerStyles = 'flex items-center space-x-2 text-gray-11';

export const codeBlockHeaderFileNameIconStyles = 'w-4 h-4';

export const codeBlockHeaderFileNameStyles = 'text-sm';

export const codeBlockHeaderStyles =
  'flex h-10 grow items-center justify-between border-b border-gray-6 bg-gray-2 pl-4 pr-2 rounded-top-xl';

export const codeBlockLineHighlightedStyles = 'bg-blue-4 shadow-[inset_2px_0] shadow-blue-9';

export const codeBlockLineNumberStyles = 'mr-4 inline-block w-4 text-end text-gray-11';

export const codeBlockLineStyles = 'px-4 min-w-fit';

export const codeBlockPreVariants = cva(['group', 'py-4', 'overflow-x-scroll'], {
  variants: {
    hasFileName: { true: ['rounded-b-xl'], false: ['rounded-xl'] },
  },
});

export const codeBlockStyles = 'text-xs normal leading-5 flex flex-col min-w-fit';
