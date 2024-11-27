import prismaClient from '../../../../../prisma';
import { NextRequest } from 'next/server';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';

export const POST = async (req: NextRequest) => {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }
    try {
        const body = await req.json();
        const financeId = await fetchFinanceId(req);
        if (body.financeType === 'sales') {
            const sales = await prismaClient.sales.findFirst({
                where: {
                    financeSectionId: financeId,
                    invoiceNo: body.invoice
                }
            })
            return new Response(JSON.stringify(sales), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        else if (body.financeType === 'purchase') {
            const purchase = await prismaClient.purchases.findFirst({
                where: {
                    financeSectionId: financeId,
                    invoiceNo: body.invoice
                }
            })
            return new Response(JSON.stringify(purchase), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

    } catch (error) {
        console.error(error)
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prismaClient.$disconnect();
    }
}