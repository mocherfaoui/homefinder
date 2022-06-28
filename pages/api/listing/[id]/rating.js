import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';

import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  if (req.method === 'POST') {
    try {
      const { id } = req.query;
      const { rating, comment } = req.body;
      const ratingData = await prisma.rating.create({
        data: {
          userId: session.user.id,
          listingId: id,
          rating,
          comment,
        },
      });
      res.status(200).json(ratingData);
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
