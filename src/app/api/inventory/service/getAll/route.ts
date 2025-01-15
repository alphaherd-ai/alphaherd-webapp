import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { NextRequest } from 'next/server';


export  const GET=async (req: NextRequest)=> {
  if (req.method !== 'GET') {
    return new Response('Method not allowed',{status:405});
}
    try {
        const inventoryId=await fetchInventoryId(req);
        
        const services = await prismaClient.services.findMany({
          where:{
            inventorySectionId:inventoryId,
            isDeleted:false
          },
          orderBy:{
            createdAt:'desc'
          }
        });
        return new Response(JSON.stringify(services), {
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
  