import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../../prisma";

export const GET = async function (req: NextRequest, res: NextResponse) {
    if (req.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
    }
    const { searchParams } = new URL(req.url);
    console.log(searchParams)
    const userId= searchParams.get("userId");
    console.log("Here's the branchasdfID:",userId)
    const branchDetails = await prismaClient.orgBranch.findMany({
        where: {
          assignedUsers: {
            some: { id: Number(userId) }, 
          },
        },
        include: {
          org: true, 
          assignedUsers:true
        },
      });
      
    console.log(branchDetails);
    return new Response(JSON.stringify(branchDetails), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
}