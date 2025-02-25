import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
        return NextResponse.json({ message: 'Token and new password are required' }, { status: 400 });
    }

    try {
        const decoded = jwt.verify(token, "alphaherd") as { email: string };
        if(!decoded){
            return NextResponse.json({ message: 'Invalid token' }, { status:400 });
        }
        const user = await prisma.user.findUnique({
            where: { email: decoded.email },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { email: decoded.email },
            data: { hashedPassword: hashedPassword },
        });

        return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }
}
