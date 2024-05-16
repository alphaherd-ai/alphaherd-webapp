import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma';

export const GET = async (req: Request, { params }: { params: { id: number } }) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await connectToDB();
    const expenses = await prisma.expenses.findUnique({
      where: { id: Number(params.id) },
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
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, { params }: { params: { id: number } }) => {
    if (req.method !== 'PUT') {
      return new Response('Method not allowed', { status: 405 });
    }
  
    try {
      await connectToDB();
      const body = await req.json();
      const expenses = await prisma.expenses.update({
        where: { id: Number(params.id) },
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
      await prisma.$disconnect();
    }
  };


export const DELETE = async (req: Request, { params }: { params: { id: number } }) => {
  if (req.method !== 'DELETE') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await connectToDB();
    const expensesId = Number(params.id);

    await prisma.financeTimeline.deleteMany({
      where: { expensesId },
    });

    await prisma.items.deleteMany({
      where: { expensesId },
    });

    await prisma.expenses.delete({
      where: { id: expensesId },
    });

    return new Response(`expenses with id: ${expensesId} deleted successfully`, { status: 201 });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
