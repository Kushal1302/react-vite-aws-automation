import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { sendEmail } from "./utils/mail.js";

const app = new Hono();

app.get("/", async (c) => {
  await sendEmail({
    to: "kushalmalviya1302@gmail.com",
    subject: "Test Email from Hono",
    html: "<h1>Hello from Hono!</h1><p>This is a test email sent using Hono framework.</p>",
  });
  return c.text("Hello Hono! Email sent successfully.");
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

export const handler = handle(app);
