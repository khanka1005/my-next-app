import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '@/app/lib/models';
import { connectToDB } from '@/app/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectToDB();

      const { title, cat, desc, price, stock, color, size, img } = req.body;

      if (!title || !cat || !desc || !price || !stock || !img) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newProduct = new Product({
        title,
        cat,
        desc,
        price: Number(price),
        stock: Number(stock),
        color,
        size,
        img,
      });

      await newProduct.save();
      res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
