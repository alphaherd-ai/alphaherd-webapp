// src/api/finance/create.ts
import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { Stock } from '@prisma/client';

export const POST = async (req: Request, { params }: { params: { type: string } }) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body: any = await req.json();
    await connectToDB();
    const sales = await prismaClient.sales.create({
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
        sale: { connect: { id: sales.id } },
        createdAt: new Date(),
      },
    });

    if (params.type === 'invoice') {
      await Promise.all(
        body.item.create.map(async (item: any) => {
          const updatedProduct = await prismaClient.productBatch.update({
            where: { id: item.allProductsId },
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          });

          await prismaClient.inventoryTimeline.create({
            data: {
              stockChange:Stock.StockOUT,
              quantityChange: -item.quantity,
            },
          });
        })
      );
    } else if (params.type === 'return') {
      await Promise.all(
        body.item.create.map(async (item: any) => {
          const updatedProduct = await prismaClient.productBatch.update({
            where: { id: item.allProductsId },
            data: {
              quantity: {
                increment: item.quantity,
              },
            },
          });

          await prismaClient.inventoryTimeline.create({
            data: {
              stockChange:Stock.StockIN,
              quantityChange: item.quantity,
            },
          });
        })
      );
    }

    return new Response(JSON.stringify({ sales, finance, items }), {
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
