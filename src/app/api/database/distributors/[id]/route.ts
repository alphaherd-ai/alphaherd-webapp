import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import { DistributorSchema } from '@/schemas/database/distributorValidation';


export const GET=async (req: Request,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const databaseId = await fetchDatabaseId();
            await connectToDB();
           const distributor= await prisma.distributors.findUnique({
                where: { id: Number(params.id), databaseSectionId:databaseId },
            });
                        
            return new Response(JSON.stringify(distributor), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            return new Response( "Internal server error",{status:500});
        } finally {
            await prisma.$disconnect();
        }
}

export const PUT=async (req: Request,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'PUT') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const databaseId = await fetchDatabaseId();
            await connectToDB();
            const body=await req.json();
            const validatedData = DistributorSchema.safeParse(body);

            if (!validatedData.success) {
              return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
                status: 422,
              });
            }
           const distributor= await prisma.distributors.update({
                where: { id: Number(params.id), databaseSectionId:databaseId },
                data:body,
            });     
            return new Response(JSON.stringify(distributor), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            return new Response( "Internal server error",{status:500});
        } finally {
            await prisma.$disconnect();
        }
}

export const DELETE=async (req: Request,
    { params }: { params: {id: number; } } )=> {
    if (req.method !== 'DELETE') {
                return new Response('Method not allowed',{status:405});
            } 
            try {
                const databaseId = await fetchDatabaseId();
                await connectToDB();
                await prisma.distributors.deleteMany({
                    where: { id: Number(params.id),databaseSectionId:databaseId },
                });
              
                            
            return new Response(`distributor with id: ${Number(params.id)} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prisma.$disconnect();
            }
  }