import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';

export async function PATCH(req: Request) {
  try {
    // Parse the request body
    const { id, lastDueNotif } = await req.json();
    // console.log("Request Body:", { id, lastDueNotif });

    // Validate `id` and `lastDueNotif`
    if (!id || !lastDueNotif) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing 'id' or 'lastDueNotif'" }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Convert `lastDueNotif` to a valid date
    const notifDate = new Date(lastDueNotif);
    if (isNaN(notifDate.getTime())) {
      return new Response(
        JSON.stringify({ error: "'lastDueNotif' must be a valid date" }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Update the database
    await prismaClient.purchases.update({
      where: { id },
      data: { lastSevenNotif: notifDate },
    });

    return new Response(JSON.stringify({ message: 'Last notification date updated' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error updating last notification date:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update last notification date" }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
