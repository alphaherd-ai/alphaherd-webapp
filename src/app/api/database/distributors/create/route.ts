import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import { DistributorSchema } from '@/schemas/database/distributorValidation';

export const POST=async(req: NextRequest)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const databaseId = await fetchDatabaseId(req.url);
      const body = await req.json();
      const validatedData = DistributorSchema.safeParse(body);

      if (!validatedData.success) {
        return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
          status: 422,
        });
      }
      console.log(body)
        
        const distributor = await prismaClient.distributors.create({
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
        await prismaClient.$disconnect();
    }
  }