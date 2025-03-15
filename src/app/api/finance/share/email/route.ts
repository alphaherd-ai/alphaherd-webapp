import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { generatePdfForInvoice } from '@/utils/salesPdf';

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: "Invalid method" }, { status: 405 });
  }
  
  try {
    const { email, doc } = await req.json();
    console.log("email is:", email);
    
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CUSTOMCONNSTR_AUTOMATED_GMAIL,
        pass: process.env.CUSTOMCONNSTR_AUTOMATED_GMAIL_APP_PASSWORD
      },
    });
    
    // Check if doc is properly formatted as base64
    let pdfContent = doc;
    // If doc is not already in base64 format, ensure it's properly encoded
    if (typeof doc === 'object') {
      pdfContent = Buffer.from(JSON.stringify(doc)).toString('base64');
    } else if (typeof doc === 'string' && !doc.match(/^[A-Za-z0-9+/=]+$/)) {
      // If the string doesn't look like base64, encode it
      pdfContent = Buffer.from(doc).toString('base64');
    }
    
    const emailMessage = "Please find your invoice attached";
    
    const mailOptions = {
      from: process.env.CUSTOMCONNSTR_AUTOMATED_GMAIL,
      to: email,
      subject: 'Your Invoice',
      text: emailMessage,
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfContent,
          encoding: 'base64',
          contentType: 'application/pdf'
        },
      ]
    };
    
    const info = await transport.sendMail(mailOptions);
    console.info('Email sent: ' + info.response);
    
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send email", error: error }, { status: 500 });
  }
};