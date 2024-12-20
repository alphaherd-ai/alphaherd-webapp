import prismaClient from "../../../../../../../prisma";
import { NextRequest } from "next/server";

export const POST=async(req: NextRequest)=>{
    const {invoiceData}=await req.json();
    try{
        const invoice=await prismaClient.inventorytransfer.create({
            data:invoiceData
        })
        if(invoice){
            return new Response(JSON.stringify(invoice),{status:201,headers:{'Content-Type':'application/json'}});
        }
    }catch(error){
        return new Response("Internal server error",{status:500});
    }
    finally{
        await prismaClient.$disconnect();
    }
}