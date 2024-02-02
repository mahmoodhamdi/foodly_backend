const nodemailer = require('nodemailer');

async function sendEmail(userEmail, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: userEmail,
        subject: 'Foodly Verification Code',
        html: `<h1> Foodly Email Verification </h1>
                <p> Your verification code is: </p>
                <h2 style="color: blue;">  ${otp} </h2>
                <p> Thank you for using Foodly. </p>
                <p> If you did not request this, please ignore this email. </p>
                                                            `



    };
    try {

        await transporter.sendMail(mailOptions);
        console.log('Email Verification Sent');
    } catch (error) {
        console.log("Email Verification Failed with Error:" + error);
    }     
};

module.exports = sendEmail;
