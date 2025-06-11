import { simpleParser } from "mailparser";

export async function parseEmail(raw: Buffer) {
  const parsed = await simpleParser(raw);

  const from = parsed.from?.text;
  const subject = parsed.subject;
  const attachments = parsed.attachments.map((a) => ({
    filename: a.filename,
    contentType: a.contentType,
    size: a.size,
    content: a.content.toString("base64"), // You can store or decode
  }));

  return { from, subject, attachments };
}
