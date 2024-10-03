import prismaClient from '../../../../../../../prisma/index';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest,{params}:{params:{id:Number}}) => {
    if (req.method !== 'GET') {
        return new Response('Method not allowed',{status:405});
    }
    
    try {
        const inventoryId = await fetchInventoryId(req);

        const timeline = await prismaClient.products.findMany({
            where: {
              id: Number(params.id),
              inventorySectionId:inventoryId
            },
            include:{
                productBatches:{
                    include:{
                        items:true,
                        inventoryTimeline: {
                            include:{
                                productBatch:{
                                    select:{
                                        batchNumber:true
                                    }
                                }
                            },
                            orderBy:{
                                createdAt:'desc'
                            }
                        }
                    }
                }

            }

          });
        return new Response(JSON.stringify(timeline), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    catch (error) {

        console.error(error)
        return new Response("Internal server error", { status: 500 });
    } finally {
        await prismaClient.$disconnect();
    }
}