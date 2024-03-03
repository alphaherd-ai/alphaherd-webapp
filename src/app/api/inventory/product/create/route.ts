import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import type { AllProducts } from "@prisma/client";

export const POST=async(req: Request)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const body: AllProducts = await req.json();
      console.log(body)
        await connectToDB();
        if(body.quantity==null){
          body.quantity=0;
        }
        const product = await prisma.allProducts.create({
            data: body
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