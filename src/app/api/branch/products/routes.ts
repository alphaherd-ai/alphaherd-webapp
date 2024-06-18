import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import prismaClient from '../../../../../prisma';

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const url = new URL(req.url);
  const branchId = url.searchParams.get('branchId');

  let inventorySection = await prismaClient.inventorySection.findFirst({
    where: {
        branchId: Number(branchId)
    }
  })

  let products = await prismaClient.products.findMany({
    where: {
        inventorySectionId: inventorySection?.id
    }
  });

  return new Response(JSON.stringify({ "products" : products}), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });

}