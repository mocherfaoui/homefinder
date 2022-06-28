import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';

import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method === 'GET') {
    try {
      const userData = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          name: true,
          email: true,
          address: true,
          city: true,
          zipcode: true,
          image: true,
          country: {
            select: {
              label: true,
              value: true,
            },
          },
        },
      });
      res.status(200).json(userData);
    } catch (error) {
      res.status(400).json({ error: 'Unknown Error' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { country, ...FormData } = req.body;
      const user = await prisma.user.update({
        where: { id: session.user.id },
        data: {
          ...FormData,
          countryId: country.value,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Unknown Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PATCH']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
