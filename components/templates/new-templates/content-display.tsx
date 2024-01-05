import React, { ReactNode } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Props */
interface Props {
  children?: ReactNode;
  className?: string;
  symbol: ReactNode;
  name: string;
  description: string;
  tags?: ReactNode[];
  button?: ReactNode;
}

const ContentDisplay = ({
  children,
  className,
  symbol,
  name,
  description,
  tags,
  button,
}: Props) => {
  return (
    <div
      className={twMerge(
        clsx('border-gray-6 bg-gray-2 flex w-64 flex-col overflow-hidden rounded-xl border'),
        className,
      )}
    >
      {/** Header */}
      <div className="border-gray-7 flex h-[4.5rem] items-center space-x-2.5 border-b px-4">
        {/* Symbol */}
        <div className="border-gray-6 bg-gray-3 text-gray-11 flex h-10 w-10 items-center justify-center rounded border">
          <div className="flex h-6 w-6 items-center justify-center">{symbol}</div>
        </div>
        {/* Name + description */}
        <div>
          <div className="text-gray-12 line-clamp-1 text-ellipsis font-medium">{name}</div>
          <div className="text-gray-11 line-clamp-1 text-ellipsis text-sm">{description}</div>
        </div>
      </div>
      {/** Body */}
      <div className="w-full grow">{children}</div>
      {/* Footer */}
      {tags || button ? (
        <div className="border-gray-6 flex h-10 items-center justify-between border-t p-2">
          {/* Tags */}
          <div className="flex items-center space-x-1">{tags ? tags.map((tag) => tag) : null}</div>

          {/* Button */}
          {button}
        </div>
      ) : null}
    </div>
  );
};

export default ContentDisplay;
