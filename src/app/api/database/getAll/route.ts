// src/api/purchases/get.ts
import { connectToDB } from '../../../../utils/index';
import prismaClient from '../../../../../prisma';
import { NextRequest } from 'next/server';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const databaseSectionId=await fetchDatabaseId(req);
    const clients = await prismaClient.clients.findMany({
      where: {
        databaseSectionId: databaseSectionId
      },
      include: {
       patients:true
      },
    });
    const distributors = await prismaClient.distributors.findMany({
        where: {
            databaseSectionId: databaseSectionId
        },
    })
    const patients = await prismaClient.patients.findMany({
        where: {
            databaseSectionId: databaseSectionId
        },
        include:{
          clients:true
        },
    })
 
    return new Response(JSON.stringify({clients,distributors,patients}), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
