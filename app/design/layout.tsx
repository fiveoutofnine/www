import type { Metadata } from 'next';

import DesignNavBar from './(components)/nav-bar';
import DesignPageNav from './(components)/page-nav';

import ContainerLayout from '@/components/layouts/container';
import { Article } from '@/components/templates/mdx';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

const title = '5/9 Design';
const description = 'open-source and accessible design system';
const imageCategory = 'Foundations';
const imageName = 'Introduction';
const imageDescription =
  'An open-source design system aiming to be accessible, functional, and provide a consistent feel across a site.';
const images = [
  {
    url: `https://fiveoutofnine.com/api/og/design?title=${imageCategory}&subtitle=${imageName}&description=${imageDescription}`,
    alt: `Open Graph image for 5/9 Design | ${imageName}`,
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
    url: 'https://fiveoutofnine.com/design',
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
    // Note: `pb-6` overrides `pb-4` on small devices. `<DesignNavBar />` has a
    // `mb-6` when displayed on small screens, so the ``margin'' above/below the
    // article content is symmetrical. We do this instead of `py-6` to correctly
    // position `<DesignNavBar />`, as well as the article content on small
    // screens. This positioning issue is not present on larger screens so we
    // have a breakpoint to reset it. For similar reasons, the `x` padding is
    // set to 0 on small devices is set to 0.
    <ContainerLayout className="relative flex max-w-[90rem] flex-col space-x-0 px-0 pb-6 pt-0 md:flex-row md:space-x-16">
      <DesignNavBar />
      <Article>
        {children}
        <hr className="mb-6 mt-6 w-full rounded-full border-gray-6 md:mt-12" role="separator" />
        <DesignPageNav />
      </Article>
    </ContainerLayout>
  );
}
