import type { NextApiRequest, NextApiResponse } from 'next';
import getAllInventory from './getAll';
import createInventory from './create';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getAllInventory(req, res);
      break;
    case 'POST':
      await createInventory(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
