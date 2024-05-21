import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';


export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
  }
  try {
      
      const inventoryId = await fetchInventoryId(req);
      const products = await prismaClient.products.findMany({
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
      await prismaClient.$disconnect();
  }
}

  