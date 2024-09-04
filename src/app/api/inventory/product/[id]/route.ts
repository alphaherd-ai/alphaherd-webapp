import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { productSchema } from '@/schemas/inventory/productValidation';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: number } }) => {
    if (req.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const inventoryId = await fetchInventoryId(req);
        
        const product = await prisma.products.findUnique({
            where: { id: Number(params.id), inventorySectionId: inventoryId },
            include: {
                productBatches: true,
            },
        });

        if (!product) {
            return new Response('Product not found', { status: 404 });
        }

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const PUT = async (req: NextRequest, { params }: { params: { id: number } }) => {
    if (req.method !== 'PUT') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const inventoryId = await fetchInventoryId(req);

        const { stockStatus, invoiceType, ...body } = await req.json();
        const validatedData = productSchema.safeParse(body);

        if (!validatedData.success) {
            return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
                status: 422,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const product = await prisma.productBatch.update({
            where: { id: Number(params.id), inventorySectionId: inventoryId },
            data: body,
        });

        return new Response(JSON.stringify({ product }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error updating product:', error);
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: number } }) => {
    if (req.method !== 'DELETE') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const inventoryId = await fetchInventoryId(req);

        await prisma.products.delete({
            where: { id: Number(params.id) },
        });

        await prisma.inventoryTimeline.deleteMany({
            where: { productId: Number(params.id), inventorySectionId: inventoryId },
        });

        return new Response(`Product with ID: ${params.id} deleted successfully`, { status: 204 });
    } catch (error) {
        console.error('Error deleting product:', error);
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
