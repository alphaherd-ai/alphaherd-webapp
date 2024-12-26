import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { NextRequest } from 'next/server';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';

export const PUT = async (req: NextRequest, { params }: { params: { id: number } }) => {
  if (req.method !== 'PUT') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const financeId = await fetchFinanceId(req); // Fetch finance ID for validation
    const body = await req.json(); // Parse the request body
    //const { email } = body;
    const { id, email } = body;
    console.log("body is ",body);

    if (!email || email.trim() === '' ) {
      return new Response('Email is required', { status: 400 });
    }

    // Update the email in the database
    const updatedSales = await prismaClient.sales.update({
      where: { id , financeSectionId: financeId },
      data: {
        email, // Update the email field
      },
    });

    return new Response(JSON.stringify(updatedSales), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating email:', error);
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
