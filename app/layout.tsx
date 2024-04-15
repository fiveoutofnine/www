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

export const metadata: Metadata = {
  title: {
    template: '5/9 | %s',
    default: '5/9',
  },
  description: 'personal website',
  alternates: {
    canonical: 'https://fiveoutofnine.com',
  },
  keywords: [],
  twitter: {
    card: 'summary_large_image',
    creator: '@fiveoutofnine',
    creatorId: '1',
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
      style={{ background: 'var(--gray1)' }}
    >
      <body className="relative flex min-h-screen w-full flex-col">
        <Web3Provider>
          <NavBar />
          <main className="relative flex grow flex-col">{children}</main>
          <Toaster />
        </Web3Provider>
      </body>
      <Analytics />
    </html>
  );
}
