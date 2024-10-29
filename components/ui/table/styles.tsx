export const tableBodyStyles = [
  'text-sm',
  'text-gray-12',
  '[&_td]:py-3',
  '[&_td]:px-3',
  '[&_td:first-child]:pl-4',
  '[&_td:last-child]:pr-4',
  '[&_tr:where(:nth-child(odd))]:bg-gray-1',
  '[&_tr:where(:nth-child(even))]:bg-gray-3',
];

export const tableCaptionStyles = ['text-gray-11', 'mt-2', 'text-xs'];

export const tableCellStyles = ['align-middle'];

export const tableFooterStyles = [
  'border-t',
  'border-gray-6',
  'font-medium',
  'text-gray-12',
  'text-sm',
  '[&_tr]:h-8',
  '[&_tr]:bg-gray-3',
  '[&_td]:py-0',
];

export const tableHeadStyles = [
  'h-7',
  'border-b',
  'border-gray-6',
  'text-left',
  'align-middle',
  'font-medium',
  'text-gray-11',
];

export const tableHeaderStyles = [
  'text-xs',
  '[&_th]:bg-gray-3',
  '[&_th]:py-0',
  '[&_th]:px-3',
  '[&_th:first-child]:pl-4',
  '[&_th:last-child]:pr-4',
];

export const tableRootStyles = ['w-full', 'caption-bottom', 'border-y', 'border-gray-6'];

export const tableRowStyles = [
  'border-b',
  'border-gray-6',
  'last:border-b-0',
  'data-[subcomponent=true]:bg-gray-2',
  'data-[state=selected]:bg-gray-5',
];
