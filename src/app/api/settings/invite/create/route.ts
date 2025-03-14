import { NextResponse, NextRequest } from 'next/server'
import { decrypt, encrypt } from '../../../../../../auth';
import prismaClient from '../../../../../../prisma';
import { connectToDB } from '@/utils';
import { UserState } from '@/lib/features/userSlice';
import nodemailer from 'nodemailer';

function htmlTemplate(userInviteString: String) {

    let inviteLink = process.env.NEXT_PUBLIC_API_BASE_PATH + "/api/settings/invite?userInviteString=" + userInviteString;

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Invitation</title>
        <style>
            /* Add your custom styles here */
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
    
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff !important;
                text-decoration: none;
                border-radius: 5px;
            }
    
            .btn:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h2>Invitation to Join Our Platform</h2>
            <p>Hello,</p>
            <p>You have been invited to join our platform. Click the button below to accept the invitation:</p>
            <p><a href=${inviteLink} class="btn">Accept Invitation</a></p>
            <p>If you are unable to click the button above, you can also copy and paste the following link into your browser:</p>
            <a href=${inviteLink}>${inviteLink}</a>
            <p>We look forward to seeing you!</p>
            <p>Best regards,<br>Your Team</p>
        </div>
    </body>
    
    </html>
    `;
}

export const POST = async (req: NextRequest) => {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    // console.log("inside API")

    const { branchId, role, email } = await req.json();

    const requestHeaders = new Headers(req.headers)

    let userId = Number(requestHeaders.get("userId"));

    // console.log(userId);

    let orgBranch = await prismaClient.orgBranch.findUnique({
        where: {
            id: branchId
        }
    });

    // console.log(orgBranch);

    let adminUser = await prismaClient.user.findUnique({
        where: {
            id: userId
        },
        include: {
            adminOrganizations: {}
        }
    });

    

    let invitedUser = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    });

    if (invitedUser) {
        const orgBranchUserRole = await prismaClient.orgBranchUserRole.findFirst({
            where: {
                userId: invitedUser?.id,
                orgBranchId: branchId
            }
        });

        // console.log(orgBranchUserRole)

        if (orgBranchUserRole) {
            return new Response(JSON.stringify({ "message": "User is already part of the branch" }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

    }


    let userInviteString = await encrypt({ branchId, role, email }, "7 day");

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.CUSTOMCONNSTR_AUTOMATED_GMAIL,
            pass: process.env.CUSTOMCONNSTR_AUTOMATED_GMAIL_APP_PASSWORD,
        },
        
    });

    await transporter.verify();



    const message = "Hi there, you were emailed me through nodemailer"
    const options = {
        from: process.env.CUSTOMCONNSTR_AUTOMATED_GMAIL, // sender address
        to: email, // receiver email
        subject: "Invitation to join Organization: Alphaherd", // Subject line
        text: message,
        html: htmlTemplate(userInviteString),
    }

    await new Promise((resolve, reject) => {
        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(info);
            }
        });
    });

    return new Response(JSON.stringify({ message: 'Email sent successfully' }));
}
