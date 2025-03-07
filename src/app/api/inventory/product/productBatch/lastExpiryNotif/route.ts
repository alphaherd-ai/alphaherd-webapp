import prismaClient from '../../../../../../../prisma';

// Named export for the PATCH method
export async function PATCH(req: Request) {
  try {
    const { id, lastExpiryNotif } = await req.json();
    console.log("Request Body:", { id, lastExpiryNotif }); // Log the request body for debugging

    await prismaClient.products.update({
      where: { id },
      data: { 
        lastExpiryNotif: new Date(lastExpiryNotif) 
      },
    });

    return new Response(JSON.stringify({ message: 'Last Expiry notification date updated' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error updating last expiry notification date:", error);
    return new Response(JSON.stringify({ error: "Failed to update last expiry notification date" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
