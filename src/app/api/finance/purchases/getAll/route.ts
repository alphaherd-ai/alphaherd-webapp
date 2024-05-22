// src/api/purchases/get.ts
import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    
    const purchases = await prismaClient.purchases.findMany({
      include: {
        items: {
          include: {
            productBatch: true, 
          },
        },
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
