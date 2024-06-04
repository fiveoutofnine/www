import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const MathDisplay: React.FC<JSX.IntrinsicElements['div']> = ({ className, ...rest }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex max-w-full items-center justify-center overflow-x-scroll rounded-lg border border-gray-6 bg-gray-2 p-4 [&>p]:my-0',
          className,
        ),
      )}
      {...rest}
    />
  );
};

export default MathDisplay;
