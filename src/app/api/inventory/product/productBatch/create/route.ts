import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { Inventory, type ProductBatch } from "@prisma/client";
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { ProductBatchSchema } from '@/schemas/inventory/ productBatchValidation';
import { NextRequest } from 'next/server';


export const POST=async(req: NextRequest )=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const {stockStatus,productId,invoiceType,...body} = await req.json();
      const data={stockStatus,productId,invoiceType,...body};
      const validatedData = ProductBatchSchema.safeParse(data);
      console.log(validatedData.error)
      if (!validatedData.success) {
        return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
          status: 422,
        });
      }

      const inventoryId=await fetchInventoryId(req);
        
        if(body.quantity==null){
          body.quantity=0;
        }
        const product= await prismaClient.products.update({
            where:{id:productId,inventorySectionId:inventoryId},
            data:{
                totalQuantity:{
                  increment:body.quantity
                }
            }
        })
        const productBatch = await prismaClient.productBatch.create({
            data: {
              ...body,
              product:{
                connect:{id: productId }
              },
              InventorySection:{
                connect:{id:inventoryId}
              }
            }
        });
        const inventory = await prismaClient.inventoryTimeline.create({
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
      console.log(inventory)
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
        await prismaClient.$disconnect();
    }
  }