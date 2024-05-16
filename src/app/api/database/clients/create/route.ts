import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import type { Clients } from "@prisma/client";
import { ClientSchema } from '@/schemas/database/clientValidation';

export const POST=async(req: Request)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const databaseId = await fetchDatabaseId();
      const body = await req.json();
      const validatedData = ClientSchema.safeParse(body);

      if (!validatedData.success) {
        return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
          status: 422,
        });
      }
      console.log(body)
        const client = await prisma.clients.create({
            data:{ 
              ...body,
              DataBaseSection:{
                connect:{
                  id:databaseId
                }
              }
            }
        });
        return new Response(JSON.stringify(client), {
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