import type { NextApiRequest, NextApiResponse } from 'next';
import getProductById from './getById';
import updateProduct from './update';
import deleteProduct from './delete';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getProductById(req, res);
      break;
    case 'PUT':
      await updateProduct(req, res);
      break;
    case 'DELETE':
      await deleteProduct(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
