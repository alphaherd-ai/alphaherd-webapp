import { connectToDB } from '../../../../utils/index';
import prismaClient from '../../../../../prisma';
import { NextRequest } from 'next/server';
import { notifications } from '@/utils/notifications';

export const PUT=async(req: NextRequest,res:Response)=> {
  if (req.method !== 'PUT') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const url= req.nextUrl
      const { searchParams } = new URL(url);
      const orgId = searchParams.get("orgId")!;  
      const notifs= await prismaClient.notifications.updateMany({
        where:{
        isRead:false,
        orgId:Number(orgId)
        },
        data:{
            isRead:true,
            userId:Number(req.headers.get("userId"))
        }
      })
        
        return new Response(JSON.stringify(notifs), {
          status: 201,
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