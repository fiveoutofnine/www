import type { NextPage } from 'next';

import { NextSeo } from 'next-seo';

import BaseLayout from '@/components/layouts/base';
import ContainerLayout from '@/components/layouts/container';
import FeaturedWorks from '@/components/pages/home/featured-works';
import FiveoutofnineHeader from '@/components/pages/home/header';

const HomePage: NextPage = () => {
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
          <FeaturedWorks />
        </ContainerLayout>
      </BaseLayout>
    </>
  );
};

export default HomePage;
