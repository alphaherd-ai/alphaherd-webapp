import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { Inventory, Stock } from '@prisma/client';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { ProductBatchSchema } from '@/schemas/inventory/ productBatchValidation';

export const GET=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const inventoryId=await fetchInventoryId(req);
            
           const productBatch= await prismaClient.productBatch.findUnique({
                where: { id: Number(params.id),inventorySectionId:inventoryId },
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

        if (req.method !== 'PUT') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            
            const inventoryId=await fetchInventoryId(req);
            const { productId,stockStatus,invoiceType,...body}=await req.json();
            const data={stockStatus,productId,invoiceType,...body};
            const validatedData = ProductBatchSchema.safeParse(data);
      
            if (!validatedData.success) {
              return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
                status: 422,
              });
            }
           const productBatch= await prismaClient.productBatch.findUnique({
                where: { id: Number(params.id) },
            });  
            const product = await prismaClient.products.update({
                where:{id:productId,inventorySectionId:inventoryId},
                data:{
                    totalQuantity:{
                        decrement:body.quantity
                    }
                }
            })
            const updateItem = await prismaClient.productBatch.update({
                where: { id: Number(params.id),inventorySectionId:inventoryId },
                data: {
                    ...body,
                    quantity:Math.abs((productBatch?.quantity || 0) - (body.quantity || 0))
                }
            });
        
            const inventory = await prismaClient.inventoryTimeline.create({
                data: {
                    
                    stockChange:stockStatus,
                    invoiceType:invoiceType,
                    quantityChange:body.quantity,
                    inventoryType:Inventory.Product,
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
            return new Response(JSON.stringify({ inventory }), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });   
            
        } catch (error) {
            console.error(error)
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