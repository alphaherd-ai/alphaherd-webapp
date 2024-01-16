import prisma from "../../prisma/index";

export const connectToDB = async () => {
    try{
        await prisma.$connect()
    }catch(error: any){
        return new Error(error.message)        
    }
}