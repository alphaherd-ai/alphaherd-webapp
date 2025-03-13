import prismaClient from '../../../../../../prisma';
import { NextRequest } from 'next/server';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const financeId = await fetchFinanceId(req);
    const sales = await prismaClient.sales.findMany({
      where: {
        financeSectionId: financeId,
      },
      include: {
        items: {
          include: {
            productBatch: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      cacheStrategy: { ttl: 30 },
    });

    return new Response(JSON.stringify(sales), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Hello this is the error", error);
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
