// import { connectToDB } from '../../../../../../utils/index';
// import prismaClient from '../../../../../../../prisma';
// import { Inventory, Stock } from '@prisma/client';
// import { fetchInventoryId } from '@/utils/fetchBranchDetails';
// import { ProductBatchSchema } from '@/schemas/inventory/ productBatchValidation';
// import { NextRequest } from 'next/server';

// export const GET = async (req: NextRequest, { params }: { params: { id: number } }) => {
//     if (req.method !== 'GET') {
//         return new Response('Method not allowed', { status: 405 });
//     }
//     try {
//         const inventoryId = await fetchInventoryId(req);

//         const productBatch = await prismaClient.productBatch.findUnique({
//             where: { 
//                 id: Number(params.id), 
//                 inventorySectionId: inventoryId, 
//                 isApproved: true 
//             },
//             include: { // Include location in the result
//                 product: true,
//             },
//         });

//         return new Response(JSON.stringify(productBatch), {
//             status: 200,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     } catch (error) {
//         return new Response("Internal server error", { status: 500 });
//     } finally {
//         await prismaClient.$disconnect();
//     }
// };

// export const PUT = async (req: NextRequest, { params }: { params: { id: number } }) => {
//     if (req.method !== 'PUT') {
//         return new Response('Method not allowed', { status: 405 });
//     }

//     try {
//         console.log('Incoming PUT Request:', { url: req.url, params });

//         // Fetch inventory ID
//         const inventoryId = await fetchInventoryId(req);
//         console.log('Fetched Inventory ID:', inventoryId);

//         // Parse request body
//         const body = await req.json();
//         console.log('Request Body:', body);

//         const { isApproved, productId, stockStatus, invoiceType, location, ...rest } = body;
//         console.log("Parsed Body is:", body);

//         // Validate required fields
//         if (!productId || !rest.quantity || !inventoryId) {
//             throw new Error("Missing required fields: productId, quantity, or inventoryId.");
//         }

//         const decrementQuantity = rest.quantity || 0;
//         if (decrementQuantity <= 0) {
//             throw new Error("Invalid quantity for decrement.");
//         }

//         // Fetch existing product batch
//         const productBatch = await prismaClient.productBatch.findUnique({
//             where: { id: Number(params.id) },
//         });

//         if (!productBatch) {
//             throw new Error(`Product Batch with ID ${params.id} not found.`);
//         }
//         console.log('Existing Product Batch:', productBatch);

//         // Update product details
//         const product = await prismaClient.products.update({
//             where: { id: productId, inventorySectionId: inventoryId },
//             data: {
//                 totalQuantity: {
//                     decrement: decrementQuantity, // Ensure quantity is valid
//                 },
//                 location: location || undefined, // Update location if provided
//             },
//         });

//         console.log('Updated Product:', product);

//         // Update product batch details
//         // const updateItem = await prismaClient.productBatch.update({
//         //     where: { id: Number(params.id) },
//         //     data: {
//         //         ...rest,
//         //         location: location || undefined,
//         //         quantity: Math.max((productBatch.quantity || 0) - decrementQuantity, 0), // Prevent negative quantity
//         //         isApproved,
//         //     },
//         // });

//         // console.log('Updated Product Batch:', updateItem);

//         // Create inventory timeline entry
//         const inventory = await prismaClient.inventoryTimeline.create({
//             data: {
//                 stockChange: stockStatus,
//                 invoiceType: invoiceType,
//                 quantityChange: decrementQuantity,
//                 inventoryType: Inventory.Product,
//                 isApproved: isApproved,
//                 productBatch: {
//                     connect: {
//                         id: Number(params.id),
//                     },
//                 },
//                 InventorySection: {
//                     connect: {
//                         id: inventoryId,
//                     },
//                 },
//             },
//         });

//         console.log('Inventory Timeline Entry:', inventory);

//         return new Response(JSON.stringify({ inventory, product }), {
//             status: 201,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     } catch (error) {
//         console.error('Error in PUT route:', error);
//         return new Response('Internal server error', { status: 500 });
//     } finally {
//         await prismaClient.$disconnect();
//     }
// };


// export const DELETE = async (req: NextRequest, { params }: { params: { id: number } }) => {
//     if (req.method !== 'DELETE') {
//         return new Response('Method not allowed', { status: 405 });
//     }
//     try {
//         const inventoryId = await fetchInventoryId(req);
//         await prismaClient.productBatch.delete({
//             where: { id: Number(params.id), inventorySectionId: inventoryId },
//         });

//         return new Response(`Product with id: ${Number(params.id)} Deleted Successfully`, { status: 201 });
//     } catch (error) {
//         return new Response("Internal server error", { status: 500 });
//     } finally {
//         await prismaClient.$disconnect();
//     }
// };

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
            // const validatedData = ProductBatchSchema.safeParse(data);
      
            // if (!validatedData.success) {
            //   return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
            //     status: 422,
            //   });
            // }
           const productBatch= await prismaClient.productBatch.findUnique({
                where: { id: Number(params.id) },
            });  
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
                where: { id: Number(params.id),inventorySectionId:inventoryId },
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
                        id:Number(params.id)
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