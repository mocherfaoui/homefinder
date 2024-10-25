import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';

import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method === 'POST') {
    try {
      const { body: listing } = req;
      const moreFromAgency = await prisma.listing.findMany({
        where: {
          ownerId: listing?.owner?.id,
          isPublished: true,
          id: {
            not: listing.id,
          },
        },
        include: {
          country: {
            select: {
              label: true,
            },
          },
        },
        take: 8,
      });
      const recommendedListings = await prisma.listing.findMany({
        where: {
          OR: [
            {
              country: {
                is: {
                  label: listing.country.label,
                },
              },
            },
            {
              propertyType: listing.propertyType,
            },
            {
              status: listing.status,
            },
          ],
          isPublished: true,
          id: {
            not: listing.id,
          },
          NOT: [
            {
              ownerId: session?.user?.agencyId || '',
            },
            {
              ownerId: listing?.owner?.id,
            },
          ],
        },
        orderBy: {
          views: {
            totalViews: 'desc',
          },
        },
        include: {
          country: {
            select: {
              label: true,
            },
          },
        },
        take: 6,
      });

      res.status(200).json({ moreFromAgency, recommendedListings });
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
