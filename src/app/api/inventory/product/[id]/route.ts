import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';

export const GET=async (req: Request,
    { params }: { params: {id: string; } } )=> {

        if (req.method !== 'GET') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            await connectToDB();
           const product= await prisma.allProducts.findUnique({
                where: { id: params.id },
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
            await prisma.$disconnect();
        }
}

export const PUT=async (req: Request,
    { params }: { params: {id: string; } } )=> {

        if (req.method !== 'PUT') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            await connectToDB();
            const { stockStatus,invoiceType,...body}=await req.json();
           const product= await prisma.allProducts.findUnique({
                where: { id: params.id },
            });  
            const inventory = await prisma.inventory.create({
                data: {
                    allProductsId:params.id,
                    stockChange:stockStatus,
                    invoiceType:invoiceType,
                    quantityChange: Math.abs((product?.quantity || 0) - (body.quantity || 0))
                }
            });
            const updateItem = await prisma.allProducts.update({
                where: { id: params.id },
                data: body
            });
            return new Response(JSON.stringify({ updateItem, inventory }), {
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
    { params }: { params: {id: string; } } )=> {
    if (req.method !== 'DELETE') {
                return new Response('Method not allowed',{status:405});
            } 
            try {
                await connectToDB();
                await prisma.allProducts.delete({
                    where: {id: params.id },
                });
                await  prisma.inventory.deleteMany({
                    where:{allProductsId:params.id}
                });
            return new Response(`Product with id: ${params.id} Deleted Successfully`,{status:201})
            } catch (error) {
                return new Response( "Internal server error",{status:500});
            } finally {
                await prisma.$disconnect();
            }
  }