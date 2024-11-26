import { connectToDB } from '../../../../../utils/index';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import prismaClient from '../../../../../../prisma';
import { PatientSchema } from '@/schemas/database/patientValidation';
import { NextRequest } from 'next/server';

export const GET=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const databaseId = await fetchDatabaseId(req);
            
           const patient= await prismaClient.patients.findUnique({
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
            const validatedData = PatientSchema.safeParse(body);

            if (!validatedData.success) {
            return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
                status: 422,
            });
            }
           const patient= await prismaClient.patients.update({
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
                
                await prismaClient.patients.deleteMany({
                    where: { id: Number(params.id),databaseSectionId:databaseId },
                });
              
                            
            return new Response(`Patient with id: ${Number(params.id)} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prismaClient.$disconnect();
            }
  }