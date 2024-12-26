import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";
import { connect } from "http2";
import { fetchDatabaseId } from "@/utils/fetchBranchDetails";

export const POST = async (req: NextRequest)=>{
    if(req.method!=='POST'){
        return new Response('Mthod not allowed',{status: 405});
    }
    try{
        const body = await req.json();
        const databaseId = await fetchDatabaseId(req);
        if(!body.speciesId){
            return new Response('Species ID is required',{status:400});
        }
        const breed = await prismaClient.breed.create({
            data: {
                name: body.name,
                species: {
                    connect: { id: body.speciesId }, 
                },
                DatabaseSection: {
                    connect : {id: databaseId}
                },
            },
        });
        console.log("breed is : ", breed);
        
        return new Response(JSON.stringify(breed),{
            status: 201,
            headers:{
                'Content-Type':'application/json',
            }
        });
    }catch(error){
        console.log('Error creating breed: ',error);
        return new Response(JSON.stringify(error));
    }finally{
        await prismaClient.$disconnect();
    }
}