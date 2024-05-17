import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { ServiceSchema } from '@/schemas/inventory/serviceValidation';

export const GET=async (req: Request,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            await connectToDB();
           const service= await prismaClient.services.findUnique({
                where: { id: Number(params.id) },
            });
                        
            return new Response(JSON.stringify(service), {
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

export const PUT=async (req: Request,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'PUT') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            await connectToDB();
            const body=await req.json();
            const validatedData = ServiceSchema.safeParse(body);

            if (!validatedData.success) {
              return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
                status: 422,
              });
            }
           const service= await prismaClient.services.update({
                where: { id: Number(params.id) },
                data:body,
            });     
            return new Response(JSON.stringify(service), {
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

export const DELETE=async (req: Request,
    { params }: { params: {id: number; } } )=> {
    if (req.method !== 'DELETE') {
                return new Response('Method not allowed',{status:405});
            } 
            try {
                await connectToDB();
                await prismaClient.services.deleteMany({
                    where: { id: Number(params.id) },
                });
              
                            
            return new Response(`Service with id: ${Number(params.id)} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prismaClient.$disconnect();
            }
  }