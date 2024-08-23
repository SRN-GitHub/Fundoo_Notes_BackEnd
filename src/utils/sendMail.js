import { config } from 'dotenv';
import nodemailer from 'nodemailer';


export const sendResetPasswordEmail = async (email, resetToken, FirstNameUser) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset Request TESTING',
        text: `You requested a password reset. Use this token: ${resetToken}. It is valid for 1 hour.`,
        html: `<p>Hello ${FirstNameUser},</p><p>You requested a password reset. Use this token: <strong>${resetToken}</strong>. It is valid for 1 hour.</p>`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
  
      return { success: true, message: 'Reset email sent successfully' };
    } catch (error) {
      console.error('Error sending reset email:', error); // Log the exact error
      throw new Error('Failed to send reset email');
    }
  };
  
//*                 <<<< ONLY FOR TESTING PURPOSE >>>>
const testSendEmail = async () => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'shankharanjannag21@gmail.com', // Use your email
        //   pass: 'nuhn fnbx lmox ykmg', // Use your app password
        },
      });
  
      const mailOptions = {
        from: 'shankharanjannag21@gmail.com',
        to: 'shankharanjannag21@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email.',
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Test email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending test email:', error);
    }
  };
//   testSendEmail();