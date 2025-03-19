import prismaClient from '../../../../../../../prisma';


// Named export for the PATCH method
export async function PATCH(req: Request) {
  try {
    const { id, lastExpiringNotif } = await req.json();

    if (!id || !lastExpiringNotif) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing 'id' or 'lastDueNotif'" }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    console.log("Request Body:", { id, lastExpiringNotif }); // Log the request body for debugging

    const notifDate = new Date(lastExpiringNotif);
    if (isNaN(notifDate.getTime())) {
      return new Response(
        JSON.stringify({ error: "'lastDueNotif' must be a valid date" }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    await prismaClient.productBatch.update({
      where: { id },
      data: { 
        lastExpiringNotif: new Date(lastExpiringNotif) 
      },
    });
    console.log("updated");

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
