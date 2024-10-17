import { NextRequest } from 'next/server';
import prismaClient from '../../../../../../prisma';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const url = new URL(req.url);
  const { branchName } = await req.json();
  const orgId = url.searchParams.get('orgId');

  let orgNewBranch = await prismaClient.orgBranch.create({
    data: {
      branchName,
      orgId: Number(orgId)
    }
  });

  // console.log(orgNewBranch);

  // const requestHeaders = new Headers(req.headers)

  // let userId = Number(requestHeaders.get("userId"));
  // console.log(userId);

  // const orgBranchUserRole = await prismaClient.orgBranchUserRole.create({
  //   data: {
  //     orgBranchId: orgNewBranch.id,
  //     role: "Manager",
  //     userId: userId
  //   }
  // });

  // console.log(orgBranchUserRole);
  // console.log(orgBranchUserRole);

  return new Response(JSON.stringify({ "message" : "Organization branch successfully created."}), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });

}