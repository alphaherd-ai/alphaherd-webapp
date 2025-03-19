import prismaClient from '../../../../../../../prisma';


// Named export for the PATCH method
export async function PATCH(req: Request) {
  try {
    const { id, lastOutOfStockNotif } = await req.json();
    console.log("Request Body:", { id, lastOutOfStockNotif }); // Log the request body for debugging

    await prismaClient.products.update({
      where: { id },
      data: { 
        lastOutOfStockNotif: new Date(lastOutOfStockNotif) 
      },
    });
    
    return new Response(JSON.stringify({ message: 'Last notification date updated' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error updating last notification date:", error);
    return new Response(JSON.stringify({ error: "Failed to update last notification date" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
