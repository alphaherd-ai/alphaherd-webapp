import { connectToDB } from '../../../../../utils/index';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import prisma from '../../../../../../prisma';


export  const GET=async (req: Request)=> {
  if (req.method !== 'GET') {
    return new Response('Method not allowed',{status:405});
}
    try {
        const databaseId = await fetchDatabaseId();
        await connectToDB();
        const patients = await prisma.patients.findMany({
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
        await prisma.$disconnect();
    }
  }
  