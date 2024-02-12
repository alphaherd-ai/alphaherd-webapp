import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await connectToDB();
    const sales = await prisma.sales.findUnique({
      where: { id: params.id },
      include: {
        item: {
          include: {
            allProducts: true, 
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
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    if (req.method !== 'PUT') {
      return new Response('Method not allowed', { status: 405 });
    }
  
    try {
      await connectToDB();
      const body = await req.json();
      const sales = await prisma.sales.update({
        where: { id: params.id },
        data: body,
        include: {
          item: {
            include: {
              allProducts: true,
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
        console.error(error)
      return new Response('Internal server error', { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  if (req.method !== 'DELETE') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await connectToDB();
    const salesId = params.id;

    await prisma.finance.deleteMany({
      where: { salesId },
    });

    await prisma.items.deleteMany({
      where: { salesId },
    });

    await prisma.sales.delete({
      where: { id: salesId },
    });

    return new Response(`Sales with id: ${salesId} deleted successfully`, { status: 201 });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
