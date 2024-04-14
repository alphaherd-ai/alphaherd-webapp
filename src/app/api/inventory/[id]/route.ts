import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';


export const GET=async (req: Request,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            await connectToDB();
            const inventory= await prisma.inventoryTimeline.findUnique({
                where: { id: Number(params.id) },
                include:{
                    productBatch:true,
                    service:true
                }
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

export const PUT = async (req: Request, { params }: { params: { id: number } }) => {
    if (req.method !== 'PUT') {
        return new Response('Method not allowed', { status: 405 });
    }
    try {
        await connectToDB();
        const { stockStatus, body } = await req.json();
        const item = await prisma.inventoryTimeline.findUnique({
            where: { id: Number(params.id) },
        });
        const product = await prisma.productBatch.findUnique({
            where: { id: item?.objectId !== null ? item?.objectId : undefined },
        });
        if (!product || product.quantity === null || product.quantity === undefined) {
            throw new Error("Product quantity is null or undefined.");
        }
        const inventory = await prisma.inventoryTimeline.create({
            data: {
                stockChange: stockStatus,
                quantityChange: Math.abs(product.quantity - body.quantity)
            }
        });
        const updateItem = await prisma.inventoryTimeline.update({
            where: { id: item?.objectId !== null ? item?.objectId : undefined },
            data: body
        });
        return new Response(JSON.stringify({ updateItem, inventory }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response("Internal server error", { status: 500 });
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
                await prisma.inventoryTimeline.deleteMany({
                    where: { id: Number(params.id) },
                });

            return new Response(`Inventory with id: ${Number(params.id)} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prisma.$disconnect();
            }
  }