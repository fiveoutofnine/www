import type { GetStaticProps, NextPage } from 'next';

import { NextSeo } from 'next-seo';

import type { MileageLog } from '@/lib/types/running';
import { fetchMileageLogs, fetchRunningLogs } from '@/lib/utils';

import BaseLayout from '@/components/layouts/base';
import ContainerLayout from '@/components/layouts/container';
import FeaturedWorks from '@/components/pages/home/featured-works';
import FiveoutofnineHeader from '@/components/pages/home/header';

/* Props */
type HomePageProps = {
  mileageLogs: MileageLog[];
  runningLogs: MileageLog[];
};

/* Page */
const HomePage: NextPage<HomePageProps> = ({ mileageLogs, runningLogs }) => {
  return (
    <>
      <NextSeo
        openGraph={{
          type: 'website',
          locale: 'en_US',
          site_name: 'fiveoutofnine',
          images: [
            {
              // TODO: replace base URL with `fiveoutofnine.com` before merging
              // to `main`.
              url: 'https://www-git-v1-fiveoutofnine.vercel.app/static/og/home.png',
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
          <FiveoutofnineHeader />
          <FeaturedWorks mileageLogs={mileageLogs} runningLogs={runningLogs} />
        </ContainerLayout>
      </BaseLayout>
    </>
  );
};

/* Get Static Props */
export const getStaticProps: GetStaticProps = async () => {
  const { data: mileageLogs } = await fetchMileageLogs({ type: 'monthly', limit: 12 });
  const { data: runningLogs } = await fetchRunningLogs();

  const props: HomePageProps = { mileageLogs, runningLogs };

  return { props, revalidate: 3600 };
};

export default HomePage;
