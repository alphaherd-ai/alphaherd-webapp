import prismaClient from '../../../../../../../prisma';
import { NextRequest } from 'next/server';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';

export const PUT = async (req: NextRequest, { params }: { params: { id: number } }) => {

    console.log("I am in paymentTransaction");
    if (req.method !== 'PUT') {
      return new Response('Method not allowed', { status: 405 });
    }
    
  
    try {
      const financeId=await fetchFinanceId(req);
      const body = await req.json();
      const status=body.status;
      if (body.amountPaid) {
        body.amountPaid = parseInt(body.amountPaid, 10); // Ensure it's an integer
      }
      const updatedRecordTransaction = await prismaClient.recordTransaction.update({
        where: { id: Number(params.id)},
        data: body,
      });
  
      return new Response(JSON.stringify(updatedRecordTransaction), {
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