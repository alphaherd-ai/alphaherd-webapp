import { connectToDB } from "@/utils";
import prismaClient from "../../prisma";
import { NextRequest, NextResponse } from "next/server";

export const getUserFromID=async(userId:number)=>{
    // console.log(userId);
    try{
        const user = await prismaClient.user.findUnique({
            where:{
                id:userId
            }
        })
        // //console.log(user)
        return user
    }catch(error){
        console.error("Error finding user: ",error);
        return null;
    }

}

export const getVerifyOrgandBranch= async(userId:number,branchId:number,request:NextRequest)=>{
    try{
        // console.log("here in orgVerify",userId,branchId);
        const user= await getUserFromID(userId);
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("userId",String(userId));
        const orgBranch= await prismaClient.orgBranch.findUnique({
            where:{id:branchId}
        });
        console.log(orgBranch)
        const org=await prismaClient.organization.findUnique({
            where:{
                id:orgBranch?.orgId
            },
            include: {
                adminUsers: true
            }
        });
        const userOrgRole = await prismaClient.orgBranchUserRole.findFirst({
            where: {
                userId: userId,
                orgBranchId: branchId
            }
        })
        // //console.log(orgBranch,user,org,userOrgRole)
        if(!(userOrgRole || org?.adminUsers.includes(user!))){
            return new Response(JSON.stringify("User not allowed for request"));
        }
        // console.log(requestHeaders);
        return NextResponse.next({
            request: {
                headers: requestHeaders,
              }
        });
    }catch(error){
          console.error(error);
          return null;
        }
}