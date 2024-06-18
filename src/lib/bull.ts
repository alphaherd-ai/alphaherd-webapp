// lib/bull.ts
import  Queue  from 'bull';
import prismaClient from '../../prisma';
import { calculateNextOccurrence } from '../utils/calculateNextOccurrence'; 

const recurringExpensesQueue = new Queue('recurring-expenses', {
  redis: {
    host: '127.0.0.1',
    port: 6380,
  },
});

recurringExpensesQueue.process(async (job:any) => {
  const { expenseId } = job.data;
  const {id:number,...expense} = await prismaClient.expenses.findUnique({ where: { id: expenseId } });

  if (!expense) {
    throw new Error('Expense not found');
  }

  const nextDate = calculateNextOccurrence(expense.recurringStartedOn!, expense.recurringRepeatType!);

  if (nextDate <= new Date(expense.recurringEndson!)) {
    const newExpense=await prismaClient.expenses.create({
      data: {
        ...expense,
        date: new Date(),
      },
    });

    recurringExpensesQueue.add({ expenseId: newExpense.id  }, { delay: nextDate.getTime() - Date.now() });
  }
});

export default recurringExpensesQueue;
