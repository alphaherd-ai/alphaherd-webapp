import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';


export  const GET=async (req: Request)=> {
  if (req.method !== 'GET') {
    return new Response('Method not allowed',{status:405});
}
    try {
        const databaseId = await fetchDatabaseId();
        await connectToDB();
        const distributors = await prisma.distributors.findMany({
          where:{
            databaseSectionId:databaseId
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
        await prisma.$disconnect();
    }
  }
  