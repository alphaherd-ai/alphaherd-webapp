import { sendEmail } from "@/utils/mail"
import { NextResponse } from "next/server"

export async function POST(){
    const sender ={
        name: 'Alphaherd',
        address:'no-reply@alphaherd.com'
    }
    const receipients=[{
        name: 'Shristi',
        address: 'hembramshristi07@gmail.com'
    }]

    try{
        const result = await sendEmail({
            sender,
            receipients,
            subject: 'Billing',
            message: 'Hi '+receipients[0].name+' !This is your bill', 
        })
        return NextResponse.json({ message: "success" }, { status: 200 });
    }catch (error) {
        console.error("Error sending Email", error);
        return NextResponse.json({ message: "Error sending message" }, { status: 500 });
    }
}