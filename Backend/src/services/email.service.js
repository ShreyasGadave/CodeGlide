import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

/* ==========================
   OAuth2 Client Setup
========================== */
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground",
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
});

/* ==========================
   Send OTP Email
========================== */
export const sendVerificationOTP = async (toEmail, otp) => {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `"CodeGlide" <${process.env.EMAIL_FROM}>`,
      to: toEmail,
      subject: "CodeGlide | Email Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
          <h2 style="color: #2563eb;">CodeGulid Email Verification</h2>
          <p>Hello,</p>
          <p>Your One-Time Password (OTP) for email verification is:</p>

          <div style="
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 4px;
            margin: 20px 0;
            color: #111827;
          ">
            ${otp}
          </div>

          <p>This OTP is valid for <b>10 minutes</b>.  
          Do not share it with anyone.</p>

          <p>If you didn’t request this, you can safely ignore this email.</p>

          <hr />
          <p style="font-size: 12px; color: #6b7280;">
            © ${new Date().getFullYear()} CodeGulid. All rights reserved.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ OTP email sent to ${toEmail}`);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    throw error;
  }
};
