'use client';

import type { Metadata } from 'next';

import ErrorLayout from '@/components/layouts/error';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: '501',
  description: 'Internal server error.',
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------
export default function Error() {
  return <ErrorLayout statusCode={501} />;
}
