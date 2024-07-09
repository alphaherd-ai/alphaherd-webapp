// lib/bull.ts
import  Queue  from 'bull';
import prismaClient from '../../prisma';
import { calculateNextOccurrence } from '../utils/calculateNextOccurrence'; 

const recurringExpensesQueue = new Queue('recurring-expenses', {
  redis: {
    host: 'localhost',
    port: 6379,
  },
});

recurringExpensesQueue.process(async (job:any) => {
  const { expenseId } = job.data;
  const expenseRecord = await prismaClient.expenses.findUnique({ where: { id: expenseId } });

  if (!expenseRecord) {
    throw new Error('Expense not found');
  }

  const { id, ...expense } = expenseRecord;

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
