import prismaClient from "../../prisma";

export function GenerateExpense((any)=>{
    const recurringExpense=prismaClient.expenses.findMany({
        where:{
            type:"recurring",
            recurringEndson:{
                gte:Date.now()
            }
        }
    })
    if(recurringExpense.recurringRepeatType=="EveryDay"&&(Date.now()-))
})


