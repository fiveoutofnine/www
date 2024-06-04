export const tableBodyStyles = ['group', 'table--body', 'text-sm', 'text-gray-12'];

export const tableCaptionStyles = ['text-gray-11', 'mt-2', 'text-xs'];

export const tableCellStyles = [
  'px-3',
  'align-middle',
  'first:pl-4',
  'last:pr-4',
  'group-[.table--header]:py-0',
  'group-[.table--body]:py-3',
  'group-[.table--footer]:py-0',
];

export const tableFooterStyles = [
  'group',
  'table--footer',
  'border-t',
  'border-gray-6',
  'font-medium',
  'text-gray-12',
  'text-sm',
];

export const tableHeadStyles = [
  'group',
  'table--head',
  'h-7',
  'py-0',
  'px-3',
  'border-b',
  'first:pl-4',
  'last:pr-4',
  'border-gray-6',
  'text-left',
  'align-middle',
  'text-xs',
  'font-medium',
  'text-gray-11',
];

export const tableHeaderStyles = ['group', 'table--header'];

export const tableRootStyles = [
  'group',
  'table--root',
  'w-full',
  'caption-bottom',
  'border-y',
  'border-gray-6',
];

export const tableRowStyles = [
  'border-b',
  'border-gray-6',
  'last:border-b-0',
  'group-[.table--header]:bg-gray-3',
  'group-[.table--body]:data-[subcomponent=false]:odd:bg-gray-1',
  'group-[.table--body]:data-[subcomponent=false]:even:bg-gray-3',
  'group-[.table--body]:data-[subcomponent=true]:bg-gray-2',
  'group-[.table--body]:data-[state=selected]:bg-gray-5',
  'group-[.table--footer]:bg-gray-3',
  'group-[.table--footer]:h-8',
  'transition-colors',
];
