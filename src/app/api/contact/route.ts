import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, message } = await req.json();

  if (!email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Email and message are required.' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'The Blender <info@entertheblender.gr>',
    to: 'info@entertheblender.gr',
    replyTo: email.trim(),
    subject: `Message from ${firstName || ''} ${lastName || ''}`.trim() || 'New contact message',
    text: `From: ${firstName || ''} ${lastName || ''}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #171717;">
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #737373; margin-bottom: 24px;">
          New message via entertheblender.gr
        </p>
        <table style="border-collapse: collapse; margin-bottom: 24px; width: 100%;">
          <tr>
            <td style="padding: 6px 12px 6px 0; color: #737373; font-size: 13px; width: 80px; white-space: nowrap;">Name</td>
            <td style="padding: 6px 0; font-size: 13px;">${firstName || ''} ${lastName || ''}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px 6px 0; color: #737373; font-size: 13px;">Email</td>
            <td style="padding: 6px 0; font-size: 13px;">
              <a href="mailto:${email}" style="color: #171717;">${email}</a>
            </td>
          </tr>
        </table>
        <div style="border-left: 3px solid #171717; padding-left: 16px; font-size: 14px; line-height: 1.7; color: #404040; white-space: pre-wrap;">${message}</div>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
        <p style="font-size: 11px; color: #a3a3a3;">Hit Reply to respond directly to ${email}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
