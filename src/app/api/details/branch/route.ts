import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../../prisma";

export const GET = async function (req: NextRequest, res: NextResponse) {
    if (req.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
    }
    const { searchParams } = new URL(req.url);
    const branchId = searchParams.get("branchId");
    const branchDetails = await prismaClient.orgBranch.findUnique({
        where : {
            id : Number(branchId)
        },
        include: {
            org : true
        }
    });
    console.log(branchDetails);
    return new Response(JSON.stringify(branchDetails), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
}