import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { Stock } from '@prisma/client';

export const GET=async (req: Request,
    { params }: { params: {id: number; } } )=> {
        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            await connectToDB();
           const product= await prisma.products.findUnique({
                where: { id: Number(Number(params.id)) },
                include:{
                    productBatches:true
                }
            });
            return new Response(JSON.stringify(product), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error(error)
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
            await connectToDB();
            const { stockStatus,invoiceType,...body}=await req.json();
           const product= await prisma.productBatch.update({
                where: { id: Number(params.id) },
                data:body
            });  
            
           
          
            return new Response(JSON.stringify({ product }), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });   
            
        } catch (error) {
            console.error(error)
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
                await connectToDB();
                await prisma.products.delete({
                    where: {id: Number(params.id) },
                });
                await  prisma.inventoryTimeline.deleteMany({
                    where:{objectId:Number(params.id)}
                });
            return new Response(`Product with id: ${Number(params.id)} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prisma.$disconnect();
            }
  }