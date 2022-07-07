import prisma from './prisma';

export async function getCountries() {
  const result = await prisma.country.findMany({
    orderBy: {
      label: 'asc',
    },
    select: {
      value: true,
      label: true,
    },
  });
  return { countries: JSON.parse(JSON.stringify(result)) };
}
export async function getListingRatings(listingId) {
  const result = await prisma.rating.findMany({
    where: {
      listingId: listingId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    take: 10,
  });
  return { listingRatings: JSON.parse(JSON.stringify(result)) };
}
export async function getListingRatingsAvg(listingId) {
  const result = await prisma.rating.aggregate({
    where: {
      listingId: listingId,
    },
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
  });
  return { listingRatingsAvg: JSON.parse(JSON.stringify(result)) };
}
export async function getAllListings() {
  const result = await prisma.listing.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      country: {
        select: {
          label: true,
        },
      },
    },
    take: 12,
  });
  return { listings: JSON.parse(JSON.stringify(result)) };
}
export async function getAllListingswithCursor(cursor) {
  const result = await prisma.listing.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      country: {
        select: {
          label: true,
        },
      },
    },
    skip: 1,
    cursor: { id: cursor },
    take: 12,
  });
  return { listings: JSON.parse(JSON.stringify(result)) };
}
export async function getUserListings(agencyId) {
  const result = await prisma.listing.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: { ownerId: agencyId },
    include: {
      country: {
        select: {
          label: true,
        },
      },
      views: {
        select: {
          totalViews: true,
        },
      },
    },
  });
  return { listings: JSON.parse(JSON.stringify(result)) };
}
