import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import Web3Provider from './web3-provider';
import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';

import { Toaster } from '@/components/ui';

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

const inter = Inter({ subsets: ['latin'] });

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: {
    template: '%s | 5/9',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ background: 'var(--gray1)' }}>
      <body className={clsx(inter.className, 'relative min-h-screen w-full')}>
        <Web3Provider>{children}</Web3Provider>
      </body>
      <Toaster />
      <Analytics />
    </html>
  );
}
