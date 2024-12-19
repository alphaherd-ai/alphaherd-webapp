import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { Inventory, Stock } from '@prisma/client';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { ProductBatchSchema } from '@/schemas/inventory/ productBatchValidation';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: number } }) => {
    if (req.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
    }
    try {
        const inventoryId = await fetchInventoryId(req);

        const productBatch = await prismaClient.productBatch.findUnique({
            where: { 
                id: Number(params.id), 
                inventorySectionId: inventoryId, 
                isApproved: true 
            },
            include: { // Include location in the result
                product: true,
            },
        });

        return new Response(JSON.stringify(productBatch), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response("Internal server error", { status: 500 });
    } finally {
        await prismaClient.$disconnect();
    }
};

export const PUT = async (req: NextRequest, { params }: { params: { id: number } }) => {
    if (req.method !== 'PUT') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        console.log('Incoming PUT Request:', { url: req.url, params });
        const inventoryId = await fetchInventoryId(req);
        console.log('Fetched Inventory ID:', inventoryId);

        const body = await req.json();
        console.log('Request Body:', body);

        const { isApproved, productId, stockStatus, invoiceType, location, ...rest } = body;
        console.log("Body is:", body);

        const productBatch = await prismaClient.productBatch.findUnique({
            where: { id: Number(params.id) },
        });

        console.log('Existing Product Batch:', productBatch);

        const product = await prismaClient.products.update({
            where: { id: productId, inventorySectionId: inventoryId },
            data: {
                totalQuantity: {
                    decrement: rest.quantity,
                },
                location: location, // Update the location field
            },
        });

        console.log('Updated Product:', product);

        const updateItem = await prismaClient.productBatch.update({
            where: { id: Number(params.id), inventorySectionId: inventoryId },
            data: {
                ...rest,
                location: location, // Include location in product batch
                quantity: Math.abs((productBatch?.quantity || 0) - (rest.quantity || 0)),
                isApproved,
            },
        });

        console.log('Updated Product Batch:', updateItem);

        const inventory = await prismaClient.inventoryTimeline.create({
            data: {
                stockChange: stockStatus,
                invoiceType: invoiceType,
                quantityChange: rest.quantity,
                inventoryType: Inventory.Product,
                isApproved: isApproved,
                productBatch: {
                    connect: {
                        id: Number(params.id),
                    },
                },
                InventorySection: {
                    connect: {
                        id: inventoryId,
                    },
                },
            },
        });

        console.log('Inventory Timeline Entry:', inventory);

        return new Response(JSON.stringify({ inventory, product, productBatch }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in PUT route:', error);
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prismaClient.$disconnect();
    }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: number } }) => {
    if (req.method !== 'DELETE') {
        return new Response('Method not allowed', { status: 405 });
    }
    try {
        const inventoryId = await fetchInventoryId(req);
        await prismaClient.productBatch.delete({
            where: { id: Number(params.id), inventorySectionId: inventoryId },
        });

        return new Response(`Product with id: ${Number(params.id)} Deleted Successfully`, { status: 201 });
    } catch (error) {
        return new Response("Internal server error", { status: 500 });
    } finally {
        await prismaClient.$disconnect();
    }
};
