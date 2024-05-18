export const dialogContentStyles = [
  'fixed',
  'left-[50%]',
  'top-[100%]',
  'z-50',
  'grid',
  'p-4',
  'w-full',
  'translate-x-[-50%]',
  'translate-y-[-100%]',
  'max-h-[80vh]',
  'overflow-y-scroll',
  'border-t',
  'border-gray-6',
  'bg-gray-2',
  'rounded-t-lg',
  'duration-200',
  'focus:outline-none',
  'overflow-x-hidden',
  'sm:top-[50%]',
  'sm:max-w-lg',
  'sm:max-h-[50vh]',
  'sm:p-5',
  'sm:border-x',
  'sm:border-b',
  'sm:rounded-b-lg',
  'sm:translate-y-[-50%]',
  'data-[state=open]:animate-in',
  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0',
  'data-[state=open]:fade-in-0',
  'data-[state=closed]:slide-out-to-top-[48%]',
  'data-[state=open]:slide-in-from-top-[48%]',
  'data-[state=closed]:slide-out-to-left-1/2',
  'data-[state=open]:slide-in-from-left-1/2',
  'sm:data-[state=closed]:zoom-out-95',
  'sm:data-[state=open]:zoom-in-95',
];

export const dialogDescriptionStyles = [
  'text-sm',
  'text-gray-11',
  'leading-normal',
  'mb-4',
  'sm:mb-5',
];

export const dialogFooterStyles = [
  'flex',
  'border-t',
  'border-gray-6',
  'gap-2',
  '-mx-4',
  '-mb-4',
  'px-4',
  'py-2',
  'sm:px-2',
  'sm:-mx-5',
  'sm:-mb-5',
  'sm:justify-end',
];

export const dialogHeaderStyles = ['flex', 'flex-col', 'gap-1', 'text-center', 'sm:text-left'];

export const dialogOverlayStyles = [
  'bg-black/10',
  'fixed',
  'inset-0',
  'z-50',
  'backdrop-blur-sm',
  'data-[state=open]:animate-in',
  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0',
  'data-[state=open]:fade-in-0',
];

export const dialogTitleStyles = ['text-lg', 'font-medium', 'leading-6', 'text-gray-12'];
