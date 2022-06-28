import { unstable_getServerSession } from 'next-auth';

import prisma from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  const { id } = req.query;
  const { ownerId } = await prisma.listing.findUnique({
    where: { id },
    select: {
      ownerId: true,
    },
  });
  const isListingOwner = ownerId === session.user.agencyId;
  if (!isListingOwner) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  if (req.method === 'PATCH') {
    try {
      const { images, country, ...formData } = req.body;
      const listing = await prisma.listing.update({
        where: { id },
        data: {
          ...formData,
          images: { set: images },
          countryId: country.value,
        },
      });
      res.status(200).json({ listing });
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const listing = await prisma.listing.delete({
        where: { id },
      });
      listing.images.forEach(async (image) => {
        const path = image.split(`${process.env.SUPABASE_BUCKET}/`)?.[1];
        await supabase.storage.from(process.env.SUPABASE_BUCKET).remove([path]);
      });
      res.status(200).json({ listing });
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['PATCH', 'DELETE']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
