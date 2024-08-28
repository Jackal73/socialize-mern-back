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
