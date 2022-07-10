import { decode } from 'base64-arraybuffer';
import { nanoid } from 'nanoid';
import { getToken } from 'next-auth/jwt';

import { supabase } from '@/lib/supabase';

const secret = process.env.SECRET;
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  if (req.method === 'POST') {
    const image = req.body;

    if (!image) {
      return res.status(400).json({ message: 'No image provided' });
    }

    try {
      const contentType = image.match(/data:(.*);base64/)?.[1];
      const base64FileData = image.split('base64,')?.[1];

      if (!contentType || !base64FileData) {
        return res.status(400).json({ message: 'Image data not valid' });
      }

      // Upload image
      const fileName = nanoid();
      const ext = contentType.split('/')[1];
      const path = `${fileName}.${ext}`;

      const { data, error: uploadError } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(path, decode(base64FileData), {
          contentType,
          upsert: true,
        });

      if (uploadError) {
        throw new Error('Unable to upload image to storage');
      }

      // Construct public URL
      const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.Key}`;

      return res.status(200).json({ url });
    } catch (e) {
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
