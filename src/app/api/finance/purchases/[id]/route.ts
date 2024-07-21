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
    const purchases = await prismaClient.purchases.findUnique({
      where: { id: Number(params.id),financeSectionId:financeId },
      include: {
        items: {
          include: {
            productBatch: true,
          },
        },
        recordTransaction: true,
      },
    });

    return new Response(JSON.stringify(purchases), {
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
      
      const body = await req.json();
      const newTransaction = body.recordTransaction[0];
      const purchases = await prismaClient.purchases.update({
        where: { id: Number(params.id) },
        data: {
          recordTransaction: {
            create: newTransaction,
          },
        },
        include: {
          items: {
            include: {
              productBatch: true,
            },
          },
          recordTransaction: true,
        },
      });
  
      return new Response(JSON.stringify(purchases), {
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
    
    const purchasesId = Number(params.id);

    await prismaClient.financeTimeline.deleteMany({
      where: { purchasesId },
    });

    await prismaClient.items.deleteMany({
      where: { purchasesId },
    });

    await prismaClient.purchases.delete({
      where: { id: purchasesId },
    });

    return new Response(`purchases with id: ${purchasesId} deleted successfully`, { status: 201 });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
