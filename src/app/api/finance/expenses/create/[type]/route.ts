import { NextRequest } from 'next/server';
import prismaClient from '../../../../../../../prisma';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';
//import { recurringExpenses } from '@/lib/bull';
import { calculateNextOccurrence } from '@/utils/calculateNextOccurrence';
import { FinanceCreationType } from '@prisma/client';

export const POST = async (req: NextRequest, { params }: { params: { type: FinanceCreationType } }) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const financeId = await fetchFinanceId(req);

    const expense = await prismaClient.expenses.create({
      data: {
        ...body,
        FinanceSection: {
          connect: { id: financeId },
        },
      },
    });

    if (body.items && body.items.length > 0) {
      await prismaClient.items.createMany({
        data: body.items.map(async (item: any) => ({
          ...item,
          expenseId: expense.id,
        })),
      });
    }

    const finance = await prismaClient.financeTimeline.create({
      data: {
        type: params.type,
        expenses: { connect: { id: expense.id } },
        createdAt: new Date(),
        FinanceSection: {
          connect: { id: financeId },
        },
      },
    });
    // console.log(expense)
    if (params.type === FinanceCreationType.Expense_Recurring) {
      console.log(body);
      const payload = {
        body: body,
        financeId: financeId,
      }
      const schedule = {
        startDate: body.recurringStartedOn,
        endDate: body.recurringEndson,
        repeatType: body.recurringRepeatType
      }
      //console.log(payload,schedule);
      //await recurringExpenses({ payload, schedule });
    }
    // find the record transactions with same invoice number
    const transactions = await prismaClient.recordTransaction.findMany({
      where: {
        expensesId: expense.id,
      },
    });
  // get the some of moneyChange in transactions if moneyChange is 'In' subtract or 'Out' add
    const totalAmount = transactions.reduce((acc, curr) => {
      if (curr.moneyChange === 'In') {
        return acc - (curr.amountPaid||0);
      }else if(curr.moneyChange === 'Out'){
        return acc + (curr.amountPaid||0);
      }
      return acc;
    }, 0);
    // get the balance status
    const balanceStatus = (expense.totalCost||0)- totalAmount;
    // get the status
    const status = balanceStatus <= -1 ? `You’re owed: ₹${parseFloat((-1 * balanceStatus).toString()).toFixed(2)}` : balanceStatus >= 1 ? `You owe: ₹${parseFloat((balanceStatus).toString()).toFixed(2)}` : 'Closed';
    // update the status in expenses
    await prismaClient.expenses.update({
      where: {
        id: expense.id,
      },
      data: {
        status: status,
      },
    });
    return new Response(JSON.stringify({ expense, finance }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
