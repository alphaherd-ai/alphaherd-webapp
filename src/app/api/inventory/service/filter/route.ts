// src/api/Services/filter.ts
import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import {  Services } from '@prisma/client';

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    
    const url = new URL(req.url);
    const categories = url.searchParams.getAll('category');
    const distributors = url.searchParams.getAll('distributor');

    const filterOptions: {
      service?: {
        category?: string | { in: string[] };
      };
      distributors?: string | { in: string[] };
    } = {};

    if (categories.length > 0) {
      filterOptions.service = {
        category: { in: categories.map(String) },
      };
    }

    if (distributors.length > 0) {
      filterOptions.distributors = { in: distributors.map(String) };
    }

    // const filteredServices: Services[] = await prismaClient.services.findMany({
    //   where: {
    //     ...filterOptions,
    //   },
    //   include: {
    //     service: {
    //       where: filterOptions.service,
    //     },
    //   },
    // });
   const filteredServices="jlksjd"
    return new Response(JSON.stringify(filteredServices), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error filtering Services:', error);
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
