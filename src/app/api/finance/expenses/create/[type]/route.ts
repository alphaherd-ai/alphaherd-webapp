import { connectToDB } from '../../../../../../utils/index';
import prisma from '../../../../../../../prisma/index';

export const POST = async (req: Request, { params }: { params: { type: string } }) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body: any = await req.json();
    await connectToDB();
 
     const expenses = await prisma.expenses.create({
        data: {
          ...body,
          type: params.type,
        },
      });
    

    const items = await prisma.items.createMany({
      data: body.item.create,
    });

    const finance = await prisma.financeTimeline.create({
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
    await prisma.$disconnect();
  }
};
