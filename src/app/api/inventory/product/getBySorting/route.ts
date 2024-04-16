import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';


export const GET = async (req: Request) => {
  if (req.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
  }
  try {
      await connectToDB();
      const inventoryId = await fetchInventoryId();
      const products = await prisma.products.findMany({
          where:{id:inventoryId},
          orderBy: [
              { itemName: 'asc' }
          ]
      });
      return new Response(JSON.stringify(products), {
          status: 201,
          headers: {
              'Content-Type': 'application/json',
          },
      });
  } catch (error) {
      return new Response("Internal server error", { status: 500 });
  } finally {
      await prisma.$disconnect();
  }
}

  