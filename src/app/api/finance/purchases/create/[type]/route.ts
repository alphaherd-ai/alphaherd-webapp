// src/api/finance/create.ts
import { connectToDB } from '../../../../../../utils/index';
import prisma from '../../../../../../../prisma/index';

export const POST = async (req: Request, { params }: { params: { type: string } }) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body: any = await req.json();
    await connectToDB();
    const purchases = await prisma.purchases.create({
      data: {
        ...body,
        type: params.type,
      },
    });

    const items = await prisma.items.createMany({
      data: body.item.create,
    });

    const finance = await prisma.finance.create({
      data: {
        type: params.type,
        sale: { connect: { id: purchases.id } },
        time: new Date(),
      },
    });

    if (params.type === 'invoice') {
      await Promise.all(
        body.item.create.map(async (item: any) => {
          const updatedProduct = await prisma.allProducts.update({
            where: { id: item.allProductsId },
            data: {
              quantity: {
                increment: item.quantity,
              },
            },
          });

          await prisma.inventory.create({
            data: {
              stockChange:"Stock Out",
              quantityChange: -item.quantity,
            },
          });
        })
      );
    } else if (params.type === 'return') {
      await Promise.all(
        body.item.create.map(async (item: any) => {
          const updatedProduct = await prisma.allProducts.update({
            where: { id: item.allProductsId },
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          });

          await prisma.inventory.create({
            data: {
              stockChange:"Stock In",
              quantityChange: item.quantity,
            },
          });
        })
      );
    }

    return new Response(JSON.stringify({ purchases, finance, items }), {
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
