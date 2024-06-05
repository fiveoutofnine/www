import type { Metadata } from 'next';

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
};

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // Note: `pb-6` overrides `pb-4` on small devices. `<BlogNavBar />` has a
    // `mb-6` when displayed on small screens, so the ``margin'' above/below the
    // article content is symmetrical. We do this instead of `py-6` to correctly
    // position `<BlogNavBar />`, as well as the article content on small
    // screens. This positioning issue is not present on larger screens so we
    // have a breakpoint to reset it. For similar reasons, the `x` padding is
    // set to 0 on small devices is set to 0.
    <ContainerLayout className="relative flex max-w-3xl flex-col px-0 pb-6 pt-0">
      <BlogNavBar />
      <Article fullBleedCodeBlocks>{children}</Article>
    </ContainerLayout>
  );
}
