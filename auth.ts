import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prismaClient from './prisma';
import bcrypt from 'bcrypt';

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any, expirationTime: string) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/login`);
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

// export async function updateSession(request: NextRequest) {
//   console.log("here")
//   const session = request.cookies.get("session")?.value;
//   console.log("session: ", session)
//   if (!session) return;

//   // Refresh the session so it doesn't expire
//   const parsed = await decrypt(session);
//   parsed.expires = new Date(Date.now() + 10000 * 1000);
//   const res = NextResponse.next();
//   res.cookies.set({
//     name: "session",
//     value: await encrypt(parsed,"10h"),
//     httpOnly: true,
//     expires: parsed.expires,
//   });
//   return res;
// }