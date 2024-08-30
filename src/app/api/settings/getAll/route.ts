import { NextRequest } from "next/server";
import prismaClient from "../../../../../prisma";
import { fetchFinanceId } from "@/utils/fetchBranchDetails";

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }
  try {
    const financeId = await fetchFinanceId(req);
    const paymentMethod = await prismaClient.paymentMethod.findMany({
      where:{
        financeSectionId:financeId
      },
    });
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