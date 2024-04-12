import { connectToDB } from "@/utils";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from './prisma/index';
import bcrypt from 'bcrypt';

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(req: Request) {

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await connectToDB();
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ "message": 'User not found' }), { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!validPassword) {
      return new Response(JSON.stringify({ "message": 'Invalid password' }), { status: 401 });
    }

    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, {
      httpOnly: true, // Cookie is accessible only through HTTP(S) requests
      secure: process.env.NODE_ENV === 'production', // Cookie is sent only over HTTPS in production
      sameSite: 'strict', // Cookie is not sent in cross-site requests
      maxAge: 60 * 60 * 24 * 7, // Cookie expires in 7 days
      path: '/', // Cookie is accessible from all paths in the domain
    });

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ "message": 'Internal server error' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }

  // Verify credentials && get the user

  // const user = { email: formData.get("email"), name: "John" };

  // // Create the session
  // const expires = new Date(Date.now() + 10 * 1000);
  // const session = await encrypt({ user, expires });

  // // Save the session in a cookie
  // cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  console.log("here")
  const session = request.cookies.get("session")?.value;
  console.log("session: ", session)
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}