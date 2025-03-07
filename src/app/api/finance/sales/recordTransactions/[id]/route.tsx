import prismaClient from '../../../../../../../prisma';
import { NextRequest } from 'next/server';

export const GET=async(req:NextRequest,{params}:{params:{id:number}})=>{
    if(req.method!=='GET'){
        return new Response('Method not allowed',{status:405});
    }
    try{    
        const transactions=await prismaClient.recordTransaction.findMany({
            where:{
                salesId:Number(params.id)
            }
        })
        return new Response(JSON.stringify(transactions),{status:200});
    }catch(err){
        console.log(err);
        return new Response('An error occured',{status:500});
    }
}