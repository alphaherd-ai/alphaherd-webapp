import prismaClient from '../../../../../../prisma';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { NextRequest } from 'next/server';

export const PUT=async (req: NextRequest,
    { params }: { params: {id: number; } } )=> {

        if (req.method !== 'PUT') {
            return new Response('Method not allowed',{status:405});
        } 
        try {
            const body = await req.json();
            const {name,phoneNo,altPhoneNo,email,imageUrl}= body;
            // console.log("this is imageUrl",imageUrl)
         const user = await prismaClient.user.update({
            where:{
                id:Number(params.id)
            },
            data:{
                name,
                phoneNo,
                altPhoneNo,
                email,
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
            console.log("here");
            console.error(error);
            return new Response("Internal server error", { status: 500 });
        } finally {
            await prismaClient.$disconnect();
        }
    }