import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { Inventory, type Services } from "@prisma/client";

export const POST=async(req: Request)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const {source,...body}  = await req.json();
        await connectToDB();
        const service = await prisma.services.create({
            data: body
      
        });
        const inventory= await prisma.inventoryTimeline.create({
          data:{
            quantityChange:body.quantity,
            invoiceType:source,
            serviceId:service.id,
            inventoryType:Inventory.Service
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
        await prisma.$disconnect();
    }
  }