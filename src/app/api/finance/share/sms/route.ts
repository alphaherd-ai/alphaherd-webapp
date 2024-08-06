// import { NextRequest, NextResponse } from "next/server";
// import twilio from "twilio";

// interface PhoneNumber {
//   phone: string;
// }

// export const POST=async(req: NextRequest)=> {

//   const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
//   const authToken = process.env.TWILIO_AUTH_TOKEN as string;
//   const twilioNumber = process.env.TWILIO_PHONE_NUMBER as string;

//   try {
//     const client = twilio(accountSid, authToken);

//     const { phone }: PhoneNumber = await req.json();

//     const result = await client.messages.create({
//       body: "This is dummy SMS",
//       from: `${twilioNumber}`,
//       to: `${phone}`,
//     });

//     return NextResponse.json({ message: "success" }, { status: 200 });
//   } catch (error) {
//     console.error("Error sending WhatsApp message:", error);
//     return NextResponse.json({ message: "Error sending message" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

interface PhoneNumber {
  phone: string;
}

export const POST = async (req: NextRequest) => {
  // const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
  // const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;
  // const region = process.env.AWS_REGION as string;

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    region: process.env.AWS_REGION as string

  });

  const sns = new AWS.SNS();

  try {
    const { phone }: PhoneNumber = await req.json();

    const params: AWS.SNS.PublishInput = {
      Message: "This is dummy SMS - AWS",
      PhoneNumber: phone,
      MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
          DataType: "String",
          StringValue: "String",
        },
      },
    };

    const result = await sns.publish(params).promise();
    console.log("SMS was sent",result);

    return NextResponse.json({ message: 'success', result }, { status: 200 });
  } catch (error) {
    console.error('Error sending SMS:', error);
    return NextResponse.json({ message: 'Error sending SMS'}, { status: 500 });
  }
};

