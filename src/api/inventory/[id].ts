import type { NextApiRequest, NextApiResponse } from 'next';
import getInventoryById from './getById';
import updateInventory from './update';
import deleteInventory from './delete';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getInventoryById(req, res);
      break;
    case 'PUT':
      await updateInventory(req, res);
      break;
    case 'DELETE':
      await deleteInventory(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
