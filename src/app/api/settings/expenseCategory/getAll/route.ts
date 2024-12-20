import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";
import { fetchInventoryId } from "@/utils/fetchBranchDetails";

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const inventoryId= await fetchInventoryId(req);
    const itemCategory = await prismaClient.expenseCategory.findMany({
      where:{
        inventorySectionId:inventoryId
      },
    });

    return new Response(JSON.stringify(itemCategory), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching item categories:', error);
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
}
