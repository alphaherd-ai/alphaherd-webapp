import prismaClient from '../../../../../../../prisma';
import { NextRequest } from 'next/server';


export const PUT = async (req: NextRequest, { params }: { params: { invoice: string } }) => {


    if (req.method !== 'PUT') {
        return new Response('Method not allowed', { status: 405 });
    }


    try {

        const body = await req.json();
        const data = body.recordTransaction[0];
        const { receiptNo, ...otherData } = data;
        if (otherData.amountPaid) {
            otherData.amountPaid = parseInt(otherData.amountPaid, 10); // Ensure it's an integer
        }


        const CheckRecordTransaction = await prismaClient.recordTransaction.findFirst({
            where: {
                receiptNo: receiptNo
            }
        })
        if (!CheckRecordTransaction) {
            return new Response('Record Transaction not found', { status: 404 });
        }
        const updatedRecordTransaction = await prismaClient.recordTransaction.update({
            where: { id: CheckRecordTransaction.id },
            data: otherData,
        })
        return new Response(JSON.stringify(updatedRecordTransaction), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        })



    } catch (error) {
        console.error(error)
        return new Response('Internal server error', { status: 500 });
    }

    finally {
        await prismaClient.$disconnect();
    }
};