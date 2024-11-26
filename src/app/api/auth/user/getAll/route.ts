import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import prismaClient from '../../../../../../prisma';

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }
try{
  const url = new URL(req.url);
  const branchId = url.searchParams.get('branchId');
  //  console.log(branchId)
   const users=await prismaClient.orgBranchUserRole.findMany({
    where:{
      orgBranchId:Number(branchId)
    },
    include:{
      user:true
    }
   })
  //  console.log(users)

  return new Response(JSON.stringify(users), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
} catch (error) {
  console.error(error)
return new Response("Internal server error",{status:500});
} finally {
  await prismaClient.$disconnect();
}
}