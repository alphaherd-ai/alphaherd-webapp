import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import type { Product } from "@prisma/client";

export const POST=async(req: Request)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const body: Product = await req.json();
      console.log(body)
        await connectToDB();
        const product = await prisma.product.create({
            data: body
        });
        return new Response(JSON.stringify(product), {
          status: 201,
          headers: {
              'Content-Type': 'application/json',
          },
      });
    } catch (error) {
      return new Response(JSON.stringify(error));
    } finally {
        await prisma.$disconnect();
    }
  }