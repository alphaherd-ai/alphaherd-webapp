import prismaClient from "../../../../../../prisma";
import { NextRequest } from "next/server";
import { fetchInventoryId } from "@/utils/fetchBranchDetails";

export const PUT = async (req: NextRequest) => {
    if (req.method !== 'PUT') {
        return new Response('Method not allowed', { status: 405 });
    }
    try {
        const body = await req.json();
        const { batch, invoiceLink } = body;
        //console.log(body);
        const inventoryId = await fetchInventoryId(req);
        if (invoiceLink.startsWith('SI')) {
            await Promise.all([
                await batch.forEach(async (e: any) => {
                    await prismaClient.productBatch.update({
                        where: {
                            id: e.value,
                            inventorySectionId: inventoryId
                        },
                        data: {
                            quantity: {
                                decrement: e.quantity
                            }
                        }
                    })
                })
            ])
        }
        else if (invoiceLink.startsWith('PI')) {
            await Promise.all([
                await batch.forEach(async (e: any) => {
                    await prismaClient.productBatch.update({
                        where: {
                            id: e.value,
                            inventorySectionId: inventoryId
                        },
                        data: {
                            quantity: {
                                increment: e.quantity
                            }
                        }
                    })
                })
            ])
        }
        else if (invoiceLink.startsWith('SR')) {
            await Promise.all([
                await batch.forEach(async (e: any) => {
                    await prismaClient.productBatch.update({
                        where: {
                            id: e.value,
                            inventorySectionId: inventoryId
                        },
                        data: {
                            quantity: {
                                increment: e.quantity
                            }
                        }
                    })
                })
            ])
        }
        else if (invoiceLink.startsWith('PR')) {
            await Promise.all([
                await batch.forEach(async (e: any) => {
                    await prismaClient.productBatch.update({
                        where: {
                            id: e.value,
                            inventorySectionId: inventoryId
                        },
                        data: {
                            quantity: {
                                decrement: e.quantity
                            }
                        }
                    })
                })
            ])
        }
        return new Response(JSON.stringify({msg:"BulkBatch Update Successful"}), { status: 201, headers: { 'Content-Type': 'application/json' } });

    } catch (err) {
        console.log(err);
    } finally {
        await prismaClient.$disconnect();
    }
}
