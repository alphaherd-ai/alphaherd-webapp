import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import type { Transactions } from "@prisma/client";
import { NextRequest } from 'next/server';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';

export const POST=async(req: NextRequest, { params }: { params: { type: string } })=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const body = await req.json();
      const financeId = await fetchFinanceId(req);

        console.log(body)
        
        const transactions = await prismaClient.transactions.create({
          data: {
            ...body,
            FinanceSection: {
              connect: { id: financeId },
            },
          },
        });
        return new Response(JSON.stringify( transactions ), {
          status: 201,
          headers: {
              'Content-Type': 'application/json',
          },
      });
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify(error));
    } finally {
        await prismaClient.$disconnect();
    }
  }