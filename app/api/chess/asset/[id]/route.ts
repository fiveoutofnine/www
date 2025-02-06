import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { idSchema } from '@/lib/schemas';
import { validateQuery } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = validateQuery(idSchema, await params);

  // Fetch image.
  const nft = await db.query.chessNftMetadata.findFirst({
    columns: {
      animationUrl: true,
    },
    where: (nft, { eq }) => eq(nft.id, id),
  });

  if (!nft) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // The prepended script tag is to scale the animation to the window size. It
  // is equivalent to the following:
  // ```js
  // window.addEventListener('DOMContentLoaded', () => {
  //   const section = document.querySelector('section');
  //   section.style.transformOrigin = 'top left';
  //   const scale = () => section.style.transform = 'scale(' + window.innerWidth / 1000 + ')';
  //   scale();
  //   window.onresize = scale;
  // });
  // ```
  const html = `<script type="text/javascript">w=window;w.addEventListener('DOMContentLoaded',()=>{n=document.querySelector('section').style;n.transformOrigin='top left';a=()=>n.transform='scale('+w.innerWidth/1000+')';a();w.onresize=a});</script>${Buffer.from(
    nft.animationUrl.substring(22) ?? '',
    'base64',
  ).toString()}`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
      // Cache response for 1 week, revalidate after 1 day.
      'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=86400',
    },
  });
}
