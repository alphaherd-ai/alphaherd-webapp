import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { Stock } from '@prisma/client';
import { productSchema } from '@/schemas/inventory/productValidation';

export const GET=async (req: Request,
    { params }: { params: {id: number; } } )=> {
        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const inventoryId = await fetchInventoryId();
            await connectToDB();
           const product= await prisma.products.findUnique({
                where: { id: Number(Number(params.id)),inventorySectionId:inventoryId},
                include:{
                    productBatches:true
                }
            });
            return new Response(JSON.stringify(product), {
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

export const PUT=async (req: Request,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'PUT') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const inventoryId = await fetchInventoryId();
            await connectToDB();
            const { stockStatus,invoiceType,...body}=await req.json();
            const validatedData = productSchema.safeParse(body);

            if (!validatedData.success) {
              return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
                status: 422,
              });
            }
           const product= await prisma.productBatch.update({
                where: { id: Number(params.id),inventorySectionId:inventoryId},
                data:body
            });  
            
           
          
            return new Response(JSON.stringify({ product }), {
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

export const DELETE=async (req: Request,
    { params }: { params: {id: number; } } )=> {
    if (req.method !== 'DELETE') {
                return new Response('Method not allowed',{status:405});
            } 
            try {
                const inventoryId = await fetchInventoryId();
                await connectToDB();
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