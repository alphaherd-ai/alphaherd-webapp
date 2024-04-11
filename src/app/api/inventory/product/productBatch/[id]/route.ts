import { connectToDB } from '../../../../../../utils/index';
import prisma from '../../../../../../../prisma/index';
import { Inventory, Stock } from '@prisma/client';

export const GET=async (req: Request,
    { params }: { params: {id: string; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            await connectToDB();
           const productBatch= await prisma.productBatch.findUnique({
                where: { id: params.id },
            });
                        
            return new Response(JSON.stringify(productBatch), {
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
            const { productId,stockStatus,invoiceType,...body}=await req.json();
           const productBatch= await prisma.productBatch.findUnique({
                where: { id: params.id },
            });  
            const product = await prisma.products.update({
                where:{id:productId},
                data:{
                    totalQuantity:{
                        decrement:body.quantity
                    }
                }
            })
            const updateItem = await prisma.productBatch.update({
                where: { id: params.id },
                data: {
                    ...body,
                    quantity:Math.abs((productBatch?.quantity || 0) - (body.quantity || 0))
                }
            });
        
            const inventory = await prisma.inventoryTimeline.create({
                data: {
                    objectId:params.id,
                    stockChange:stockStatus,
                    invoiceType:invoiceType,
                    quantityChange:body.quantity,
                    inventoryType:Inventory.Product
                }
            });
            return new Response(JSON.stringify({ inventory }), {
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
    { params }: { params: {id: string; } } )=> {
    if (req.method !== 'DELETE') {
                return new Response('Method not allowed',{status:405});
            } 
            try {
                await connectToDB();
                await prisma.productBatch.delete({
                    where: {id: params.id },
                });
               
            return new Response(`Product with id: ${params.id} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prisma.$disconnect();
            }
  }