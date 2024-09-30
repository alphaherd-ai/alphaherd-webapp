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
    }
  });

  // console.log(orgBranches);

  return new Response(JSON.stringify({ "branches" : orgBranches}), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });

}