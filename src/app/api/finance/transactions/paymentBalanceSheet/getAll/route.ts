import { fetchFinanceId } from "@/utils/fetchBranchDetails";
import prismaClient from "../../../../../../../prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const financeId = await fetchFinanceId(req);
    
    const recordTransaction = await prismaClient.recordTransaction.findMany({
      where: {
        financeSectionId: financeId
      }
    });
    return new Response(JSON.stringify(recordTransaction), {
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