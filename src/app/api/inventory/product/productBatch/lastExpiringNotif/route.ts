import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { ProductBatch } from "@prisma/client";

// Named export for the PATCH method
export async function PATCH(req: Request) {
  try {
    const { id, lastExpiringNotif } = await req.json();
    console.log("Request Body:", { id, lastExpiringNotif }); // Log the request body for debugging

    await prismaClient.products.update({
      where: { id },
      data: { 
        lastExpiringNotif: new Date(lastExpiringNotif) 
      },
    });

    return new Response(JSON.stringify({ message: 'Last expiring notification date updated' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error updating last expiring notification date:", error);
    return new Response(JSON.stringify({ error: "Failed to update last expiring notification date" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
