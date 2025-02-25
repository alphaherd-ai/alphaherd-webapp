import prismaClient from "../../../../../../../prisma";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt';
import { hash } from "crypto";
import jwt from 'jsonwebtoken';

export const POST = async (req : NextRequest) => {

    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    const { searchParams } = new URL(req.url!);
    const {otp}=await req.json();
    const email = searchParams.get("email");

    try{

        if(!otp){
            return new Response('OTP is required', { status: 400 });
        }
        if(!email){
            return new Response('Email is required', { status: 400 });
        }
        const valotp = await prismaClient.oTP.findFirst({
            where: { email: email },
            orderBy: { createdAt: 'desc' },
        });
        if (!valotp) {
            return new Response(JSON.stringify({ message: 'OTP not found' }), { status: 404 });
        }
        if(valotp.createdAt.getTime() + 5*60*1000 < new Date().getTime()){
            return new Response(JSON.stringify({ message: 'OTP expired' }), { status: 400 });
        }
        if(!bcrypt.compareSync(otp,valotp.otp)){
            return new Response(JSON.stringify({ message: 'Invalid OTP' }), { status: 400 });
        }
        const token = jwt.sign({ email: email }, "alphaherd", { expiresIn: '15m' });

        return new Response(JSON.stringify({ message: 'OTP verified successfully',token:token }), { status: 200 });
    }catch(e){
        return new Response(JSON.stringify({ message: 'Error verifying OTP', error:e }), { status: 500 });
    }
}