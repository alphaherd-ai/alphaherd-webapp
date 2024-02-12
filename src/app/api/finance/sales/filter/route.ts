// src/api/Finance/filter.ts
import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { Finance } from '@prisma/client';

export const POST = async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await connectToDB();
    const url = new URL(req.url);
    const party = url.searchParams.getAll('party');
    const type = url.searchParams.getAll('type');
    const dateAtFrom = url.searchParams.get('dateAtFrom');
    const dateAtTo = url.searchParams.get('dateAtTo');

    const filterOptions: {
      party?: string | { in: string[] };
      type?: string | { in: string[] };
      createdAt?: { gte?: Date; lte?: Date };
    } = {};

    if (party.length > 0) {
      filterOptions.party = { in: party.map(String) };
    }

    if (type.length > 0) {
      filterOptions.type = { in: type.map(String) };
    }


    if (dateAtFrom && dateAtTo) {
      filterOptions.createdAt = {
        gte: new Date(dateAtFrom),
        lte: new Date(dateAtTo),
      };
    }

    const filteredInventory: Finance[] = await prisma.finance.findMany({
      where: filterOptions,
    });

    return new Response(JSON.stringify(filteredInventory), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error filtering Finance:', error);
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
