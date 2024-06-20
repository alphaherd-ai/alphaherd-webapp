import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import prismaClient from '../../../../../prisma';

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const url = new URL(req.url);
  const branchId = url.searchParams.get('branchId');

  let orgBranchUserRoles = await prismaClient.orgBranchUserRole.findMany({
    where: {
      orgBranchId: Number(branchId)
    }
  });

  let staff = [];
  for(let i = 0;i<orgBranchUserRoles.length;i++){
    staff.push(await prismaClient.user.findFirst({where: {id : orgBranchUserRoles[i].userId}}));
  }

  return new Response(JSON.stringify({ "staff" : staff}), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });

}