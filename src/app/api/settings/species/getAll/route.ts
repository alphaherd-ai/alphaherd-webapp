import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";

export const GET = async(req:NextRequest)=>{
    console.log("get species called");
    if(req.method!=='GET'){
        return new Response('Method not allowed',{status:405});
    }
    try {
        const species = await prismaClient.species.findMany();
        console.log("species is :",species);
        return new Response(JSON.stringify(species),{
            status: 201,
            headers: {
                'Content-Type':'application/json',
            }
        });
    } catch (error) {
        console.log('Error fetching species',error);
        return new Response('Internal server error', {status:500});
    }finally{
        await prismaClient.$disconnect();
    }
}