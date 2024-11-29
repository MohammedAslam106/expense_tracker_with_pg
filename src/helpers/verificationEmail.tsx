'use server'

import VerifyEmailTemplate from "@/components/email-templates/VerifyEmailTemplate";
import { render } from "@react-email/components";
import nodemailer from 'nodemailer'
// import { Resend } from "resend";

// export const verificationEmail=async({username,otp,emailTo}:{username:string,otp:string,emailTo:string})=>{
//     // console.log(7,process.env.RESEND_API_KEY)

//     const resend=new Resend(process.env.RESEND_API_KEY as string)

//     try {
//         // const { username, otp,emailTo } = await req.json()
//         // console.log(username,otp,emailTo)
//         const { data, error } = await resend.emails.send({
//             from: 'onboarding@resend.dev',
//             to: emailTo,
//             subject: 'Please verify you email for expense tracker.',
//             react: VerifyEmailTemplate({ username, otp: otp }),
//         });

//         if (error) {
//             throw Error(error.message)
//         }

//         return data
//     } catch (error:any) {
//         // return Response.json({ error }, { status: 500 });
//         throw Error(error.message)
//     }
// }


export const verificationEmail=async({username,otp,emailTo}:{username:string,otp:string,emailTo:string})=>{
    try {
        console.log(process.env.NODEMAILER_USER,process.env.NODEMAILER_PASS)
        
        const transporter=nodemailer.createTransport({
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:process.env.NODEMAILER_USER,
                pass:process.env.NODEMAILER_PASS
            }
        })

        const emailHtml = await render(<VerifyEmailTemplate username={username} otp={otp} />);

        const info = await transporter.sendMail({
            from: {
                name:'Expense Tracker',
                address:process.env.NODEMAILER_USER as string
            }, // sender address
            to: emailTo, // list of receivers
            subject: 'Verification code for expense tracker.', // Subject line
            text: "<b>Welcome Expense Tracker<b>", // plain text body
            html: emailHtml, // html body
          });
        
    } catch (error:any) {
        throw Error(error.message)
    }
}