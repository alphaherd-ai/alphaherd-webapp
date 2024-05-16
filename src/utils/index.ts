import prisma from "../../prisma";

export const connectToDB = async () => {
    try{
        console.log("here")
        await prisma.$connect()
        console.log("connected")
    }catch(error: any){
        return new Error(error.message)        
    }
}