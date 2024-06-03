import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Article: React.FC<JSX.IntrinsicElements['article']> = ({ className, ...rest }) => {
  return (
    <article
      className={twMerge(
        clsx(
          'prose prose-gray max-w-none grow px-4 dark:prose-invert md:px-0',
          'prose-h1:mb-4',
          'prose-h2:mb-2 prose-h2:mt-6 prose-h2:md:mb-4 prose-h2:md:mt-12',
          'prose-h3:mb-2 prose-h3:mt-5 prose-h3:md:mb-4 prose-h3:md:mt-6',
          'prose-blockquote:border-gray-6',
          'prose-li:marker:text-gray-11',
          className,
        ),
      )}
      {...rest}
    />
  );
};

export default Article;
