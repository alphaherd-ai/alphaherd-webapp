import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";

export const POST = async(req: NextRequest)=>{
    if(req.method!=='POST'){
        return new Response('Method not allowed', {status: 400});
    }
    try{
        const body = await req.json();
        const species = await prismaClient.species.create({
            data: {
                ...body
            },
        });
        return new Response(JSON.stringify(species),{
            status: 201,
            headers:{
                'Content-Type': 'application/json',
            }
        })
    }catch(error){
        console.log(error);
        return new Response(JSON.stringify(error));
    }finally{
        await prismaClient.$disconnect();
    }
}