import transporter from '../config/email.js';
import logger from '../utils/logger.js';

export const sendVerificationEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify your CodeSphere account',
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
      html: `<b>Your OTP is: ${otp}</b><br>It will expire in 10 minutes.`
    });
    logger.info(`Verification email sent to ${email}`);
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email, token) => {
  try {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Reset your CodeSphere password',
      text: `Click the link to reset your password: ${resetUrl}`,
      html: `Click <a href="${resetUrl}">here</a> to reset your password.`
    });
    logger.info(`Password reset email sent to ${email}`);
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    throw error;
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to CodeSphere!',
      text: `Hi ${name},\n\nWelcome to CodeSphere! Start collaborating now.`,
      html: `<b>Hi ${name},</b><br>Welcome to CodeSphere! Start collaborating now.`
    });
    logger.info(`Welcome email sent to ${email}`);
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    throw error;
  }
};
