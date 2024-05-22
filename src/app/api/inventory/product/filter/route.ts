// src/api/products/filter.ts
import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { ProductBatch} from '@prisma/client';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    
    const url = new URL(req.url);
    const categories = url.searchParams.getAll('category');
    const distributors = url.searchParams.getAll('distributor');

    const filterOptions: {
      product?: {
        category?: string | { in: string[] };
      };
      distributors?: string | { in: string[] };
    } = {};

    if (categories.length > 0) {
      filterOptions.product = {
        category: { in: categories.map(String) },
      };
    }

    if (distributors.length > 0) {
      filterOptions.distributors = { in: distributors.map(String) };
    }

    // const filteredProducts: ProductBatch[] = await prismaClient.productBatch.findMany({
    //   where: {
    //     ...filterOptions,
    //   },
    // });
    const filteredProducts="dsdf"
    return new Response(JSON.stringify(filteredProducts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error filtering products:', error);
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
