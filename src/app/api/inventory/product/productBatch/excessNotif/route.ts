import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { ProductBatch } from "@prisma/client";

// Named export for the PATCH method
export async function PATCH(req: Request) {
  try {
    const { id, excessNotif } = await req.json();
    console.log("Request Body:", { id, excessNotif }); // Log the request body for debugging

    await prismaClient.products.update({
      where: { id },
      data: { 
        excessNotif: new Date(excessNotif) 
      },
    });

    return new Response(JSON.stringify({ message: 'Last excess notification date updated' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error updating last excess notification date:", error);
    return new Response(JSON.stringify({ error: "Failed to update last excess notification date" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
