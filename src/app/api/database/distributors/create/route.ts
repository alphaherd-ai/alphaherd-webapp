import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import type { Distributors } from "@prisma/client";

export const POST=async(req: Request)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const databaseId = await fetchDatabaseId();
      const body = await req.json();
      console.log(body)
        await connectToDB();
        const distributor = await prisma.distributors.create({
            data: {
              ...body,
            DatabaseSection:{
              connect:{
                id:databaseId
              }
            }
            }
        });
        return new Response(JSON.stringify(distributor), {
          status: 201,
          headers: {
              'Content-Type': 'application/json',
          },
      });
    } catch (error) {
      console.error(error)
      return new Response(JSON.stringify(error));
    } finally {
        await prisma.$disconnect();
    }
  }