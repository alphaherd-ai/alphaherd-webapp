import prismaClient from '../../../../../../prisma';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import { DistributorSchema } from '@/schemas/database/distributorValidation';
import { NextRequest } from 'next/server';


export const GET=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const databaseId = await fetchDatabaseId(req);
           const distributor= await prismaClient.distributors.findUnique({
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
            await prismaClient.$disconnect();
        }
}

export const PUT=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'PUT') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const databaseId = await fetchDatabaseId(req);
            const body=await req.json();
            const validatedData = DistributorSchema.safeParse(body);

            if (!validatedData.success) {
              return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
                status: 422,
              });
            }
           const distributor= await prismaClient.distributors.update({
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
            await prismaClient.$disconnect();
        }
}

export const DELETE=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {
    if (req.method !== 'DELETE') {
                return new Response('Method not allowed',{status:405});
            } 
            try {
                const databaseId = await fetchDatabaseId(req);
                
                await prismaClient.distributors.deleteMany({
                    where: { id: Number(params.id),databaseSectionId:databaseId },
                });
              
                            
            return new Response(`distributor with id: ${Number(params.id)} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prismaClient.$disconnect();
            }
  }