import { connectToDB } from '../../../../utils/index';
import prismaClient from '../../../../../prisma';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { NextRequest } from 'next/server';

export const GET=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const inventoryId = await fetchInventoryId(req);
            
            const inventory= await prismaClient.inventoryTimeline.findUnique({
                where: { id: Number(params.id),inventorySectionId:inventoryId,isApproved:true},
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
            await prismaClient.$disconnect();
        }
}

export const PUT = async (req: NextRequest, { params }: { params: { id: number } }) => {
    if (req.method !== 'PUT') {
        return new Response('Method not allowed', { status: 405 });
    }
    try {
        const inventoryId = await fetchInventoryId(req);
        
        const { stockStatus, body } = await req.json();
        const item = await prismaClient.inventoryTimeline.findUnique({
            where: { id: Number(params.id),inventorySectionId:inventoryId },
        });
        const product = await prismaClient.productBatch.findUnique({
            where: { id: item?.productId !== null ? item?.productId : undefined,inventorySectionId:inventoryId },
        });
        if (!product || product.quantity === null || product.quantity === undefined) {
            throw new Error("Product quantity is null or undefined.");
        }
        const inventory = await prismaClient.inventoryTimeline.create({
            data: {
                stockChange: stockStatus,
                quantityChange: Math.abs(product.quantity - body.quantity),
                InventorySection:{
                    connect:{
                        id:inventoryId
                    }
                }
            }
        });
        const updateItem = await prismaClient.inventoryTimeline.update({
            where: { id: item?.productId !== null ? item?.productId : undefined,inventorySectionId:inventoryId },
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
        await prismaClient.$disconnect();
    }
}


export const DELETE=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {
    if (req.method !== 'DELETE') {
                return new Response('Method not allowed',{status:405});
            } 
            try {
                const inventoryId = await fetchInventoryId(req);
                
                await prismaClient.inventoryTimeline.deleteMany({
                    where: { id: Number(params.id), inventorySectionId:inventoryId },
                });

            return new Response(`Inventory with id: ${Number(params.id)} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prismaClient.$disconnect();
            }
  }