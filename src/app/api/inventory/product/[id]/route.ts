import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { productSchema } from '@/schemas/inventory/productValidation';
import { NextRequest } from 'next/server';
import prismaClient from '../../../../../../prisma/index';
import { Prisma } from '@prisma/client';

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

export const PUT=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {
        
        if (req.method !== 'PUT') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const inventoryId = await fetchInventoryId(req);
            const productId = Number(params.id);
            const body=await req.json();
            const validatedData = productSchema.safeParse(body);

            // if (!validatedData.success) {
            //   return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
            //     status: 422,
            //   });
            // }
            

           const product= await prismaClient.products.update({
                where: { id: Number(params.id),inventorySectionId:inventoryId },
                data:body,
            });   
            
            
            return new Response(JSON.stringify(product), {
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


export const DELETE = async (req: NextRequest, { params }: { params: { id: number } }) => {
    // console.log("I am here in backend");

    if (req.method !== 'DELETE') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const productId = Number(params.id);
        const inventoryId = await fetchInventoryId(req);
        // Check if the product exists
        const product = await prisma.products.update({
            where: { id: productId,inventorySectionId:inventoryId },
            data:{
                isDeleted:true
            }
        });

        if (!product) {
            return new Response(`Product with ID: ${productId} not found`, { status: 404 });
        }

        // Fetch inventory ID and delete related records
        
        //console.log("Inventory ID is:", inventoryId);

        

        

        

        // Return 204 with no response body
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error('Error deleting product:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return new Response(
                `Failed to delete product with ID: ${params.id}. The record does not exist.`,
                { status: 404 }
            );
        }

        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};




