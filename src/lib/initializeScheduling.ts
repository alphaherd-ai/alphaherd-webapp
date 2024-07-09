// lib/initializeScheduling.ts
import prismaClient from '../../prisma';
import recurringExpensesQueue from './bull';
import { calculateNextOccurrence } from '../utils/calculateNextOccurrence'; 

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
  
  for (const expense of expenses) {
    const nextDate = calculateNextOccurrence(expense.recurringStartedOn!, expense.recurringRepeatType!);
    if (nextDate <= new Date(expense.recurringEndson!)) {
      recurringExpensesQueue.add({ expenseId: expense.id }, { delay: nextDate.getTime() - Date.now() });
    }
  }
};

export default initializeScheduling;
