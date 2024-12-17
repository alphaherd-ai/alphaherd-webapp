import prismaClient from "../../../../../../../prisma";
import { NextRequest } from "next/server";

export const GET=async(req: NextRequest,{params}:{params:{id:number}})=> {
    if (req.method !== 'GET') {
        return new Response('Method not allowed',{status:405});
    }
    //console.log(params.id);
    try{
        const invoice=await prismaClient.inventorytransfer.findUnique({
            where:{
                id:Number(params.id)
            },
            
        })
        if(invoice){
            return new Response(JSON.stringify(invoice),{status:200});
        }
    }catch(error){
        console.log(error);
        return new Response("Internal server error",{status:500});
    }
    finally{
        await prismaClient.$disconnect();
    }
}