import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import { Stock } from '@prisma/client';

export const GET=async (req: Request,
    { params }: { params: {id: string; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            await connectToDB();
           const inventory= await prisma.inventory.findUnique({
                where: { id: params.id },
            });
                        
            return new Response(JSON.stringify(inventory), {
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
            const stockCount = await prisma.inventory.findUnique({
              where: { id: params.id },
            });
            const newStock: Stock = body.quantity > stockCount!.quantity
              ? 'StockIN'
              : body.quantity === stockCount!.quantity
                ?'NONE'
                :'StockOUT';

            body.updateStock = newStock;
           const inventory= await prisma.inventory.update({
                where: { id: params.id },
                data:body,
            });     
            return new Response(JSON.stringify(inventory), {
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
                await prisma.inventory.deleteMany({
                    where: { id: params.id },
                });

            return new Response(`Inventory with id: ${params.id} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prisma.$disconnect();
            }
  }