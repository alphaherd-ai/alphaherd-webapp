// src/api/transactions/get.ts
import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma';

export const GET = async (req: Request) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await connectToDB();
    const transactions = await prisma.transactions.findMany();

    return new Response(JSON.stringify(transactions), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
