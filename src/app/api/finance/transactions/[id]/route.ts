import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: number } }) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    
    const transactions = await prismaClient.transactions.findUnique({
      where: { id: Number(params.id) },
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
    if (req.method !== 'PUT') {
      return new Response('Method not allowed', { status: 405 });
    }
  
    try {
      
      const body = await req.json();
      const transactions = await prismaClient.transactions.update({
        where: { id: Number(params.id) },
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
    
    const transactionsId = Number(params.id);

     await prismaClient.transactions.delete({
      where: { id: transactionsId },
    });

    return new Response(`transactions with id: ${transactionsId} deleted successfully`, { status: 201 });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
