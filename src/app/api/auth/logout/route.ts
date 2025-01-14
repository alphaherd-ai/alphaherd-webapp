import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import store from "@/lib/store"; // Import your store

export async function POST() {
  cookies().set("session", "", { expires: new Date(0) });
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
  console.log("Session cookie cleared");

  // Dispatch the USER_LOGOUT action to reset the state
  store.dispatch({ type: 'USER_LOGOUT' });

  return NextResponse.json({ success: true, message: "Logged out successfully" });
}