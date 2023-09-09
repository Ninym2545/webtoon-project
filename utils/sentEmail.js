import nodemailer from 'nodemailer'
import { html } from './htmlEmail'


const sendEmail = async({to , url, text}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    })

    const mailOption = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Webtoon NFT | email verification',
        html:html({url, text})
    }

    const result = await transporter.sendMail(mailOption)
    return result
}

export default sendEmail;