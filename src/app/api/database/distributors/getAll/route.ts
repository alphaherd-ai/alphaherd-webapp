import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import { NextRequest } from 'next/server';


export  const GET=async (req: NextRequest)=> {
  if (req.method !== 'GET') {
    return new Response('Method not allowed',{status:405});
}
    try {
        const databaseId = await fetchDatabaseId(req);
        
        const distributors = await prismaClient.distributors.findMany({
          where:{
            databaseSectionId:databaseId,
            isDeleted:false
          }
        });
        return new Response(JSON.stringify(distributors), {
          status: 201,
          headers: {
              'Content-Type': 'application/json',
          },
      });
    } catch (error) {
      return new Response("Internal server error",{status:500});
    } finally {
        await prismaClient.$disconnect();
    }
  }
  