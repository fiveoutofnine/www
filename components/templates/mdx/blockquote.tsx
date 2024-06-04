import clsx from 'clsx';
import { Quote } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { A } from '@/components/templates/mdx';

const Blockquote: React.FC<
  JSX.IntrinsicElements['blockquote'] & { source?: { url?: string; label?: string } }
> = ({ className, source, children, ...rest }) => {
  return (
    <blockquote
      className={twMerge(
        clsx('relative my-4 overflow-hidden rounded border border-gray-6 bg-gray-3 p-0', className),
      )}
      {...rest}
    >
      <div
        className="absolute left-0 top-0 h-full w-1 bg-gray-9"
        mdx-blockquote-indent=""
        aria-hidden={true}
      />
      <div
        className="w-full p-3 pl-4 text-base leading-normal [&>*]:my-0"
        mdx-blockquote-content=""
      >
        {children}
      </div>
      {source ? (
        <div
          className="flex w-full gap-1.5 border-t border-gray-6 py-1.5 pl-4 pr-3 text-xs font-normal not-italic leading-4 text-gray-11"
          mdx-blockquote-source-content=""
        >
          <span className="pt-0.5 text-gray-11">
            <Quote className="size-3" />
          </span>
          {source.url ? <A href={source.url}>{source.label || 'Source'}</A> : source.label}
        </div>
      ) : null}
    </blockquote>
  );
};

export default Blockquote;
