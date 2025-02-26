import { Queue, Worker } from "bullmq";
import IORedis from "ioredis"; 
import prismaClient from "../../prisma";
import { addWeeks, addMonths, addDays, addYears } from "date-fns";
const redisConnection = new IORedis(
  "redis://localhost:6379",
  {
    maxRetriesPerRequest: null
  }
)
redisConnection.on("error", (error) => {
  console.error(error);
  console.log("Error in Redis connection");
});

export const recurringExpenses = async ({ payload, schedule }: any) => {

  console.log(payload, schedule);

  const { startDate, endDate, repeatType } = schedule;
  let repeatOptions = {};
  switch (repeatType) {
    case "everyDay":
      const dailyStartDate = addDays(startDate, 1);
      repeatOptions = {
        repeat: {
          every: 24 * 60 * 60 * 1000, // 1 day in milliseconds
          startDate: dailyStartDate,
          endDate: endDate
        },
      };
      break;

    case "everyWeek":
      const weeklyStartDate = addWeeks(startDate, 1);
      repeatOptions = {
        repeat: {
          every: 24 * 60 * 60 * 1000, // 1 day in milliseconds
          startDate: weeklyStartDate,
          endDate: endDate
        },
      };
      break;

    case "everyMonth":
      const monthlyStartDate = addMonths(startDate, 1);
      repeatOptions = {
        repeat: {
          every: 24 * 60 * 60 * 1000, // 1 day in milliseconds
          startDate: monthlyStartDate,
          endDate: endDate
        },
      };
      break;

    case "everyYear":
      const yearlyStartDate = addYears(startDate, 1);
      repeatOptions = {
        repeat: {
          every: 24 * 60 * 60 * 1000, // 1 day in milliseconds
          startDate: yearlyStartDate,
          endDate: endDate
        },
      };
      break;
  }



  const RecurringapiQueue = new Queue("RecurringapiQueue", {
    connection: redisConnection
  });

  (async () => {
    await RecurringapiQueue.add("Recurringapi", { data: payload }, repeatOptions);
  })();

  const recurringWorker = new Worker('RecurringapiQueue',
    async job => {
      const { data } = job.data;
      const { financeId, body } = data;
      const expense = await prismaClient.expenses.create({
        data: {
          ...body,
          FinanceSection: {
            connect: { id: financeId }
          }
        }
      })
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
          type: data.type,
          expenses: { connect: { id: expense.id } },
          createdAt: new Date(),
          FinanceSection: {
            connect: { id: financeId },
          },
        },
      });

    },
    {
      connection: redisConnection,
      removeOnComplete: { count: 1000 },
      removeOnFail: { count: 5000 },
    }
  )
  recurringWorker.on("failed", (job, err) => {
    if (job) {
      console.error(`Job ${job.id} failed with error:`, err);
    } else {
      console.error(`Job failed with error:`, err);
    }
  });

  recurringWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed successfully`);
  });

  async function removeJob(jobId: any) {
    const job = await RecurringapiQueue.getJob(jobId);
    if (job) {
      await job.remove();
      console.log(`Job ${jobId} has been removed from the queue.`);
    } else {
      console.log(`Job with ID ${jobId} not found.`);
    }
  }


  async function getAllJobs() {
    const jobs = await RecurringapiQueue.getJobs(); // Fetch all jobs without filtering
    console.log(`${jobs.length} total jobs in the queue.`);
    jobs.forEach((job) => {
      console.log(`Job ID: ${job.id}, Status: ${job.status}`);
    });
  }
  getAllJobs();
}