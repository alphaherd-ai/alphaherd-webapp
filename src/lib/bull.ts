const redis = require('redis');
const Queue = require('bull');
const prismaClient = require('../../prisma');
const { calculateNextOccurrence } = require('../utils/calculateNextOccurrence');

console.log("we're here");


const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
});

redisClient.on('error', (err: any) => {
  console.log('Redis error:', err);
});

redisClient.on('connect', () => {
  console.log('Redis connected');
  redisClient.quit(); // Close the connection after verification
});

const recurringExpensesQueue = new Queue('recurring-expenses', {
  redis: {
    host: 'localhost',
    port: 6379,
  },
});

console.log('we reached here');

recurringExpensesQueue.process(async (job: { data: { expenseId: any; }; }) => {
  const { expenseId } = job.data;
  const expenseRecord = await prismaClient.expenses.findUnique({ where: { id: expenseId } });

  if (!expenseRecord) {
    throw new Error('Expense not found');
  }

  const { id, ...expense } = expenseRecord;

  if (!expense) {
    throw new Error('Expense not found');
  }

  const nextDate = calculateNextOccurrence(expense.recurringStartedOn, expense.recurringRepeatType);

  if (nextDate <= new Date(expense.recurringEndson)) {
    const newExpense = await prismaClient.expenses.create({
      data: {
        ...expense,
        date: new Date(),
      },
    });

    recurringExpensesQueue.add({ expenseId: newExpense.id }, { delay: nextDate.getTime() - Date.now() });
  }
});

export default recurringExpensesQueue;
