import type { GetStaticProps, NextPage } from 'next';

import { NextSeo } from 'next-seo';

import type { MileageLog } from '@/lib/types/running';
import { fetchMileageLogs, fetchRunningLogs } from '@/lib/utils';

import BaseLayout from '@/components/layouts/base';
import ContainerLayout from '@/components/layouts/container';
import FeaturedWorks from '@/components/pages/home/featured-works';
import KentMiguelHeader from '@/components/pages/home/header';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type HomePageProps = {
  mileageLogs: MileageLog[];
  runningLogs: MileageLog[];
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

const HomePage: NextPage<HomePageProps> = ({ mileageLogs, runningLogs }) => {
  return (
    <>
      <NextSeo
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://fiveoutofnine.com',
          site_name: 'fiveoutofnine',
          images: [
            {
              url: 'https://fiveoutofnine.com/static/og/home.png',
              width: 1200,
              height: 630,
              alt: '5/9 open-graph image',
            },
          ],
        }}
        twitter={{
          handle: '@fiveoutofnine',
        }}
      />

      <BaseLayout subtitle="Home" pageSlug="/">
        <ContainerLayout className="flex flex-col space-y-4">
          <KentMiguelHeader />
          <FeaturedWorks />
        </ContainerLayout>
      </BaseLayout>
    </>
  );
};

// -----------------------------------------------------------------------------
// Get static props
// -----------------------------------------------------------------------------

export const getStaticProps: GetStaticProps = async () => {
  const { data: mileageLogs } = await fetchMileageLogs({ type: 'monthly', limit: 12 });
  const { data: runningLogs } = await fetchRunningLogs();

  const props: HomePageProps = { mileageLogs, runningLogs };

  return { props, revalidate: 3600 };
};

export default HomePage;
