// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//   service: 'gmail', 
//   auth: {
//     user: process.env.MAILER_EMAIL,
//     pass: process.env.MAIL_PASSWORD,
//   },
// });
// const sendResetEmail = (email, resetLink) => {
//   const mailOptions = {
//     from: process.env.MAILER_EMAIL,
//     to: email,
//     subject: 'Password Reset Request',
//     html: `<p>You requested a password reset. Click the link below to reset your password:</p>
//            <a href="${resetLink}">Reset Password</a>`,
//   };
//   return transporter.sendMail(mailOptions);
// };
// module.exports = sendResetEmail;
