import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';

export const POST=async(req: Request)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const inventoryId = await fetchInventoryId();
      const body = await req.json();
        await connectToDB();
        body.totalQuantity=0;
        const product = await prisma.products.create({
            data: {
              ...body,
            InventorySection:{
              connect:{
                id:inventoryId
              }
            }
            },
            
        });
        
        return new Response(JSON.stringify(product), {
          status: 201,
          headers: {
              'Content-Type': 'application/json',
          },
      });
    } catch (error) {
      console.error(error)
      return new Response(JSON.stringify(error));
    } finally {
        await prisma.$disconnect();
    }
  }