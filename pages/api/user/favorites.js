import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';

import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const { favorites } = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          favorites: {
            include: {
              listing: {
                include: {
                  country: {
                    select: {
                      label: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      res.status(200).json(favorites);
    } catch (error) {
      res.status(400).json({ error: 'Unknown Error' });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['GET']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
