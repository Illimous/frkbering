import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Opret en transporter til Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { to, subject, html, template } = await request.json();

    // Valider input
    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Manglende påkrævede felter' },
        { status: 400 }
      );
    }

    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fejl ved afsendelse af email:', error);
    return NextResponse.json(
      { error: 'Kunne ikke sende email' },
      { status: 500 }
    );
  }
} 