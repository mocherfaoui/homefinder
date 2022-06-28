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
      const favorite = await prisma.favorite.upsert({
        where: { listingId: id },
        create: {
          listingId: id,
          users: { connect: { id: session.user.id } },
        },
        update: {
          users: { connect: { id: session.user.id } },
        },
      });
      res.status(200).json(favorite);
    } catch (error) {
      res.status(400).json({ error: 'Something went wrong' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { id } = req.query;
      const favorite = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          favorites: { disconnect: { listingId: id } },
        },
      });
      res.status(200).json({ favorite });
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'PATCH']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
