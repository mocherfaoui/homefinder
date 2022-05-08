import { getToken } from 'next-auth/jwt';

import prisma from '@/lib/prisma';

const secret = process.env.SECRET;
export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method === 'POST') {
    const {
      title,
      imagesUrls,
      description,
      price,
      bathrooms,
      rooms,
      address,
      city,
      zipcode,
      country,
      propertyType,
      size,
      status,
    } = req.body;
    const listing = await prisma.listing.create({
      data: {
        title,
        images: { set: imagesUrls },
        description,
        price,
        bathrooms,
        rooms,
        address,
        city,
        zipcode,
        country: country.value,
        propertyType,
        size,
        status,
        ownerId: token.uid,
      },
    });
    res.status(200).json({ listing });
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['POST']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
