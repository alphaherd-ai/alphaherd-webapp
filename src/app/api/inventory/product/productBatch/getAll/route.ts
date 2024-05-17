import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';

export  const GET=async (req: Request )=> {
  if (req.method !== 'GET') {
    return new Response('Method not allowed',{status:405});
}
    try {
        await connectToDB();
        const inventoryId=await fetchInventoryId();
        const productBatches = await prismaClient.productBatch.findMany({
            where:{inventorySectionId:inventoryId},
            include:{
                product:true
            }
        });
        return new Response(JSON.stringify(productBatches), {
          status: 201,
          headers: {
              'Content-Type': 'application/json',
          },
      });
    } catch (error) {
      return new Response("Internal server error",{status:500});
    } finally {
        await prismaClient.$disconnect();
    }
  }
  