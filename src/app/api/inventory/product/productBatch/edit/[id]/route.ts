import prismaClient from "../../../../../../../../prisma";
import { NextRequest } from "next/server";
import { fetchInventoryId } from "@/utils/fetchBranchDetails";
import { Inventory, Stock } from "@prisma/client";

export const PUT = async (req: NextRequest, { params }: { params: { id: number; } }) => {
    if (req.method !== 'PUT') {
        return new Response('Method not allowed', { status: 405 });
    }
    try {
        const { body, changeInQuantity } = await req.json();
        console.log(body, changeInQuantity);
        const inventoryId = await fetchInventoryId(req);
        const batch = await prismaClient.productBatch.update({
            where: {
                id: Number(params.id),
                inventorySectionId: inventoryId
            },
            data: body
        })


        await prismaClient.products.update({
            where: {
                id: batch.productId
            },
            data: {
                totalQuantity: {
                    increment: changeInQuantity
                }
            }
        })




        const createdInventory = await prismaClient.inventoryTimeline.create({
            data: {
                quantityChange: changeInQuantity,
                inventoryType: Inventory.Product,
                stockChange: changeInQuantity >= 0 ? Stock.StockIN : Stock.StockOUT,
                party: 'Edit Product Batch',
                inventorySectionId: batch.inventorySectionId
            }

        })

        await prismaClient.inventoryTimeline.update({
            where: { id: createdInventory.id },
            data: {
                productBatch: {
                    connect: {
                        id: batch.id,
                    },
                },
            },
        });


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
        const batch = await prismaClient.productBatch.update({
            where: {
                id: Number(params.id),
                inventorySectionId: inventoryId
            },
            data: {
                isDeleted: true
            }
        });


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

        const createdInventory = await prismaClient.inventoryTimeline.create({
            data: {

                quantityChange: body.quantity,
                inventoryType: Inventory.Product,
                stockChange: Stock.StockOUT,
                party: 'Delete Product Batch',
                inventorySectionId: batch.inventorySectionId,
            }
        })

        await prismaClient.inventoryTimeline.update({
            where: { id: createdInventory.id },
            data: {
                productBatch: {
                    connect: {
                        id: batch.id,
                    },
                },
            },
        });



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