const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
})

const sendEmail = async(toAddress, subject, html) => {  
  await transporter.sendMail({
    from: process.env.MAIL_FROM_ADDRESS,
    to: toAddress,
    subject: subject,
    html: html
  });
}

module.exports = sendEmail;