import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { User } from "@prisma/client";

export const POST = async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await connectToDB();
    const { email, password, staySignedIn } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!validPassword) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
    }

    let expiresIn = '1h'; 

    if (staySignedIn) {
      expiresIn = '7d'; 
    }

    const token = jwt.sign({ id: user.id }, "process.env.SECRET_KEY", { expiresIn });

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
