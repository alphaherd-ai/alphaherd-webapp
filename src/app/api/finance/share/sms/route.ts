import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";

interface PhoneNumber {
  phone: string;
}

export const POST = async (req: NextRequest) => {
  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    region: process.env.NEXT_PUBLIC_AWS_REGION as string,
  });

  const sns = new AWS.SNS();

  try {
    const { phone }: PhoneNumber = await req.json();

    // Log the phone number to ensure it is in the correct format
    console.log("Sending SMS to:", phone);

    const params: AWS.SNS.PublishInput = {
      Message: "This is a dummy SMS - AWS",
      PhoneNumber: phone,
      MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
          DataType: "String",
          StringValue: "SenderName",
        },
        "AWS.SNS.SMS.SMSType": {
          DataType: "String",
          StringValue: "Transactional", 
        },
      },
    };

    console.log(params)
    const result = await sns.publish(params).promise();
    console.log("SMS publish result:", result);

    return NextResponse.json({ message: "success", result }, { status: 200 });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return NextResponse.json({ message: "Error sending SMS", error: error }, { status: 500 });
  }
};
