import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';

import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  const { discussionId } = req.query;
  if (req.method === 'GET') {
    try {
      const messages = await prisma.message.findMany({
        where: {
          discussionId,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      res.status(200).json(messages);
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } else if (req.method === 'POST') {
    try {
      const { message } = req.body;
      const newMessage = await prisma.message.create({
        data: {
          content: message,
          discussionId,
          authorId: session.user.id,
        },
      });
      res.status(200).json(newMessage);
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
