import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest, { params }: { params: { type: string } }) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body: any = await req.json();
    
 
     const expenses = await prismaClient.expenses.create({
        data: {
          ...body,
          type: params.type,
        },
      });
    

    const items = await prismaClient.items.createMany({
      data: body.item.create,
    });

    const finance = await prismaClient.financeTimeline.create({
      data: {
        type: params.type,
        sale: { connect: { id: expenses.id } },
        createdAt: new Date(),
      },
    });

    return new Response(JSON.stringify({ expenses, finance, items }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
