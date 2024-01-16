import type { NextApiRequest, NextApiResponse } from 'next';
import getAllProducts from './getAll';
import createProduct from './create';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getAllProducts(req, res);
      break;
    case 'POST':
      await createProduct(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
