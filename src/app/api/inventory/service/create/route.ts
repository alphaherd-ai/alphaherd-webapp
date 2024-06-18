import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { Inventory, type Services } from "@prisma/client";
import { ServiceSchema } from '@/schemas/inventory/serviceValidation';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { NextRequest } from 'next/server';


export const POST=async(req: NextRequest)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const {source,...body}  = await req.json();
      console.log(body)
      const validatedData = ServiceSchema.safeParse(body);
       console.log(validatedData.error)
      if (!validatedData.success) {
        return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
          status: 422,
        });
      } 
      const inventoryId=await fetchInventoryId(req);

        
        const service = await prismaClient.services.create({
            data: {...body,
              InventorySection:{
                connect:{id:inventoryId}
              }},
      
        });
        console.log(service);
        const inventory= await prismaClient.inventoryTimeline.create({
          data:{
            quantityChange:body.quantity,
            invoiceType:source,
            inventoryType:Inventory.Service,
            service:{
              connect:{
                id:service.id
              }
            },
            InventorySection:{
              connect:{
                id:inventoryId
              }
              }
            
          }
        })
        return new Response(JSON.stringify({service,inventory}), {
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