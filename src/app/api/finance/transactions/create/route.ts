import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import type { Transactions } from "@prisma/client";
import { NextRequest } from 'next/server';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';

export const POST = async (req: NextRequest, { params }: { params: { type: string } }) => {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }
    try {
        const body = await req.json();
        const financeId = await fetchFinanceId(req);
        const invoice = body.invoiceLink;
        if (invoice.startsWith('SI')) {
            const exsistingInvoice = await prismaClient.sales.findFirst({
                where: {
                    invoiceNo: invoice
                }
            })

            let statusString = exsistingInvoice?.status?.split('₹')[0]?.trim().replace(/:$/, '');
            let balanceDue = Number(exsistingInvoice?.status?.split('₹')[1]);
            balanceDue = statusString === 'You’re owed' ? balanceDue : -1 * balanceDue;
            const balanceStatus = balanceDue &&  balanceDue + (body.moneyChange === 'In' ? -1 * Number(body.amountPaid) : Number(body.amountPaid));
            const status = invoice.includes('SI') || invoice.includes('PR') ? balanceStatus && (balanceStatus >= 1 ? `You’re owed: ₹${parseFloat((balanceStatus).toFixed(2))}` : balanceStatus <= -1 ? `You owe: ₹${parseFloat((-1 * balanceStatus).toFixed(2))}` : 'Closed') : balanceStatus <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceStatus).toString()).toFixed(2)}` : balanceStatus >= 1 ? `You owe: ₹${parseFloat((balanceStatus).toString()).toFixed(2)}` : 'Closed';
            exsistingInvoice && await prismaClient.sales.update({
                where: {
                    id: exsistingInvoice.id
                },
                data: {
                    status: status || ''
                }
            })
        }

        else if (invoice.startsWith('PR')) {
            const exsistingInvoice = await prismaClient.purchases.findFirst({
                where: {
                    invoiceNo: invoice
                }
            })
            let statusString = exsistingInvoice?.status?.split('₹')[0]?.trim().replace(/:$/, '');
            let balanceDue = Number(exsistingInvoice?.status?.split('₹')[1]);
            balanceDue = statusString === 'You’re owed' ? balanceDue : -1 * balanceDue;
            const balanceStatus = balanceDue &&  balanceDue + (body.moneyChange === 'In' ? -1 * Number(body.amountPaid) : Number(body.amountPaid));
            const status = invoice.includes('SI') || invoice.includes('PR') ? balanceStatus && (balanceStatus >= 1 ? `You’re owed: ₹${parseFloat((balanceStatus).toFixed(2))}` : balanceStatus <= -1 ? `You owe: ₹${parseFloat((-1 * balanceStatus).toFixed(2))}` : 'Closed') : balanceStatus <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceStatus).toString()).toFixed(2)}` : balanceStatus >= 1 ? `You owe: ₹${parseFloat((balanceStatus).toString()).toFixed(2)}` : 'Closed';
            exsistingInvoice && await prismaClient.purchases.update({
                where: {
                    id: exsistingInvoice.id
                },
                data: {
                    status: status || ''
                }
            })
        }

        else if (invoice.startsWith('SR')) {
            const exsistingInvoice = await prismaClient.sales.findFirst({
                where: {
                    invoiceNo: invoice
                }
            })
            let statusString = exsistingInvoice?.status?.split('₹')[0]?.trim().replace(/:$/, '');
            let balanceDue = Number(exsistingInvoice?.status?.split('₹')[1]);
            balanceDue = statusString === 'You’re owed' ? -1 * balanceDue : balanceDue;
            const balanceStatus = balanceDue && (balanceDue + (body.moneyChange === 'In' ? Number(body.amountPaid) : -Number(body.amountPaid)))
            const status = invoice.includes('SI') || invoice.includes('PR') ? balanceStatus && (balanceStatus >= 1 ? `You’re owed: ₹${parseFloat((balanceStatus).toFixed(2))}` : balanceStatus <= -1 ? `You owe: ₹${parseFloat((-1 * balanceStatus).toFixed(2))}` : 'Closed') : balanceStatus <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceStatus).toString()).toFixed(2)}` : balanceStatus >= 1 ? `You owe: ₹${parseFloat((balanceStatus).toString()).toFixed(2)}` : 'Closed';
            exsistingInvoice && await prismaClient.sales.update({
                where: {
                    id: exsistingInvoice.id
                },
                data: {
                    status: status || ''
                }
            })
        }



        else if (invoice.startsWith('PI') || invoice.startsWith('PO')) {
            const exsistingInvoice = await prismaClient.purchases.findFirst({
                where: {
                    invoiceNo: invoice
                }
            })
            let statusString = exsistingInvoice?.status?.split('₹')[0]?.trim().replace(/:$/, '');
            let balanceDue = Number(exsistingInvoice?.status?.split('₹')[1]);
            //console.log(statusString);
            balanceDue = (statusString === 'You’re owed') ? -1 * balanceDue : balanceDue;
            const balanceStatus = balanceDue && (balanceDue   + (body.moneyChange === 'In' ? Number(body.amountPaid) : -Number(body.amountPaid)))
            const status = invoice.includes('SI') || invoice.includes('PR') ? balanceStatus && (balanceStatus >= 1 ? `You’re owed: ₹${parseFloat((balanceStatus).toFixed(2))}` : balanceStatus <= -1 ? `You owe: ₹${parseFloat((-1 * balanceStatus).toFixed(2))}` : 'Closed') : balanceStatus <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceStatus).toString()).toFixed(2)}` : balanceStatus >= 1 ? `You owe: ₹${parseFloat((balanceStatus).toString()).toFixed(2)}` : 'Closed';
            exsistingInvoice && await prismaClient.purchases.update({
                where: {
                    id: exsistingInvoice.id
                },
                data: {
                    status: status || ''
                }
            })
        }




        const transactions = await prismaClient.transactions.create({
            data: {
                ...body,
                FinanceSection: {
                    connect: { id: financeId },
                }
            },
        });


        return new Response(JSON.stringify(transactions), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // console.log(error)
        return new Response(JSON.stringify(error));
    } finally {
        await prismaClient.$disconnect();
    }
}