import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const MathDisplay: React.FC<JSX.IntrinsicElements['div']> = ({ className, ...rest }) => {
  return (
    <div
      className={twMerge(
        clsx(
          '-mx-4 flex max-w-[100vw] items-center overflow-x-scroll border-y border-gray-6 bg-gray-2 p-4 sm:mx-0 sm:max-w-full sm:rounded-lg sm:border-x [&>p]:my-0 [&>span]:mx-auto',
          className,
        ),
      )}
      {...rest}
    />
  );
};

export default MathDisplay;
