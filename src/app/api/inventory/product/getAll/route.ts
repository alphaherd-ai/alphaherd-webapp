import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { NextApiRequest, NextApiResponse } from 'next';


export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed',{status:405});
  }

  try {
    const inventoryId = await fetchInventoryId();
    await connectToDB();
    const products = await prisma.products.findMany({
      where: { inventorySectionId: inventoryId }
    });
    return new Response(JSON.stringify(products), {
      status: 201,
      headers: {
          'Content-Type': 'application/json',
      },
  });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));

  } finally {
    await prisma.$disconnect();
  }
};
