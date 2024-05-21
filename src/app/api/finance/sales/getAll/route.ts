// src/api/sales/get.ts
import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    
    const sales = await prismaClient.sales.findMany({
      include: {
        items: {
          include: {
            productBatch: true, 
          },
        },
      },
    });

    return new Response(JSON.stringify(sales), {
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
