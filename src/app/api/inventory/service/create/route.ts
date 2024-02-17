import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import type { AllServices } from "@prisma/client";

export const POST=async(req: Request)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const {source,...body}  = await req.json();
        await connectToDB();
        const service = await prisma.allServices.create({
            data: body
      
        });
        const inventory= await prisma.inventory.create({
          data:{
            quantityChange:body.quantity,
            invoiceType:source,
            allServicesId:service.id
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