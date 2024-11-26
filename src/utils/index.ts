import prismaClient from "../../prisma";

export const connectToDB = async () => {
    try{
        console.log("here")
        await prismaClient.$connect()
        console.log("connected")
    }catch(error: any){
        return new Error(error.message)        
    }
}