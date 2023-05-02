import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== process.env.FIVEOUTOFNINE_API_KEY) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }

    console.log(req.body);
    res.status(201).json({ name: 'data added' });
  } else {
    res.status(405).send({ message: 'Only POST requests allowed' });
  }
}
