

import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { Inventory, Stock } from '@prisma/client';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { ProductBatchSchema } from '@/schemas/inventory/ productBatchValidation';
import { NextRequest } from 'next/server';

export const GET=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const inventoryId=await fetchInventoryId(req);
            
           const productBatch= await prismaClient.productBatch.findUnique({
                where: { id: Number(params.id),inventorySectionId:inventoryId, isApproved:true },
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
            await prismaClient.$disconnect();
        }
}

export const PUT=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {
        console.log('Incoming PUT Request:', { url: req.url, params });
        if (req.method !== 'PUT') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            
            const inventoryId=await fetchInventoryId(req);
            console.log('Fetched Inventory ID:', inventoryId);
            const { isApproved,productId,stockStatus,invoiceType,...body}=await req.json();
            console.log("Parsed Body is:", body);
            const data={stockStatus,productId,invoiceType,...body};
            const productBatch= await prismaClient.productBatch.findFirst({
                where: { batchNumber: body.batchNumber },
            });  

            if (!productBatch) {
                throw new Error("Product batch not found");
            }
            
            console.log('Existing Product Batch:', productBatch);
            const product = await prismaClient.products.update({
                where:{id:productId,inventorySectionId:inventoryId},
                data:{
                    totalQuantity:{
                        decrement:body.quantity
                    },
                }
            })
            console.log('Updated Product:', product);
            const updateItem = await prismaClient.productBatch.update({
                where: { id:productBatch.id },
                data: {
                    ...body,
                    quantity:Math.abs((productBatch?.quantity || 0) - (body.quantity || 0)),
                    isApproved:isApproved
                }
            });
            console.log('Updated Product Batch:', updateItem);

        
            const inventory = await prismaClient.inventoryTimeline.create({
                data: {
                    
                    stockChange:stockStatus,
                    invoiceType:invoiceType,
                    quantityChange:body.quantity,
                    inventoryType:Inventory.Product,
                    isApproved:isApproved,
                    productBatch:{
                     connect:{
                        id:productBatch.id
                     }
                    },
                    InventorySection:{
                     connect:{
                        id:inventoryId
                     }
                    }
                }
            });
            console.log('Inventory Timeline Entry:', inventory);
            return new Response(JSON.stringify({ inventory,product,productBatch }), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });   
            
        } catch (error) {
            console.error('Error in PUT route:', error);
            return new Response( "Internal server error",{status:500});
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
                
                const inventoryId=await fetchInventoryId(req);
                await prismaClient.productBatch.delete({
                    where: {id: Number(params.id),inventorySectionId:inventoryId },
                });
               
            return new Response(`Product with id: ${Number(params.id)} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prismaClient.$disconnect();
            }
  }