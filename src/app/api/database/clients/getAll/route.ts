import prismaClient from '../../../../../../prisma';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import { NextRequest } from 'next/server';


export  const GET=async (req: NextRequest)=> {
  if (req.method !== 'GET') {
    return new Response('Method not allowed',{status:405});
}
    try {
      const databaseId = await fetchDatabaseId(req.url);
        const clients = await prismaClient.clients.findMany({
          where:{
            databaseSectionId:databaseId
          },
          include:{
            patients:true
          }
        });
        return new Response(JSON.stringify(clients), {
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
  