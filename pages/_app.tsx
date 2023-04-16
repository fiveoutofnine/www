import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import type { FC } from 'react';

import '@rainbow-me/rainbowkit/styles.css';
import { DefaultSeo } from 'next-seo';

import '@/styles/globals.css';

/* Initialize Fonts */
const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin'],
});

/* Component */
const App: FC<AppProps> = ({ Component, pageProps }) => {
  const DESCRIPTION = '5/9 personal website';

  return (
    <>
      <DefaultSeo
        titleTemplate="%s | 5/9"
        defaultTitle="5/9"
        description={DESCRIPTION}
        canonical="https://fiveoutofnine.com"
        themeColor="#161616"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          description: DESCRIPTION,
          url: 'https://fiveoutofnine.com',
          site_name: '5/9',
        }}
        twitter={{
          handle: '@fiveoutofnine',
          site: '@fiveoutofnine',
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          {
            rel: 'shortcut icon',
            href: '/images/favicon.ico',
          },
          {
            rel: 'apple-touch-icon',
            href: '/images/apple-touch-icon.png',
            sizes: '180x180',
          },
          {
            rel: 'manifest',
            href: '/manifest.json',
          },
        ]}
      />

      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

      <main className={inter.variable}>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
