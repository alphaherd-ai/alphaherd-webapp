import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { NextRequest } from 'next/server';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';
import cron from 'node-cron';

const calculateNextOccurrence = (startDate: string | number | Date, repeatType: string) => {
  const currentDate = new Date();
  let nextDate = new Date(startDate);

  switch (repeatType) {
    case 'everyDay':
      while (nextDate <= currentDate) {
        nextDate.setDate(nextDate.getDate() + 1);
      }
      break;
    case 'everyMonth':
      while (nextDate <= currentDate) {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }
      break;
    case 'everyYear':
      while (nextDate <= currentDate) {
        nextDate.setFullYear(nextDate.getFullYear() + 1);
      }
      break;
    default:
      throw new Error('Invalid repeat type');
  }

  return nextDate;
};

export const POST = async (req: NextRequest, { params }: { params: { type: string } }) => {
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
        expenses: { connect: { id: expense.id } },
        createdAt: new Date(),
        FinanceSection: {
          connect: { id: financeId },
        },
      },
    });

    const scheduleExpense = (expense: any) => {
      const nextDate = calculateNextOccurrence(expense.recurringStartedOn, expense.recurringRepeatType);

      if (nextDate <= new Date(expense.recurringEndson)) {
        const cronExpression = `${nextDate.getMinutes()} ${nextDate.getHours()} ${nextDate.getDate()} ${nextDate.getMonth() + 1} *`;

        cron.schedule(cronExpression, async () => {
          await prismaClient.expenses.create({
            data: {
              ...expense,
              date: new Date(),
              id: undefined, 
            },
          });
          scheduleExpense(expense); 
        });
      }
    };

    const initializeScheduling = async () => {
      const expenses = await prismaClient.expenses.findMany({
        where: {
          recurringStartedOn: {
            not: null,
          },
          recurringEndson: {
            not: null,
          },
          recurringRepeatType: {
            not: null,
          },
        },
      });

      expenses.forEach(scheduleExpense);
    };

    initializeScheduling();

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
