import { connectToDB } from '../../../../../utils/index';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import prisma from '../../../../../../prisma/index';
import { ClientSchema } from '@/schemas/database/clientValidation';

export const GET=async (req: Request,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const databaseId= await fetchDatabaseId();
            await connectToDB();
           const client= await prisma.clients.findUnique({
                where: { id: Number(params.id),databaseSectionId:databaseId },
                include:{
                    patients:true
                }
            });
                        
            return new Response(JSON.stringify(client), {
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
            const validatedData = ClientSchema.safeParse(body);

            if (!validatedData.success) {
                return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
                status: 422,
                });
            }
           const client= await prisma.clients.update({
                where: { id: Number(params.id),databaseSectionId:databaseId },
                data:body,
            });     
            return new Response(JSON.stringify(client), {
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
                await prisma.clients.deleteMany({
                    where: { id: Number(params.id),databaseSectionId:databaseId },
                });
              
                            
            return new Response(`Client with id: ${Number(params.id)} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prisma.$disconnect();
            }
  }