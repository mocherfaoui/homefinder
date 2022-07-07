import { unstable_getServerSession } from 'next-auth/next';

import { getUserListings } from '@/lib/db';

import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  if (req.method === 'GET') {
    try {
      const { listings } = await getUserListings(session.user.agencyId);
      res.status(200).json(listings);
    } catch (error) {
      res.status(400).json({ error: 'Unknown Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
