import { type NextRequest, NextResponse } from 'next/server';

import { getRandomImgUrl } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const exclude = Number(url.searchParams.get('exclude'));

  const data = getRandomImgUrl(Number.isNaN(exclude) ? undefined : exclude);

  return NextResponse.json(data);
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
