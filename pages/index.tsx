import type { NextPage } from 'next';

import { NextSeo } from 'next-seo';

import { Button } from '@/components/ui';

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
      <Button>Button</Button>
    </>
  );
};

export default HomePage;
