// src/api/inventory/create.ts
import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import type { Product } from "@prisma/client";

export const POST = async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await connectToDB();
    const { productId, serviceId, ...restOfBody } = await req.json();
    console.log(restOfBody);

    const inventory = await prisma.inventory.create({
      data: {
        ...restOfBody,
        expiry: new Date(restOfBody.expiry),
        product: { connect: { id: productId } },
        service: { connect: { id: serviceId } }
      },
    });

    return new Response(JSON.stringify(inventory), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  } finally {
    await prisma.$disconnect();
  }
};
