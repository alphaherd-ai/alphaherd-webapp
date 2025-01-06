import { NextRequest } from 'next/server';
import prismaClient from '../../../../../../prisma';

export const PATCH = async (req: NextRequest) => {
  if (req.method !== 'PATCH') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { orgDetails, branchDetails,branchId,orgId } = await req.json();

    await prismaClient.organization.update({
        where: {
            id: Number(orgId)
        },
        data: orgDetails
    });
    await prismaClient.orgBranch.update({
        where: {
            id: Number(branchId)
        },
        data: branchDetails
    });
    
    return new Response(JSON.stringify({ "message" : "Organization data updated successfully"}), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error : any) {
    // console.log(error);
    // console.log(typeof(error))
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