import { NextRequest } from 'next/server';
import prismaClient from '../../../../../../prisma';

export const PATCH = async (req: NextRequest) => {
  if (req.method !== 'PATCH') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const url = new URL(req.url);
    const body = await req.json();
    const orgId = url.searchParams.get('orgId');

    await prismaClient.organization.update({
        where: {
            id: Number(orgId)
        },
        data: body
    });
    
    return new Response(JSON.stringify({ "message" : "Organization data updated successfully"}), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error : any) {
    console.log(error);
    console.log(typeof(error))
    return new Response(JSON.stringify({"message" : error.message}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await prismaClient.$disconnect();
  }
};