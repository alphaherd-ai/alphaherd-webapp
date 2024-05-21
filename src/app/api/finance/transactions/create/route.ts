import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import type { Transactions } from "@prisma/client";
import { NextRequest } from 'next/server';

export const POST=async(req: NextRequest)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const body: Transactions = await req.json();
        
        const transactions = await prismaClient.transactions.create({
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
        await prismaClient.$disconnect();
    }
  }