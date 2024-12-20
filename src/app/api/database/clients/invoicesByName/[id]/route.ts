import prismaClient from "../../../../../../../prisma";
import { NextRequest } from "next/server";
import { fetchFinanceId } from '@/utils/fetchBranchDetails';

export const GET=async(req:NextRequest,{params}:{params:{id:number}})=>{
    try{
        if(req.method!=='GET'){
            return new Response('Method not allowed',{status:405});
        }
        const invoices=await prismaClient.sales.findMany({
            where:{
                clientId:Number(params.id)
            }
        })
        return new Response(JSON.stringify(invoices),{
            status:200,
            headers:{
                'Content-Type':'application/json'
            }
        })

    }catch(e){
        console.log(e)
        return new Response('Internal server error',{status:500});
    }
    finally{
        await prismaClient.$disconnect();
    }
}