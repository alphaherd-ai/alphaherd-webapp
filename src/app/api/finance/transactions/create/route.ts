import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma';
import type { Transactions } from "@prisma/client";

export const POST=async(req: Request)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const body: Transactions = await req.json();
        await connectToDB();
        const transactions = await prisma.transactions.create({
            data: body
        });
        return new Response(JSON.stringify(transactions), {
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