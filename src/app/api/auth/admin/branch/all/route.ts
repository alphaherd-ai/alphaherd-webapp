import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import prismaClient from '../../../../../../../prisma';

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const url = new URL(req.url);
  const orgId = url.searchParams.get('orgId');

  let orgBranches = await prismaClient.orgBranch.findMany({
    where: {
      orgId: Number(orgId)
    },
    include: {
      assignedUsers: true
    }
  });

  orgBranches = orgBranches.map(branch => ({
    ...branch,
    assignedUsersCount: branch.assignedUsers.length
  }));
  const allorgBranches = orgBranches.map(branch => {
    const { assignedUsers, ...rest } = branch;
    return rest;
  });
  // console.log(allorgBranches);

  return new Response(JSON.stringify({ "branches" : allorgBranches}), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });

}