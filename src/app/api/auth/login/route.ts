import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { User } from "@prisma/client";
import { login } from '../../../../../auth';

export const POST = async (req: Request) => {

  return await login(req);

  // if (req.method !== 'POST') {
  //   return new Response('Method not allowed', { status: 405 });
  // }

  // try {
  //   await connectToDB();
  //   const { email, password } = await req.json();

  //   const user = await prisma.user.findUnique({
  //     where: { email },
  //   });

  //   if (!user) {
  //     return new Response(JSON.stringify({ "message": 'User not found' }), { status: 404 });
  //   }

  //   const validPassword = await bcrypt.compare(password, user.hashedPassword);

  //   if (!validPassword) {
  //     return new Response(JSON.stringify({ "message": 'Invalid password' }), { status: 401 });
  //   }

  //   return new Response(JSON.stringify({ user }), {
  //     status: 200,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  // } catch (error) {
  //   console.error('Error:', error);
  //   return new Response(JSON.stringify({ "message": 'Internal server error' }), { status: 500 });
  // } finally {
  //   await prisma.$disconnect();
  // }
};
