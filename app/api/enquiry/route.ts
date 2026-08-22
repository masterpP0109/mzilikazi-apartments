import { NextResponse } from 'next/server';
import { z } from 'zod';

const enquirySchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    arrivalDate: z.string().min(1),
    departureDate: z.string().min(1),
    guests: z.coerce.number().min(1).max(20),
    apartmentPreference: z.string().optional(),
    message: z.string().optional(),
  })
  .refine(
    (data) => new Date(data.departureDate) > new Date(data.arrivalDate),
    { message: 'Departure must be after arrival', path: ['departureDate'] }
  );

export async function POST(request: Request) {
  // Parse and validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // ── 1. Insert into Supabase ────────────────────────────────────────────────
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: dbError } = await supabase.from('enquiries').insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      arrival_date: data.arrivalDate,
      departure_date: data.departureDate,
      guests: data.guests,
      apartment_preference: data.apartmentPreference ?? null,
      message: data.message ?? null,
      status: 'new',
      source: 'website',
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 });
    }
  } catch (err) {
    console.error('Supabase client error:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  // ── 2. Send emails via Resend ─────────────────────────────────────────────
  try {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'noreply@mzilikaziapartments.com';
    const toEmail = process.env.RESEND_TO_EMAIL ?? 'info@mzilikaziapartments.com';

    // Confirmation to guest
    await resend.emails.send({
      from: `Mzilikazi Apartments <${fromEmail}>`,
      to: data.email,
      subject: 'Your enquiry has been received — Mzilikazi Apartments',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0B1B2B;">
          <div style="background: #0B1B2B; padding: 32px; border-bottom: 3px solid #C8922A;">
            <h1 style="color: #FAF6EE; font-size: 22px; margin: 0;">Mzilikazi Apartments</h1>
            <p style="color: #C8922A; font-size: 12px; margin: 4px 0 0; letter-spacing: 0.1em; text-transform: uppercase;">Victoria Falls, Zimbabwe</p>
          </div>
          <div style="padding: 32px;">
            <h2 style="font-size: 20px; margin-bottom: 16px;">Thanks for your enquiry, ${data.name}.</h2>
            <p style="color: #4A5568; line-height: 1.6; margin-bottom: 16px;">
              We've received your enquiry and will get back to you within 24 hours with availability and next steps.
            </p>
            <div style="background: #FAF6EE; border: 1px solid #E2D9C8; border-radius: 6px; padding: 20px; margin: 24px 0;">
              <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #C8922A; margin: 0 0 12px;">Your Enquiry Details</h3>
              <table style="width: 100%; font-size: 14px; color: #4A5568;">
                <tr><td style="padding: 4px 0; font-weight: bold; width: 40%;">Arrival</td><td>${data.arrivalDate}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold;">Departure</td><td>${data.departureDate}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold;">Guests</td><td>${data.guests}</td></tr>
                ${data.apartmentPreference ? `<tr><td style="padding: 4px 0; font-weight: bold;">Apartment</td><td>${data.apartmentPreference}</td></tr>` : ''}
              </table>
            </div>
            <p style="color: #4A5568; line-height: 1.6; font-size: 13px;">
              If you have any urgent questions, feel free to reply to this email or contact us directly via WhatsApp.
            </p>
          </div>
          <div style="background: #F0E8D6; padding: 20px 32px; font-size: 12px; color: #4A5568; border-top: 1px solid #E2D9C8;">
            Mzilikazi Apartments · Victoria Falls, Zimbabwe
          </div>
        </div>
      `,
    });

    // Notification to property
    await resend.emails.send({
      from: `Enquiry Form <${fromEmail}>`,
      to: toEmail,
      replyTo: data.email,
      subject: `New enquiry from ${data.name} — ${data.arrivalDate} to ${data.departureDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0B1B2B;">
          <h2>New Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px; border: 1px solid #E2D9C8; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #E2D9C8;">${data.name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #E2D9C8; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #E2D9C8;">${data.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #E2D9C8; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #E2D9C8;">${data.phone ?? '—'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #E2D9C8; font-weight: bold;">Arrival</td><td style="padding: 8px; border: 1px solid #E2D9C8;">${data.arrivalDate}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #E2D9C8; font-weight: bold;">Departure</td><td style="padding: 8px; border: 1px solid #E2D9C8;">${data.departureDate}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #E2D9C8; font-weight: bold;">Guests</td><td style="padding: 8px; border: 1px solid #E2D9C8;">${data.guests}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #E2D9C8; font-weight: bold;">Apartment Preference</td><td style="padding: 8px; border: 1px solid #E2D9C8;">${data.apartmentPreference ?? 'No preference'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #E2D9C8; font-weight: bold;">Message</td><td style="padding: 8px; border: 1px solid #E2D9C8;">${data.message ?? '—'}</td></tr>
          </table>
        </div>
      `,
    });
  } catch (emailErr) {
    // Email failure should not block the enquiry — log and continue
    console.error('Resend email error:', emailErr);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
