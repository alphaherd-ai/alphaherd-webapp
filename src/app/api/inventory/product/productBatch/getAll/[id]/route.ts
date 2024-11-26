import { connectToDB } from '../../../../../../../utils/index';
import prismaClient from '../../../../../../../../prisma';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { NextRequest } from 'next/server';

export  const GET=async (req: NextRequest,
  { params }: { params: {id: number; } } )=> {
  if (req.method !== 'GET') {
    return new Response('Method not allowed',{status:405});
}
    try {
        
        const inventoryId= await fetchInventoryId(req);
        const products = await prismaClient.productBatch.findMany({
          where:{productId:Number(params.id),inventorySectionId:inventoryId,
          isApproved:true
          },
          orderBy:[{
            id:'asc'
          }],
          include:{
            product:true,
            inventoryTimeline:true
          }
        });
        return new Response(JSON.stringify(products), {
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
  