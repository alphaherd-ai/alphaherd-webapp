import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const {SMTP_EMAIL,SMTP_PASSWORD} = process.env;

const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD

    },
} as SMTPTransport.Options)

type SendEmailDto = {
    sender: Mail.Address,
    receipients: Mail.Address[],
    subject:string;
    message:string;
}

export const sendEmail = async (dto: SendEmailDto) =>{
    const {sender,receipients,subject,message} = dto;
    return await transport.sendMail({
        from: sender,
        to: receipients,
        subject,
        html: message,
        text:message,
    })
}
