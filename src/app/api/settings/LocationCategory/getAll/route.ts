import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";
import { fetchInventoryId } from "@/utils/fetchBranchDetails";
export const GET = async(req:NextRequest)=>{
    console.log("get location called");
    if(req.method!=='GET'){
        return new Response('Method not allowed',{status:405});
    }
    try {
        const inventoryId= await fetchInventoryId(req);
        const itemCategory = await prismaClient.location.findMany({
            where:{
              inventorySectionId:inventoryId
            },
          });
        return new Response(JSON.stringify(itemCategory),{
            status: 201,
            headers: {
                'Content-Type':'application/json',
            }
        });
    } catch (error) {
        console.log('Error fetching location',error);
        return new Response('Internal server error', {status:500});
    }finally{
        await prismaClient.$disconnect();
    }
}