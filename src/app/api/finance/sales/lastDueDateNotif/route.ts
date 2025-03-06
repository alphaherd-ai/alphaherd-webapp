import prismaClient from '../../../../../../prisma';

export async function PATCH(req: Request) {
  try {
    const { id, lastReminderSent } = await req.json();
    console.log("Request Body:", { id, lastReminderSent }); // Log the request body for debugging

    await prismaClient.sales.update({
      where: { id },
      data: { 
        lastDueNotif: new Date(lastReminderSent)
      },
    });

    return new Response(JSON.stringify({ message: 'Last due date notification updated' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error updating last due date notification:", error);
    return new Response(JSON.stringify({ error: "Failed to update last due date notification" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
