import nodemailer from "nodemailer";

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.ZOHO_AUTH_USER,
    pass: process.env.ZOHO_USER_PASS,
  },
});
  //   mail options
  const mailOptions = {
    from: ZOHO_AUTH_USER,
    to: email,
    subject: "Email Verification",
    html: `<div
    style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
    <h3 style="color: rgb(8, 56, 188)">Please verify your email address</h3>
    <hr>
    <h4>Hi ${firstName},</h4>
    <p>
        Please verify your email address so we know it's really you.
        <br>
    <p>This link <b>expires in 1 hour</b></p>
    <br>
    <a href=${link}
        style="color: #fff; padding: 14px; text-decoration: none; background-color: #000;  border-radius: 8px; font-size: 18px;">Verify
        Email Address</a>
    </p>
    <div style="margin-top: 20px;">
        <h5>Best Regards</h5>
        <h5>S͛OͦCͨIͥAͣLiͥzeͤ Team</h5>
    </div>
</div>`,
  };
