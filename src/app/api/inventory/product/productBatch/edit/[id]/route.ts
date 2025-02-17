import prismaClient from "../../../../../../../../prisma";
import { NextRequest } from "next/server";
import { fetchInventoryId } from "@/utils/fetchBranchDetails";


export const PUT = async (req: NextRequest, { params }: { params: { id: number; } }) => {
    if (req.method !== 'PUT') {
        return new Response('Method not allowed', { status: 405 });
    }
    try {
        const body = await req.json();
        const inventoryId = await fetchInventoryId(req);
        const batch = await prismaClient.productBatch.update({
            where: {
                id: Number(params.id),
                inventorySectionId: inventoryId
            },
            data: body
        })
        return new Response(JSON.stringify(batch), { status: 201, headers: { 'Content-Type': 'application/json' } });
    }
    catch (error) {
        console.log(error);
        return new Response("Internal server error", { status: 500 });
    }
    finally {
        await prismaClient.$disconnect();
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { id: number; } }) => {
    if (req.method !== 'DELETE') {
        return new Response('Method not allowed', { status: 405 });
    }
    try {
        const body = await req.json();
        const inventoryId = await fetchInventoryId(req);
        await Promise.all([

            await prismaClient.productBatch.update({
                where: {
                    id: Number(params.id),
                    inventorySectionId: inventoryId
                },
                data: {
                    isDeleted: true
                }
            }

            ),

            await prismaClient.products.update({
                where: {
                    id: Number(body.productId),
                },
                data: {
                    totalQuantity: {
                        decrement: Number(body.quantity)
                    }
                }
            })
        ])


        return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    }
    catch (error) {
        console.log(error);
        return new Response("Internal server error", { status: 500 });
    }
    finally {
        await prismaClient.$disconnect();
    }
}