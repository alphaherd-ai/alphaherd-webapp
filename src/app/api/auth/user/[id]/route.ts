import prismaClient from '../../../../../../prisma';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { NextRequest } from 'next/server';

export const PUT=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'PUT') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const imageUrl= await req.json();
            console.log("this is imageUrl",imageUrl)
         const user =prismaClient.user.update({
            where:{
                id:Number(params.id)
            },
            data:{
              imageUrl:imageUrl
            }
         })
         return new Response(JSON.stringify({ user }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        }catch (error) {
            console.error(error);
            return new Response("Internal server error", { status: 500 });
        } finally {
            await prismaClient.$disconnect();
        }
    }