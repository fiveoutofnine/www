export const drawerContentContainerStyles = [
  'overflow-y-scroll',
  'overflow-x-scroll',
  'px-4',
  'pb-4',
  '-pt-1.5', // `pt-4` - drawer handle container height = 16px - 22px = `-pt-1.5`
  'hide-scrollbar',
];

export const drawerContentHandleContainerStyles = [
  'pointer-events-none',
  'sticky',
  'top-0',
  'flex',
  'min-h-[1.375rem]', // Handle height + `py-2` = 6px + 16px = 22px = 1.375rem
  'w-full',
  'items-center',
  'justify-items-center',
  'rounded-t-lg',
  'bg-gray-2',
];

export const drawerContentHandleStyles = [
  'bg-gray-5',
  'mx-auto',
  'sticky',
  'top-2',
  'h-1.5',
  'w-8',
  'rounded-full',
];

export const drawerContentStyles = [
  'bg-gray-2',
  'fixed',
  'mx-auto',
  'inset-x-0',
  'bottom-0',
  'z-50',
  'flex',
  'h-auto',
  'flex-col',
  'rounded-t-lg',
  'border-t',
  'border-gray-6',
  'max-h-[80vh]',
  'focus:outline-none',
];

export const drawerDescriptionStyles = ['text-sm', 'text-gray-11', 'leading-normal', 'mb-4'];

export const drawerFooterStyles = [
  'z-30',
  'bg-gray-2',
  'flex',
  'border-t',
  'border-gray-6',
  'px-4',
  'py-2',
  '-mx-4',
  '-mb-4',
  'gap-2',
  'sticky',
  '-bottom-4',
  'sm:justify-end',
];

export const drawerHeaderStyles = ['flex', 'flex-col', 'gap-1', 'text-center', 'sm:text-left'];

export const drawerOverlayStyles = ['bg-black/75', 'fixed', 'inset-0', 'z-50'];

export const drawerTitleStyles = ['text-lg', 'font-medium', 'leading-6', 'text-gray-12'];
