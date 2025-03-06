
import prismaClient from '../../../../../prisma';
import { NextRequest } from 'next/server';

export const POST=async(req: NextRequest,res:Response)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const body = await req.json();
      const message=body.message;

      const notifs= await prismaClient.notifications.create({
        data:{
            message:message,
            source:body.source,
            url:body.url,
            orgId:body.orgId,
            data:body.data
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