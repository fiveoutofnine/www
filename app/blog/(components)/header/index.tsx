import { Suspense } from 'react';

import BlogHeaderCopyLinkButton from './copy-link-button';
import BlogViewCount from './view-count';

import redis from '@/lib/services/redis';

import { H1 } from '@/components/mdx';
import RelativeDate from '@/components/templates/relative-date';

import { POSTS } from '@/app/blog/posts';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type BlogHeaderProps = {
  slug: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default async function BlogHeader({ slug }: BlogHeaderProps) {
  const post = POSTS.find((post) => post.slug === slug);

  // Return `null` if the post is not found.
  if (!post) return null;

  // Fetch views.
  const views = await redis.hget('blog:views', encodeURIComponent(slug));

  return (
    <header>
      <H1>{post.title}</H1>
      <div className="-mt-3 flex h-5 items-center text-base leading-5 text-gray-11 md:-mt-2.5">
        <RelativeDate date={post.date} />
        <div className="mx-1" role="separator">
          ·
        </div>
        <Suspense
          fallback={
            <span className="animate-in fade-in">
              <span className="tabular-nums">0</span> views
            </span>
          }
        >
          <BlogViewCount id={encodeURIComponent(slug)} fallbackData={Number(views) || 0} />
        </Suspense>
        <div className="ml-auto" role="separator" />
        <BlogHeaderCopyLinkButton slug={slug} />
      </div>
    </header>
  );
}
