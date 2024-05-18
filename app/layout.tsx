import type { Metadata, Viewport } from 'next';
import { Fira_Code, Inter } from 'next/font/google';

import './globals.css';
import Web3Provider from './web3-provider';
import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';

import NavBar from '@/components/common/nav-bar';
import { Toaster } from '@/components/ui';

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' });

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

const title = '5/9';
const description = 'personal website';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['fiveoutofnine', '5/9', 'personal', 'website', 'blog'],
  creator: 'fiveoutofnine',
  openGraph: {
    title,
    description,
    url: 'https://fiveoutofnine.com',
    siteName: 'fiveoutofnine',
    images: [
      {
        url: 'https://fiveoutofnine.com/static/og/home.png',
        alt: '5/9 Open Graph image',
        height: 630,
        width: 1200,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@fiveoutofnine',
    creatorId: '1269561030272643076',
  },
  alternates: {
    canonical: 'https://fiveoutofnine.com',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={clsx(inter.variable, firaCode.variable, 'dark')}
      style={{ background: '#000' }}
    >
      <body className="relative flex min-h-screen w-full flex-col">
        <Web3Provider>
          <NavBar />
          <main className="relative flex grow flex-col">{children}</main>
        </Web3Provider>
      </body>
      <Toaster />
      <Analytics />
    </html>
  );
}
