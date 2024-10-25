const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'dnagender2019@gmail.com', // Replace with your Gmail
        pass: 'yrbxrmzzbgmzmaxq'     // Replace with your Gmail App Password
    }
});

const sendOtpEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: '"Your App Name" <dnagender2019@gmail.com>', // Replace with your Gmail
            to: email,
            subject: 'Email Verification OTP',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                    <h2 style="color: #333;">Email Verification</h2>
                    <p>Your verification code is:</p>
                    <h1 style="color: #007bff; font-size: 32px;">${otp}</h1>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you didn't request this code, please ignore this email.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
};

module.exports = { sendOtpEmail };

// yrbxrmzzbgmzmaxq