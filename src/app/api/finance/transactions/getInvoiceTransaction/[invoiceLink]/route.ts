import prismaClient from '../../../../../../../prisma';
import { NextRequest } from 'next/server';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';

export const GET=async(req:NextRequest, { params }: { params: { invoiceLink: string } })=>{
    try{
        const financeId = await fetchFinanceId(req);
        const transactions = await prismaClient.transactions.findMany({
            where: {
                financeSectionId: financeId,
                invoiceLink:params.invoiceLink
            },
            orderBy:{
                date: 'desc',
            }
        });
        return new Response(JSON.stringify(transactions), {
            status:200,
            headers:{
                'Content-Type': 'application/json',
            }
        })
    }catch(err){
        console.log(err);
        return new Response('Internal server error', { status: 500 });
    }
}