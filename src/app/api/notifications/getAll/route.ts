import { connectToDB } from '../../../../utils/index';
import prismaClient from '../../../../../prisma';
import { NextRequest } from 'next/server';


export const GET=async(req: NextRequest,res:Response)=> {
  if (req.method !== 'GET') {
    return new Response('Method not allowed',{status:405});
} 
    try { 
        const url= req.nextUrl
        const { searchParams } = new URL(url);
        const orgId = searchParams.get("orgId")!;  
        const allNotifs= await prismaClient.notifications.findMany({where:{
          orgId:Number(orgId),
        },orderBy:[{
          createdAt:'asc'
        }]})
        const newNotifs = allNotifs.filter((notif)=>notif.isRead===false) 
        return new Response(JSON.stringify({newNotifs,allNotifs}), {
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