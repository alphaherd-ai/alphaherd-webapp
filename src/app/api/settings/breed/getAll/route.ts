import { NextRequest } from "next/server"
import prismaClient from "../../../../../../prisma";

export const GET = async(req: NextRequest)=>{
    if(req.method!=='GET'){
        return new Response('Method not allowed',{status:405});
    }
    try{
        const breed = await prismaClient.breed.findMany({
            include: {
                species: true,
            },
        });
        return new Response(JSON.stringify(breed),{
            status:200,
            headers:{
                'Content-Type':'application/json',
            },
        });
    }catch(error){
        console.log('Error fetching data',error);
        return new Response('Internal server error',{
            status:500
        });
    }finally{
        await prismaClient.$disconnect();
    }
}