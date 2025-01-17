import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }
  try {

    const inventoryId = await fetchInventoryId(req);
    const productBatches = await prismaClient.productBatch.findMany({
      where: {
        inventorySectionId: inventoryId,
        isApproved: true,
        isDeleted: false
      },
      include: {
        product: true
      },
      cacheStrategy: {
        ttl: 60
      }
    });
    return new Response(JSON.stringify(productBatches), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
}
