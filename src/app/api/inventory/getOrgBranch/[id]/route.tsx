import prismaClient from '../../../../../../prisma';
import { NextRequest } from 'next/server';

export const GET=async (req:NextRequest, {params}:{params:{id:Number}})=>{
    if (req.method !== 'GET') {
        return new Response('Method not allowed',{status:405});
    }
    
    try {
        const id = Number(params?.id);
        console.log(id);
        const orgBranch = await prismaClient.organization.findUnique({
            where:{
                id:Number(id)
            },
            include:{
                orgBranches:true
            }
        });
        return new Response(JSON.stringify(orgBranch), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify(error));
    } finally {
        await prismaClient.$disconnect();
    }
}

