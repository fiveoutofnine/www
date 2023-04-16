import type { NextPage } from 'next';

import { NextSeo } from 'next-seo';

import BaseLayout from '@/components/layouts/base';
import ContainerLayout from '@/components/layouts/container';
import FiveoutofnineProfileHeader from '@/components/other/fiveoutofnine-profile-header';

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
          <FiveoutofnineProfileHeader />
        </ContainerLayout>
      </BaseLayout>
    </>
  );
};

export default HomePage;
