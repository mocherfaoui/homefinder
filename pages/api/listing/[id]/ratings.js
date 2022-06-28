import { getListingRatings } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const { listingRatings } = await getListingRatings(id);
    res.status(200).json(listingRatings);
  } else {
    res.setHeader('Allow', ['GET']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
