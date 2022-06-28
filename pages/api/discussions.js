import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';

import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  if (req.method === 'GET') {
    try {
      const discussions = await prisma.discussion.findMany({
        where: {
          participants: {
            some: {
              id: session.user.id,
            },
          },
        },
        select: {
          id: true,
          messages: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
          participants: {
            where: {
              id: {
                not: session.user.id,
              },
            },
            select: {
              id: true,
              image: true,
              name: true,
              agencies: {
                select: {
                  name: true,
                  logo: true,
                },
              },
            },
          },
        },
      });
      res.status(200).json(discussions);
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
