import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import prismaClient from '../../../../../../../prisma';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.CUSTOMCONNSTR_AUTOMATED_GMAIL,
        pass: process.env.CUSTOMCONNSTR_AUTOMATED_GMAIL_APP_PASSWORD
    },
});

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendResetPasswordEmail = async (email: string, otp: string,name:string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Alphaherd Password Reset - OTP',
        html: `
            <p>Hi ${name},</p>
            <p>We received a request to reset your password. Use the OTP below to set a new one:</p>
            <p style="font-size: 24px; font-weight: bold;">Your OTP: ${otp}</p>
            <p>This OTP is valid for 5 minutes. If you didn't request this, you can safely ignore this email.</p>
            <p>Need any help? Don't hesitate to reach out.</p>
            <p>Best,<br>Your Team at Alphaherd</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};

export const POST = async (req: NextRequest)=> {
    if (req.method === 'POST') {
        const body = await req.json();
        const { email } = body;
        if (!body) {
            return new Response('Email is required',{status:400});
        }
        const valuser = await prismaClient.user.findUnique({
            where: { email: email },
        });

        if (!valuser) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }
        const otp = generateOTP();
        const hashedOtp = bcrypt.hashSync(otp, 10);
        const saveotp=await prismaClient.oTP.create({
            data: {
                email: email,
                otp: hashedOtp,
            },
        });
        try {
            await sendResetPasswordEmail(email, otp,valuser.name);
            return new Response(JSON.stringify({ message: 'OTP sent successfully' }), { status: 200 });
        } catch (error) {
            return new Response(JSON.stringify({ message: 'Error sending email', error }), { status: 500 });
        }
    } else {
        return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
    }
}