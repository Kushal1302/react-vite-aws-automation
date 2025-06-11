import nodemailer from "nodemailer";
import ENV from "./env.js";

export const sendEmail = async ({
  to,
  subject,
  html,
  cc = [],
}: {
  to: string;
  subject: string;
  html: string;
  cc?: string[];
}) => {
  const transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: Number(ENV.SMTP_PORT),
    secure: ENV.SMTP_PORT === "465",
    auth: {
      user: ENV.SMTP_USER,
      pass: ENV.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"FactuON" <${ENV.SMTP_USER}>`,
    to,
    cc,
    subject,
    html,
  });
};
