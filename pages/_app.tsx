import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import type { FC } from 'react';

import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { DefaultSeo } from 'next-seo';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import '@/styles/globals.css';

import { Toaster } from '@/components/ui';

/* Config */
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const { chains, provider } = configureChains(
  [mainnet, goerli],
  [alchemyProvider({ apiKey: alchemyId }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'Flywheel',
  chains: [...chains],
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

/* Initialize Fonts */
const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin'],
});

/* Component */
const App: FC<AppProps> = ({ Component, pageProps }) => {
  const DESCRIPTION = 'personal website';

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
          site_name: 'fiveoutofnine',
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

      <WagmiConfig client={client}>
        <RainbowKitProvider modalSize="compact" chains={chains} theme={darkTheme()}>
          <main className={inter.variable}>
            <Component {...pageProps} />
            <Toaster />
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default App;
