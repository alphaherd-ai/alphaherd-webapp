import { NextRequest } from 'next/server';
import prismaClient from '../../../../../../../prisma';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';
import recurringExpensesQueue from '@/lib/bull';
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
        data: body.items.map((item: any) => ({
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
    if(expense.type==FinanceCreationType.Expense_Recurring){
      const nextDate = calculateNextOccurrence(expense.recurringStartedOn!, expense.recurringRepeatType!);
      if (nextDate <= new Date(expense.recurringEndson!)) {
        recurringExpensesQueue.add({ expenseId: expense.id }, { delay: nextDate.getTime() - Date.now() });
      }
    }
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
