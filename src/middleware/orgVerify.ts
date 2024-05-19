import { connectToDB } from "@/utils";
import prismaClient from "../../prisma";

export const getUserFromID=async(userId:any)=>{
    try{ await connectToDB();
        const user = await prismaClient.user.findUnique({
            where:{
                id:userId
            }
        })
        return user
    }catch(error){
        console.error("Error finding user: ",error);
        return null;
    }

}

export const getVerifyOrgandBranch= async(userId:number,branchId:number)=>{
    try{await connectToDB();
        const user= await getUserFromID(userId);
        const orgBranch= await prismaClient.orgBranch.findUnique({
            where:{id:user?.orgBranchId!}
        })
        const org=await prismaClient.organization.findUnique({
            where:{
                id:orgBranch?.orgId
            }
        })
        if(org&&orgBranch){
            const userRole=prismaClient.orgBranchUserRole.findUnique({where:{
                id:branchId,userId
            }})
         return new Response(JSON.stringify(userRole))
        }else if(org){
            return new Response(JSON.stringify("No orgBranch assigned for the user"));
        }else{
            return new Response(JSON.stringify("Not authorised to access this Organization"));
        }
    }catch(error){
          console.error(error);
          return null;
        }
    
}