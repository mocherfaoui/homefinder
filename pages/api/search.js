import { propertyTypes } from '@/lib/constants';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const {
      city,
      country,
      minPrice,
      maxPrice,
      propertyType,
      status,
      cursor,
      agencyId,
      limit,
      resetFilters,
    } = req.query;

    const agencyIdFilter = agencyId ? { ownerId: agencyId } : {};

    const statuses = ['for-sale', 'for-rent'];
    const oneOrAllStatuses = status === 'all' ? { in: statuses } : status;

    const oneOrAllPropertyTypes =
      propertyType === 'all' ? { in: propertyTypes } : propertyType;

    const filterQueries = {
      AND: [
        { city: { equals: city || undefined, mode: 'insensitive' } },
        {
          country: {
            is: {
              label: {
                equals: country || undefined,
                mode: 'insensitive',
              },
            },
          },
        },
        { isPublished: true },
        {
          price: {
            gt: Number(minPrice) ?? 100,
          },
        },
        {
          price: {
            lt: Number(maxPrice) ?? 999999999,
          },
        },
        agencyIdFilter,
        {
          status: oneOrAllStatuses,
        },
        { propertyType: oneOrAllPropertyTypes },
      ],
    };
    if (cursor !== 'null') {
      const results = await prisma.listing.findMany({
        where: filterQueries,
        cursor: { id: cursor },
        skip: 1,
        take: limit ?? 12,
        include: {
          country: {
            select: {
              label: true,
            },
          },
        },
      });
      res.status(200).json(results);
    } else {
      const results = await prisma.listing.findMany({
        orderBy: {
          views: {
            totalViews: 'desc',
          },
        },
        where: filterQueries,
        take: limit ?? 12,
        include: {
          country: {
            select: {
              label: true,
            },
          },
        },
      });
      res.status(200).json(results);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
