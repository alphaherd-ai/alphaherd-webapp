import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { NextRequest } from 'next/server';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';
export const GET = async (req: NextRequest, { params }: { params: { id: number } }) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const financeId= await fetchFinanceId(req);
    const transactions = await prismaClient.transactions.findUnique({
      where: { id: Number(params.id),financeSectionId:financeId },
    });

    return new Response(JSON.stringify(transactions), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};

export const PUT = async (req: NextRequest, { params }: { params: { id: number } }) => {
  console.log("I am in route.ts of transaction/id");
    if (req.method !== 'PUT') {
      return new Response('Method not allowed', { status: 405 });
    }
  
    try {
      const financeId= await fetchFinanceId(req);
      const body = await req.json();
      if (body.amountPaid) {
        body.amountPaid = parseInt(body.amountPaid, 10); // Ensure it's an integer
      }
      const transactions = await prismaClient.transactions.update({
        where: { id: Number(params.id),financeSectionId:financeId },
        data: body,
      });
  
      return new Response(JSON.stringify(transactions), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
        console.error(error)
      return new Response('Internal server error', { status: 500 });
    } finally {
      await prismaClient.$disconnect();
    }
  };


export const DELETE = async (req: NextRequest, { params }: { params: { id: number } }) => {
  if (req.method !== 'DELETE') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const financeId= await fetchFinanceId(req);
    const transactionsId = Number(params.id);

     await prismaClient.transactions.delete({
      where: { id: transactionsId,financeSectionId:financeId },
    });

    return new Response(`transactions with id: ${transactionsId} deleted successfully`, { status: 201 });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
