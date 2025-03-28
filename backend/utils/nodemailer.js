import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.user,
        pass: process.env.nodemailer
    }
});

export const sendmail = (to) => {
    transporter.sendMail({
        to: to,
        subject: "You have successfully registered",
        html: "yoyo"
    });
};
