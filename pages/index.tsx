import type { NextPage } from 'next';

import { NextSeo } from 'next-seo';

import BaseLayout from '@/components/layouts/base';

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

      <BaseLayout name="Home" pageSlug="/"></BaseLayout>
    </>
  );
};

export default HomePage;
