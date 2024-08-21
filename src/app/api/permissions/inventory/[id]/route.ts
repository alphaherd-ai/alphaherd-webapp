import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { Stock } from '@prisma/client';
import { productSchema } from '@/schemas/inventory/productValidation';
import { NextRequest } from 'next/server';
import prismaClient from '../../../../../../prisma/index';

// export const GET=async (req: NextRequest,
//     { params }: { params: {id: number; } } )=> {
//         if (req.method !== 'GET') {
//             return new Response('Method not allowed',{status:405});
//         } 
//         try {
//             const inventoryId = await fetchInventoryId(req);
            
//            const product= await prisma.products.findUnique({
//                 where: { id: Number(Number(params.id)),inventorySectionId:inventoryId,isApproved:true},
//                 include:{
//                     productBatches:true
//                 }
//             });
//             return new Response(JSON.stringify(product), {
//                 status: 201,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//         } catch (error) {
//             console.error(error)
//             return new Response( "Internal server error",{status:500});
//         } finally {
//             await prisma.$disconnect();
//         }
// }

export const PUT=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'PUT') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            // const inventoryId = await fetchInventoryId(req);
            
            const { stockStatus,invoiceType,...body}=await req.json();
            const result= await prismaClient.$transaction(async (prisma)=>{
                const inventoryPromise= prisma.inventoryTimeline.update({
                    where:{
                        id:body.inventoryId
                    },
                    data:{
                        isApproved:true
                    }
                });
                 const productPromise=prisma.products.update({
                    where:{
                        id:body.productId
                    },
                    data:{
                        isApproved:true
                    }
                });
                const productBatchPromise= prisma.productBatch.update({
                    where:{
                        id:body.productBatchId
                    },
                    data:{
                        isApproved:true
                    }
                })
                const [product,inventory,productBatch]= await Promise.all([productPromise,inventoryPromise,productBatchPromise]);
               return {product,productBatch,inventory};
            });
           
            return new Response(JSON.stringify(result), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });   
            
        } catch (error) {
            console.error(error)
            return new Response( "Internal server error",{status:500});
        } finally {
            await prisma.$disconnect();
        }
}

export const DELETE=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {
    if (req.method !== 'DELETE') {
                return new Response('Method not allowed',{status:405});
            } 
            try {
                const inventoryId = await fetchInventoryId(req);
                
                await prisma.products.delete({
                    where: {id: Number(params.id) },
                });
                await  prisma.inventoryTimeline.deleteMany({
                    where:{productId:Number(params.id),inventorySectionId:inventoryId}
                });
            return new Response(`Product with id: ${Number(params.id)} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prisma.$disconnect();
            }
  }