import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';

import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  if (req.method === 'POST') {
    try {
      const { country, ...formData } = req.body;
      const agency = await prisma.agency.create({
        data: {
          ...formData,
          countryId: country.value,
          ownerId: session.user.id,
        },
      });
      res.status(200).json({ agency });
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['POST']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
