import type { Metadata } from 'next';

import { POSTS } from '@/app/blog/posts';

const getBlogPageMetadata = ({
  slug,
  description,
}: {
  slug: string;
  description?: string;
}): Metadata => {
  const title = POSTS.find((post) => post.slug === slug)?.title || '5/9 Blog Post';
  const images = [
    {
      url: `https://fiveoutofnine.com/api/og/blog?title=${title}&description=${description}`,
      alt: `Open Graph image for ${title}`,
      width: 1200,
      height: 630,
    },
  ];

  // Construct Frame metadata
  const frameEmbed = {
    version: 'next',
    imageUrl: images[0].url,
    button: {
      title: 'Read Post',
      action: {
        type: 'launch_frame',
        name: '5/9 Blog',
        url: `https://fiveoutofnine.com/blog/${slug}`,
        splashImageUrl: 'https://fiveoutofnine.com/static/og/blog.png',
        splashBackgroundColor: '#000000',
      },
    },
  };

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
      images,
      url: `https://fiveoutofnine.com/blog/${slug}`,
      siteName: 'fiveoutofnine',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title,
      description,
      images,
      card: 'summary_large_image',
      creator: '@fiveoutofnine',
      creatorId: '1269561030272643076',
    },
    other: {
      'fc:frame': JSON.stringify(frameEmbed),
    },
  };
};

export default getBlogPageMetadata;
