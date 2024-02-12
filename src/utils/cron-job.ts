import prisma from "../../prisma/index";
import { connectToDB } from '../utils/index';
import cron from 'node-cron';

const getIntervalInMilliseconds = (recurringType: string) => {
    switch (recurringType) {
        case 'week':
            return '0 0 * * 1';
        case 'month':
            return '0 0 1 * *';
        case 'year':
            return '0 0 1 1 *';
        default:
            throw new Error('Invalid recurring type');
    }
};

const scheduleRecurringExpenses = async () => {
    try {
        await connectToDB();
        const recurringExpenses = await prisma.expenses.findMany({
            where: {
                type: "recurring",
                NOT:{
                    recurringType:null
                }
            }
        });

        
        recurringExpenses.forEach(async (expense) => {
            const interval = getIntervalInMilliseconds(expense.recurringType!);
            cron.schedule(interval, async () => {
                const createdExpense = await prisma.expenses.create({
                    data: {
                        ...expense
                    }
                    
                });
                
            

            
                const finance = await prisma.finance.create({
                  data: {
                    type: expense.type,
                    sale: { connect: { id: expense.id } },
                    time: new Date(),
                  },
                });
                console.log(`Scheduled expense created: ${createdExpense.id}`);
            });

            console.log(`Recurring expense scheduled with interval: ${interval}`);
        });
    } catch (error) {
        console.error("Error scheduling recurring expenses:", error);
    } finally {
        await prisma.$disconnect();
    }
};

export default scheduleRecurringExpenses;
