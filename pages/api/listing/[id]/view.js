import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'POST') {
    const view = await prisma.viewCounter.upsert({
      where: { listingId: id },
      create: {
        listingId: id,
      },
      update: {
        totalViews: {
          increment: 1,
        },
      },
    });
    res.status(200).json(view);
  } else if (req.method === 'GET') {
    const view = await prisma.viewCounter.findUnique({
      where: { listingId: id },
      select: {
        totalViews: true,
      },
    });
    res.status(200).json(view);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).json({
      error: 'Method not allowed',
    });
  }
}
