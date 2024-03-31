import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import type { Clients } from "@prisma/client";

export const POST=async(req: Request)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const body: Clients = await req.json();
      console.log(body)
        await connectToDB();
        const client = await prisma.clients.create({
            data: body
        });
        return new Response(JSON.stringify(client), {
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