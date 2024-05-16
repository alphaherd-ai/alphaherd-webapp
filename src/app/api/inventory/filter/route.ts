// src/api/inventory/filter.ts
import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import { Inventory, InventoryTimeline, Stock } from '@prisma/client';

export const POST = async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await connectToDB();
    const url = new URL(req.url);
    const party = url.searchParams.getAll('party');
    const invoiceType = url.searchParams.getAll('invoiceType');
    const stockChange = url.searchParams.getAll('stockChange');
    const dateAtFrom = url.searchParams.get('dateAtFrom');
    const dateAtTo = url.searchParams.get('dateAtTo');

    const filterOptions: {
      party?: string | { in: string[] };
      invoiceType?: string | { in: string[] };
      stockChange?: Stock| { in: string[] };
      createdAt?: { gte?: Date; lte?: Date };
    } = {};

    if (party.length > 0) {
      filterOptions.party = { in: party.map(String) };
    }

    if (invoiceType.length > 0) {
      filterOptions.invoiceType = { in: invoiceType.map(String) };
    }

    if (stockChange.length > 0) {
      filterOptions.stockChange = { in: stockChange.map(String) };
    }

    if (dateAtFrom && dateAtTo) {
      filterOptions.createdAt = {
        gte: new Date(dateAtFrom),
        lte: new Date(dateAtTo),
      };
    }

    // const filteredInventory: InventoryTimeline[] = await prisma.inventoryTimeline.findMany({
    //   where: filterOptions,
    // });
    const filteredInventory="dalkjsf"
    return new Response(JSON.stringify(filteredInventory), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error filtering inventory:', error);
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
