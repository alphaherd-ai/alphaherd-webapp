import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";
import { fetchDatabaseId } from "@/utils/fetchBranchDetails";

export const GET = async(req:NextRequest)=>{
    if(req.method!=='GET'){
        return new Response('Method not allowed',{status:405});
    }
    try {
        const databaseId = await fetchDatabaseId(req);
        const species = await prismaClient.species.findMany({
            where: {
                databaseSectionId: databaseId
            },
        });
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