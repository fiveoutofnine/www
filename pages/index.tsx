import type { GetStaticProps, NextPage } from 'next';

import { NextSeo } from 'next-seo';

import type { MileageLog } from '@/lib/types/running';
import { fetchMileageLogs } from '@/lib/utils';

import BaseLayout from '@/components/layouts/base';
import ContainerLayout from '@/components/layouts/container';
import FeaturedWorks from '@/components/pages/home/featured-works';
import FiveoutofnineHeader from '@/components/pages/home/header';

/* Props */
type HomePageProps = {
  mileageLogs: MileageLog[];
};

/* Page */
const HomePage: NextPage<HomePageProps> = ({ mileageLogs }) => {
  return (
    <>
      <NextSeo
        openGraph={{
          type: 'website',
          locale: 'en_US',
        }}
        twitter={{
          handle: '@fiveoutofnine',
        }}
      />

      <BaseLayout name="Home" pageSlug="/">
        <ContainerLayout className="flex flex-col space-y-4">
          <FiveoutofnineHeader />
          <FeaturedWorks mileageLogs={mileageLogs} />
        </ContainerLayout>
      </BaseLayout>
    </>
  );
};

/* Get Static Props */
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await fetchMileageLogs({ type: 'monthly', limit: 12 });

  const props: HomePageProps = { mileageLogs: data };

  return { props, revalidate: 3600 };
};

export default HomePage;
