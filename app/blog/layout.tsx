import type { Metadata } from 'next';

import Frame from './(components)/frame';
import BlogNavBar from './(components)/nav-bar';
import 'katex/dist/katex.min.css';

import ContainerLayout from '@/components/layouts/container';
import { Article } from '@/components/templates/mdx';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

const title = '5/9 Blog';
const description = 'writing';
const images = [
  {
    url: 'https://fiveoutofnine.com/static/og/blog.png',
    alt: '5/9 Blog Open Graph image',
    width: 1200,
    height: 630,
  },
];

export const metadata: Metadata = {
  title: {
    default: title,
    template: `${title} | %s`,
  },
  description,
  openGraph: {
    title,
    description,
    images,
    url: 'https://fiveoutofnine.com/blog',
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
  alternates: {
    types: {
      'application/rss+xml': [
        {
          url: '/blog/feed.xml',
          title: '5/9 Blog RSS Feed',
        },
      ],
    },
  },
};

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ContainerLayout className="relative flex max-w-3xl flex-col px-0 pb-6 pt-0">
      <BlogNavBar />
      <Article fullBleedCodeBlocks>{children}</Article>
      <Frame />
    </ContainerLayout>
  );
}
