import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = req.headers['x-api-key'];
  const pathToRevalidate = req.headers['x-path-to-revalidate'];

  if (apiKey !== process.env.FIVEOUTOFNINE_API_KEY) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (!pathToRevalidate || typeof pathToRevalidate !== 'string') {
    res.status(400).json({ message: 'Missing path to revalidate' });
    return;
  }

  try {
    await res.revalidate(pathToRevalidate);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
