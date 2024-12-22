import { connectToDB } from '../../../../utils/index';
import prismaClient from '../../../../../prisma';
import { NextRequest } from 'next/server';

export const DELETE = async (req: NextRequest, res: Response) => {
  if (req.method !== 'DELETE') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.text(); // Read raw body as text
    console.log("body is :" , body);
    if (!body) {
      return new Response(JSON.stringify({ error: 'Request body is empty' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    let data;
    try {
      data = JSON.parse(body); // Safely parse JSON
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid JSON format' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const { id } = data;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Notification ID is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Delete the notification
    const deletedNotification = await prismaClient.notifications.delete({
      where: {
        id: id,
      },
    });

    return new Response(JSON.stringify(deletedNotification), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to delete notification' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await prismaClient.$disconnect();
  }
};
