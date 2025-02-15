import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
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

const sendResetPasswordEmail = async (email: string, otp: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Alphaherd Password Reset - OTP',
        html: `
            <p>Hi [User's Name],</p>
            <p>We received a request to reset your password. Use the OTP below to set a new one:</p>
            <p style="font-size: 24px; font-weight: bold;">Your OTP: ${otp}</p>
            <p>This OTP is valid for 5 minutes. If you didn't request this, you can safely ignore this email.</p>
            <p>Need any help? Don't hesitate to reach out.</p>
            <p>Best,<br>Your Team at Alphaherd</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const valuser = await prismaClient.user.findUnique({
            where: { email: email },
        });
        if (!valuser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const otp = generateOTP();
        
        try {
            await sendResetPasswordEmail(email, otp);
            res.status(200).json({ message: 'OTP sent successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error sending email', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}