import type { Metadata } from 'next';

import { POSTS } from '@/app/blog/posts';

const getBlogPageMetadata = ({
  slug,
  description,
}: {
  slug: string;
  description?: string;
}): Metadata => {
  // const images = [];
  const title = POSTS.find((post) => post.slug === slug)?.title || '5/9 Blog';

  return {
    title: {
      // We need to use the `absolute` API here to override the title template
      // set in `@/app/blog/layout.tsx`.
      absolute: title,
    },
    description,
    openGraph: {
      title,
      description,
      // images,
      url: `https://fiveoutofnine.com/blog/${slug}`,
      siteName: 'fiveoutofnine',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title,
      description,
      // images,
      card: 'summary_large_image',
      creator: '@fiveoutofnine',
      creatorId: '1269561030272643076',
    },
  };
};

export default getBlogPageMetadata;
