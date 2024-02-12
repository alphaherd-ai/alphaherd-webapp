import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import type { Service } from "@prisma/client";

export const POST=async(req: Request)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const body: Service = await req.json();
        await connectToDB();
        const service = await prisma.service.create({
            data: body
        });
        return new Response(JSON.stringify(service), {
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