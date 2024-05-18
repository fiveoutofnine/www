import { cva } from 'class-variance-authority';

// ---------------------------------------–-------------------------------------
// `CodeBlockAction` styles
// ---------------------------------------–-------------------------------------

export const codeBlockActionsVariants = cva(['flex', 'items-center', 'gap-2'], {
  variants: {
    inHeader: {
      true: ['flex', 'ml-2'],
      false: ['absolute', 'right-2', 'top-2'],
    },
    showOnHover: {
      true: [],
      false: [],
    },
  },
  compoundVariants: [
    {
      inHeader: false,
      showOnHover: true,
      className: ['hidden', 'animate-in', 'fade-in', 'group-hover:flex'],
    },
    { inHeader: false, showOnHover: false, className: ['flex'] },
  ],
});

// ---------------------------------------–-------------------------------------
// `CodeBlock` styles
// ---------------------------------------–-------------------------------------

export const codeBlockContainerVariants = cva(
  ['flex', 'flex-col', 'overflow-hidden', 'border', 'border-gray-6', 'hide-scrollbar'],
  {
    variants: {
      roundedTop: {
        true: ['rounded-xl'],
        false: ['rounded-b-xl', 'rounded-t-none'],
      },
      containerized: {
        true: [],
        false: ['rounded-none', 'border-x-0', '[&_[code-block-pre]]:rounded-none'],
      },
    },
  },
);

export const codeBlockHeaderFileNameContainerStyles = 'flex items-center space-x-2 text-gray-11';

export const codeBlockHeaderFileNameIconStyles = 'w-4 h-4';

export const codeBlockHeaderFileNameStyles = 'text-sm text-ellipsis overflow-hidden line-clamp-1';

export const codeBlockHeaderStyles =
  'flex min-h-10 sticky top-0 z-10 h-10 grow items-center justify-between border-b border-gray-6 bg-gray-2 pl-4 pr-2 rounded-top-xl';

export const codeBlockLineHighlightedStyles = 'bg-blue-4 shadow-[inset_2px_0] shadow-blue-9';

export const codeBlockLineNumberStyles = 'mr-4 inline-block w-4 text-end text-gray-11 select-none';

export const codeBlockLineVariants = cva(['px-4', 'min-w-fit', 'flex'], {
  variants: {
    breakLines: { true: ['break-all'], false: [] },
  },
});

export const codeBlockPreVariants = cva(
  ['group', 'py-4', 'px-0', 'overflow-x-scroll', 'my-0', 'bg-gray-3', 'hide-scrollbar'],
  {
    variants: {
      hasHeader: { true: ['rounded-b-xl', 'rounded-t-none'], false: ['rounded-xl'] },
      breakLines: { true: ['whitespace-pre-line'], false: ['overflow-x-scroll', 'hide-scrollbar'] },
    },
  },
);

export const codeBlockStyles = 'text-xs normal leading-5 flex flex-col min-w-fit';
