import Link from 'next/link';

import { POSTS } from './posts';

const BlogPostsList: React.FC = () => {
  // Iterate through posts and store the last post in each year.
  const firstPostInYear: Map<number, string> = new Map();
  [...POSTS]
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .forEach(({ date, slug }) => firstPostInYear.set(date.getUTCFullYear(), slug));

  return (
    <ul className="not-prose w-full -space-y-px">
      {[...POSTS]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map(({ slug, title, date }) => {
          const year = date.getUTCFullYear();

          return (
            <li key={slug} className="not-prose">
              <Link
                className="flex w-full gap-4 border-y border-gray-6 px-2 py-3 transition-colors hover:bg-gray-4 active:bg-gray-5"
                href={`/blog/${slug}`}
              >
                {firstPostInYear.get(year) === slug ? (
                  <span className="w-10 min-w-10 pt-1 text-sm font-medium tabular-nums leading-4 text-gray-11 sm:w-12 sm:min-w-12">
                    {year}
                  </span>
                ) : null}
                <span className="grow text-base font-normal leading-normal text-gray-12 first:pl-14 sm:first:pl-16">
                  {title}
                </span>
                <time
                  className="w-14 min-w-14 pt-1 text-right text-sm leading-4 text-gray-11"
                  dateTime={date.toISOString()}
                  title={date.toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZoneName: 'short',
                  })}
                >
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </time>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default BlogPostsList;
