import type { NextPage } from 'next';

import { NextSeo } from 'next-seo';

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

      <div className="text-gray-12">hi</div>
    </>
  );
};

export default HomePage;
