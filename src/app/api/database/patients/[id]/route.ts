import { connectToDB } from '../../../../../utils/index';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import prisma from '../../../../../../prisma';
import { PatientSchema } from '@/schemas/database/patientValidation';

export const GET=async (req: Request,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const databaseId = await fetchDatabaseId();
            await connectToDB();
           const patient= await prisma.patients.findUnique({
                where: { id: Number(params.id), databaseSectionId:databaseId },
            });
                        
            return new Response(JSON.stringify(patient), {
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
            const validatedData = PatientSchema.safeParse(body);

            if (!validatedData.success) {
            return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
                status: 422,
            });
            }
           const patient= await prisma.patients.update({
                where: { id: Number(params.id), databaseSectionId:databaseId },
                data:body,
            });     
            return new Response(JSON.stringify(patient), {
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
                await prisma.patients.deleteMany({
                    where: { id: Number(params.id),databaseSectionId:databaseId },
                });
              
                            
            return new Response(`Patient with id: ${Number(params.id)} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prisma.$disconnect();
            }
  }