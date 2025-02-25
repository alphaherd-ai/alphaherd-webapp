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
        const invoice = params.invoice;
        
        //console.log(receiptNo);
        if (otherData.amountPaid) {
            otherData.amountPaid = parseInt(otherData.amountPaid, 10); 
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


        if(invoice.startsWith('SI')){
            const exsistingInvoice=await prismaClient.sales.findFirst({
                where:{
                    invoiceNo:invoice
                }
            })
            let statusString = exsistingInvoice?.status?.split('₹')[0]?.trim().replace(/:$/, '');
            let balanceDue=Number(exsistingInvoice?.status?.split('₹')[1]);
            balanceDue=statusString==='You’re owed' ? balanceDue : -1*balanceDue;
            const balanceStatus = balanceDue && (balanceDue + (CheckRecordTransaction?.moneyChange === 'In' ? Number(CheckRecordTransaction?.amountPaid) : -Number(CheckRecordTransaction?.amountPaid)) + (otherData.moneyChange === 'In' ? -1 * Number(otherData.amountPaid) : Number(otherData.amountPaid)));
            const status = invoice.includes('SI') || invoice.includes('PR') ? balanceStatus && (balanceStatus >= 1 ? `You’re owed: ₹${parseFloat((balanceStatus).toFixed(2))}` : balanceStatus <= -1 ? `You owe: ₹${parseFloat((-1 * balanceStatus).toFixed(2))}` : 'Closed') : balanceStatus <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceStatus).toString()).toFixed(2)}` : balanceStatus >= 1 ? `You owe: ₹${parseFloat((balanceStatus).toString()).toFixed(2)}` : 'Closed';
            exsistingInvoice && await prismaClient.sales.update({
                where:{
                    id:exsistingInvoice.id
                },
                data:{
                    status:status || ''
                }
            })

        }


        else if(invoice.startsWith('EXP')){
            const exsistingInvoice=await prismaClient.expenses.findFirst({
                where:{
                    invoiceNo:invoice
                }
            })
            let statusString = exsistingInvoice?.status?.split('₹')[0]?.trim().replace(/:$/, '');
            let balanceDue=Number(exsistingInvoice?.status?.split('₹')[1]);
            balanceDue=statusString==='You’re owed' ? balanceDue : -1*balanceDue;
            const balanceStatus = balanceDue && (balanceDue + (CheckRecordTransaction?.moneyChange === 'In' ? Number(CheckRecordTransaction?.amountPaid) : -Number(CheckRecordTransaction?.amountPaid)) + (otherData.moneyChange === 'In' ? -1 * Number(otherData.amountPaid) : Number(otherData.amountPaid)));
            const status = invoice.includes('EXP') ? balanceStatus && (balanceStatus >= 1 ? `You’re owed: ₹${parseFloat((balanceStatus).toFixed(2))}` : balanceStatus <= -1 ? `You owe: ₹${parseFloat((-1 * balanceStatus).toFixed(2))}` : 'Closed') : balanceStatus <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceStatus).toString()).toFixed(2)}` : balanceStatus >= 1 ? `You owe: ₹${parseFloat((balanceStatus).toString()).toFixed(2)}` : 'Closed';
            console.log(balanceDue,balanceStatus,CheckRecordTransaction?.moneyChange,CheckRecordTransaction?.amountPaid);
            exsistingInvoice && await prismaClient.expenses.update({
                where:{
                    id:exsistingInvoice.id
                },
                data:{
                    status:status || ''
                }
            })

        }

        else if(invoice.startsWith('PR')){
            const exsistingInvoice=await prismaClient.purchases.findFirst({
                where:{
                    invoiceNo:invoice
                }
            })
            let statusString = exsistingInvoice?.status?.split('₹')[0]?.trim().replace(/:$/, '');
            let balanceDue=Number(exsistingInvoice?.status?.split('₹')[1]);
            balanceDue=statusString==='You’re owed' ? balanceDue : -1*balanceDue;
            const balanceStatus = balanceDue && (balanceDue + (CheckRecordTransaction?.moneyChange === 'In' ? Number(CheckRecordTransaction?.amountPaid) : -Number(CheckRecordTransaction?.amountPaid)) + (otherData.moneyChange === 'In' ? -1 * Number(otherData.amountPaid) : Number(otherData.amountPaid)));
            const status = invoice.includes('SI') || invoice.includes('PR') ? balanceStatus && (balanceStatus >= 1 ? `You’re owed: ₹${parseFloat((balanceStatus).toFixed(2))}` : balanceStatus <= -1 ? `You owe: ₹${parseFloat((-1 * balanceStatus).toFixed(2))}` : 'Closed') : balanceStatus <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceStatus).toString()).toFixed(2)}` : balanceStatus >= 1 ? `You owe: ₹${parseFloat((balanceStatus).toString()).toFixed(2)}` : 'Closed';
            exsistingInvoice && await prismaClient.purchases.update({
                where:{
                    id:exsistingInvoice.id
                },
                data:{
                    status:status || ''
                }
            })
        }

        else if(invoice.startsWith('SR')){
            const exsistingInvoice=await prismaClient.sales.findFirst({
                where:{
                    invoiceNo:invoice
                }
            })
            let statusString = exsistingInvoice?.status?.split('₹')[0]?.trim().replace(/:$/, '');
            let balanceDue=Number(exsistingInvoice?.status?.split('₹')[1]);
            balanceDue=statusString==='You’re owed' ? -1*balanceDue : balanceDue;
            const balanceStatus = balanceDue && (balanceDue + (CheckRecordTransaction?.moneyChange === 'In' ? -Number(CheckRecordTransaction?.amountPaid) : Number(CheckRecordTransaction?.amountPaid)) + (otherData.moneyChange === 'In' ? Number(otherData.amountPaid) : -Number(otherData.amountPaid))) 
            const status = invoice.includes('SI') || invoice.includes('PR') ? balanceStatus && (balanceStatus >= 1 ? `You’re owed: ₹${parseFloat((balanceStatus).toFixed(2))}` : balanceStatus <= -1 ? `You owe: ₹${parseFloat((-1 * balanceStatus).toFixed(2))}` : 'Closed') : balanceStatus <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceStatus).toString()).toFixed(2)}` : balanceStatus >= 1 ? `You owe: ₹${parseFloat((balanceStatus).toString()).toFixed(2)}` : 'Closed';
            exsistingInvoice && await prismaClient.sales.update({
                where:{
                    id:exsistingInvoice.id
                },
                data:{
                    status:status || ''
                }
            })
        }

        

        else if(invoice.startsWith('PI') || invoice.startsWith('PO')){
            const exsistingInvoice=await prismaClient.purchases.findFirst({
                where:{
                    invoiceNo:invoice
                }
            })
            let statusString = exsistingInvoice?.status?.split('₹')[0]?.trim().replace(/:$/, '');
            let balanceDue=Number(exsistingInvoice?.status?.split('₹')[1]);
            //console.log(statusString);
            balanceDue=(statusString==='You’re owed') ? -1*balanceDue : balanceDue;
            const balanceStatus = balanceDue && (balanceDue + (CheckRecordTransaction?.moneyChange === 'In' ? -Number(CheckRecordTransaction?.amountPaid) : Number(CheckRecordTransaction?.amountPaid)) + (otherData.moneyChange === 'In' ? Number(otherData.amountPaid) : -Number(otherData.amountPaid))) 
            //console.log(balanceDue,balanceStatus);
            const status = invoice.includes('SI') || invoice.includes('PR') ? balanceStatus && (balanceStatus >= 1 ? `You’re owed: ₹${parseFloat((balanceStatus).toFixed(2))}` : balanceStatus <= -1 ? `You owe: ₹${parseFloat((-1 * balanceStatus).toFixed(2))}` : 'Closed') : balanceStatus <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceStatus).toString()).toFixed(2)}` : balanceStatus >= 1 ? `You owe: ₹${parseFloat((balanceStatus).toString()).toFixed(2)}` : 'Closed';
            exsistingInvoice && await prismaClient.purchases.update({
                where:{
                    id:exsistingInvoice.id
                },
                data:{
                    status:status || ''
                }
            })
        }
        
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