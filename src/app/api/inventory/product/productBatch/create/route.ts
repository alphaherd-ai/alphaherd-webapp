import { connectToDB } from '../../../../../../utils/index';
import prisma from '../../../../../../../prisma/index';
import { Inventory, type ProductBatch } from "@prisma/client";
import { fetchInventoryId } from '@/utils/fetchBranchDetails';


export const POST=async(req: Request )=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const {stockStatus,productId,invoiceType,...body} = await req.json();
      const inventoryId=await fetchInventoryId();
        await connectToDB();
        if(body.quantity==null){
          body.quantity=0;
        }
        const product= await prisma.products.update({
            where:{id:productId,inventorySectionId:inventoryId},
            data:{
                totalQuantity:{
                  increment:body.quantity
                }
            }
        })
        const productBatch = await prisma.productBatch.create({
            data: {
              ...body,
              product:{
                connect:{id: productId }
              },
              inventorySection:{
                connect:{id:inventoryId}
              }
            }
        });
        const inventory = await prisma.inventoryTimeline.create({
          data: {
              stockChange:stockStatus,
              invoiceType:invoiceType,
              quantityChange:body.quantity,
              inventoryType:Inventory.Product,
              productBatch:{
                connect:{
                  id:productBatch.id
                }
              },
              InventorySection:{
              connect:{
                id:inventoryId
              }
              }
          }
      });
        return new Response(JSON.stringify({productBatch,inventory}), {
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