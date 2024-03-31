import prisma from "../../prisma/index";

export const connectToDB = async () => {
    try{
        await prisma.$connect()
        console.log("connected")
    }catch(error: any){
        return new Error(error.message)        
    }
}