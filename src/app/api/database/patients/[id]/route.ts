import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';

export const GET=async (req: Request,
    { params }: { params: {id: string; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            await connectToDB();
           const patient= await prisma.patients.findUnique({
                where: { id: params.id },
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
    { params }: { params: {id: string; } } )=> {

        if (req.method !== 'PUT') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            await connectToDB();
            const body=await req.json();
           const patient= await prisma.patients.update({
                where: { id: params.id },
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
    { params }: { params: {id: string; } } )=> {
    if (req.method !== 'DELETE') {
                return new Response('Method not allowed',{status:405});
            } 
            try {
                await connectToDB();
                await prisma.patients.deleteMany({
                    where: { id: params.id },
                });
              
                            
            return new Response(`Patient with id: ${params.id} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prisma.$disconnect();
            }
  }