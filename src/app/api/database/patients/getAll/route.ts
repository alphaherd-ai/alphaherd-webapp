import { connectToDB } from '../../../../../utils/index';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import prismaClient from '../../../../../../prisma';
import { NextRequest } from 'next/server';


export  const GET=async (req: NextRequest)=> {
  if (req.method !== 'GET') {
    return new Response('Method not allowed',{status:405});
}
    try {
        const databaseId = await fetchDatabaseId(req.url);
        
        const patients = await prismaClient.patients.findMany({
          where:{
            databaseSectionId:databaseId
          }
        });
        return new Response(JSON.stringify(patients), {
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
  