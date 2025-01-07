import prismaClient from '../../../../../../../prisma';
import { NextRequest } from 'next/server';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';

export const PUT = async (req: NextRequest, { params }: { params: { id: number } }) => {
    if (req.method !== 'PUT') {
      return new Response('Method not allowed', { status: 405 });
    }
    
  
    try {
      const financeId=await fetchFinanceId(req);
      const body = await req.json();
      const status=body.status;
      const purchases = await prismaClient.purchases.update({
        where: { id: Number(params.id),financeSectionId:financeId},
        data: {
          status:status,
        }, 
      });
  
      return new Response(JSON.stringify(purchases), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
        console.error(error)
      return new Response('Internal server error', { status: 500 });
    } finally {
      await prismaClient.$disconnect();
    }
  };