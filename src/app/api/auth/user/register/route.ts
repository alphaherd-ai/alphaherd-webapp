import prismaClient from '../../../../../../prisma';
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation'
import { decrypt } from '../../../../../../auth';

export const POST = async (req : NextRequest) => {

    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
      }

    const { searchParams } = new URL(req.url!);
    let userInviteString = searchParams.get("userInviteString");

    try{

        if(!userInviteString){
            return new Response('New user without invite not allowed', { status: 400 });
        }

        const { branchId, role, email, orgId } = await decrypt(userInviteString);

        let data = await req.json();

        data.email = email; // someone can khowingly send other email in payload

        console.log(data);

        const hashedPassword = await bcrypt.hash(data.password, 10);

        delete data.password

        data.hashedPassword=hashedPassword

        let user = await prismaClient.user.create({
            data: data
        });

        console.log(user);

        const orgBranchUserRole = await prismaClient.orgBranchUserRole.create({
            data: {
                orgBranchId : branchId,
                role : role,
                userId : user.id
            }
        });

        await prismaClient.user.update({
            where: {
                id : user.id
            },
            data: {
                orgBranchId : branchId
            }
        });

        console.log(orgBranchUserRole);
        if(!userInviteString){
            return new Response(JSON.stringify({ user }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
              },
            });
        }
    }
    catch(error){
        console.error('Error:', error);
        userInviteString=null; // to stop from redirect
        return new Response(JSON.stringify({ "message": 'Internal server error' }), { status: 500 });
    }
    finally{
        if(userInviteString){
            return redirect(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/login?userInviteString=${userInviteString}`); // successfull redirect to login page
        }
    }
}