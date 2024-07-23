const nodemailer = require("nodemailer");
const dotenv=require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendOtpEmail = (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Verfication OTP Code',
        text: `Your Verfication OTP code is ${otp}`
    };
    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendOtpEmail
};
