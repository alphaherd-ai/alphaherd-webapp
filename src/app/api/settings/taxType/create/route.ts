import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";
import { fetchInventoryId } from "@/utils/fetchBranchDetails";

export const POST = async(req: NextRequest)=>{
    if(req.method!=='POST'){
        return new Response('Method not allowed', {status: 405});
    }
    try {
        const inventoryId = await fetchInventoryId(req);
        const body = await req.json();
        const taxType = await prismaClient.taxType.create({
            data: {
                ...body,
                InventorySection: {
                    connect: {id: inventoryId}
                },
            },
        });
        
        return new Response(JSON.stringify(taxType),{
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify(error));
    }finally{
        await prismaClient.$disconnect();
    }
}
