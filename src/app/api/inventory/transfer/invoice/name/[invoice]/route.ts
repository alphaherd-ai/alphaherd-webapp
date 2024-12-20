import prismaClient from "../../../../../../../../prisma";
import { NextRequest } from "next/server";

export const GET=async(req: NextRequest,{params}:{params:{invoice:string}})=> {
    if (req.method !== 'GET') {
        return new Response('Method not allowed',{status:405});
    }
    console.log(params.invoice);
    try{
        const invoice=await prismaClient.inventorytransfer.findFirst({
            where:{
                invoiceNumber:params.invoice
            },
            
        })
        if(invoice){
            return new Response(JSON.stringify(invoice),{status:200});
        }
    }catch(error){
        return new Response("Internal server error",{status:500});
    }
    finally{
        await prismaClient.$disconnect();
    }
}