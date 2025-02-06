import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { chessNftMetadata } from '@/lib/db/schema';
import supabase from '@/lib/services/supabase';

export async function GET() {
  const { data } = await supabase.from('chess_nft_metadata').select('*');

  if (!data) {
    return NextResponse.json({ error: 'No data found.' }, { status: 404 });
  }

  await db.insert(chessNftMetadata).values(
    data.map(({ id, name, description, animation_url, attributes }) => ({
      id,
      name: name ?? '',
      description: description ?? '',
      image: `https://assets.fiveoutofnine.com/chess-nft-images/${id}.png`,
      animationUrl: animation_url ?? '',
      attributes: attributes ?? {},
    })),
  );

  return NextResponse.json({ success: true });
}
