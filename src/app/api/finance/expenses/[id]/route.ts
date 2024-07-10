import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { NextRequest } from 'next/server';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';

export const GET = async (req: NextRequest, { params }: { params: { id: number } }) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const financeId=await fetchFinanceId(req);
    const expenses = await prismaClient.expenses.findUnique({
      where: { id: Number(params.id),financeSectionId:financeId },
      include: {
        items:true   
      },
    });

    return new Response(JSON.stringify(expenses), {
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
    if (req.method !== 'PUT') {
      return new Response('Method not allowed', { status: 405 });
    }
  
    try {
      const financeId=await fetchFinanceId(req);
      const body = await req.json();
      const expenses = await prismaClient.expenses.update({
        where: { id: Number(params.id),financeSectionId:financeId },
        data: body,
        include: {
          items: {
            include: {
              productBatch: true,
            },
          },
        },
      });
  
      return new Response(JSON.stringify(expenses), {
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
    
    const expensesId = Number(params.id);

    await prismaClient.financeTimeline.deleteMany({
      where: { expensesId },
    });

    await prismaClient.items.deleteMany({
      where: { expensesId },
    });

    await prismaClient.expenses.delete({
      where: { id: expensesId },
    });

    return new Response(`expenses with id: ${expensesId} deleted successfully`, { status: 201 });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
