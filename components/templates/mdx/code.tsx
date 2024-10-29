import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Code: React.FC<JSX.IntrinsicElements['code']> = ({ className, ...rest }) => {
  return (
    <code
      className={twMerge(
        clsx(
          'rounded-md border border-gray-6 bg-gray-3 px-1 text-[0.875em] font-normal leading-[1.15] text-gray-12 before:content-none after:content-none group-focus-visible:ring-2 group-focus-visible:ring-blue-9 group-[.mdx--link]:text-inherit',
          className,
        ),
      )}
      {...rest}
    />
  );
};

export default Code;
