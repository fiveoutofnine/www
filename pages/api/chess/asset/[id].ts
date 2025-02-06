import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/lib/db';
import { idSchema } from '@/lib/schemas';
import { validateQuery } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { id } = validateQuery(idSchema, req.query);

  // Fetch image.
  const nft = await db.query.chessNftMetadata.findFirst({
    columns: {
      animationUrl: true,
    },
    where: (nft, { eq }) => eq(nft.id, id),
  });

  if (!nft) {
    res.status(404).send('Not found.');
    return;
  }

  res.setHeader('Content-Type', 'text/html');
  // Cache response for 1 week, revalidate after 1 day.
  res.setHeader('cache-control', 'public, s-maxage=604800, stale-while-revalidate=86400');
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
  res
    .status(200)
    .send(
      `<script type="text/javascript">w=window;w.addEventListener('DOMContentLoaded',()=>{n=document.querySelector('section').style;n.transformOrigin='top left';a=()=>n.transform='scale('+w.innerWidth/1000+')';a();w.onresize=a});</script>${Buffer.from(
        nft.animationUrl.substring(22) ?? '',
        'base64',
      ).toString()}`,
    );
}
