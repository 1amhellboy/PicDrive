// export const sendResetEmail = (email:string, resetLink:string)=>{
//     console.log(`Password reset link for ${email}: ${resetLink}`);
// }


import nodemailer from "nodemailer";

export const sendResetEmail = async (email: string, resetLink: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    await transporter.sendMail({
      from: `"PicDrive Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request - PicDrive",
      text: `Click the link to reset your password: ${resetLink}`,
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>This link will expire in 10 minutes.</p>`,
    });

    console.log(`✅ Reset email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send reset email:", error);
    throw new Error("Email sending failed");
  }
};
