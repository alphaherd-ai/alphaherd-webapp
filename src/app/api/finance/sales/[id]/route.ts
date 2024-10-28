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
    const sales = await prismaClient.sales.findUnique({
      where: { id: Number(params.id),financeSectionId:financeId },
      include: {
        items: {
          include: {
            productBatch: true,
            services:true,
          },
        },
        recordTransaction: true,
      },
    });

    return new Response(JSON.stringify(sales), {
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

export const PUT = async (req: NextRequest, { params }: { params: { id: number } }) => {
    if (req.method !== 'PUT') {
      return new Response('Method not allowed', { status: 405 });
    }
    
  
    try {
      const financeId=await fetchFinanceId(req);
      const body = await req.json();
      const status=body.status;
      const newTransaction = body.recordTransaction[0];
      const sales = await prismaClient.sales.update({
        where: { id: Number(params.id),financeSectionId:financeId},
        data: {
          recordTransaction: {
            create: newTransaction,
          },
          status:status,
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
  
      return new Response(JSON.stringify(sales), {
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
    
    const salesId = Number(params.id);
    const financeId=await fetchFinanceId(req);
    await prismaClient.financeTimeline.deleteMany({
      where: { salesId,financeSectionId:financeId},
    });

    await prismaClient.items.deleteMany({
      where: { salesId,financeSectionId:financeId},
    });

    await prismaClient.sales.delete({
      where: { id: salesId,financeSectionId:financeId},
    });

    return new Response(`Sales with id: ${salesId} deleted successfully`, { status: 201 });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
