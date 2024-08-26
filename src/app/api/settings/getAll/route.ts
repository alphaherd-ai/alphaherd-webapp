import { NextRequest } from "next/server";
import prismaClient from "../../../../../prisma";

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }
  try {
    const paymentMethod = await prismaClient.paymentMethod.findMany();
    return new Response(JSON.stringify(paymentMethod), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
}