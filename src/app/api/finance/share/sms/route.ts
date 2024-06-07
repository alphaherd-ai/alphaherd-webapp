import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

interface PhoneNumber {
  phone: string;
}

export const POST=async(req: NextRequest)=> {

  const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
  const authToken = process.env.TWILIO_AUTH_TOKEN as string;
  const twilioNumber = process.env.TWILIO_PHONE_NUMBER as string;

  try {
    const client = twilio(accountSid, authToken);

    const { phone }: PhoneNumber = await req.json();

    const result = await client.messages.create({
      body: "This is dummy SMS",
      from: `${twilioNumber}`,
      to: `${phone}`,
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return NextResponse.json({ message: "Error sending message" }, { status: 500 });
  }
}