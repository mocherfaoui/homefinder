import { unstable_getServerSession } from 'next-auth';

import prisma from '@/lib/prisma';

import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  if (req.method === 'POST') {
    try {
      const { receiverId } = req.query;
      const discussion = await prisma.discussion.create({
        data: {
          participants: {
            connect: [{ id: session.user.id }, { id: receiverId }],
          },
          messages: {
            create: {
              content: req.body.message,
              authorId: session.user.id,
            },
          },
        },
      });
      res.status(200).json(discussion);
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
