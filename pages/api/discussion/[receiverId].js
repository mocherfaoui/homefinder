import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';

import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { receiverId } = req.query;

  if (!session || receiverId) {
    res.status(401).json([]);
  }

  if (req.method === 'GET') {
    try {
      const discussionWithAgency = await prisma.discussion.findMany({
        where: {
          participants: {
            every: {
              id: {
                in: [receiverId, session?.user?.id ?? ''],
              },
            },
          },
        },
      });
      res.status(200).json(discussionWithAgency);
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
