import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { enquirySchema } from "@/lib/enquiry";
import { SITE_NAME } from "@/lib/constants";
import { query, ensureTablesExist } from "@/lib/db";
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Please send a valid enquiry." },
      { status: 400 },
    );
  }
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      {
        error: "Please check your dates and contact details.",
        details: parsed.error.flatten(),
      },
      { status: 422 },
    );
  const data = parsed.data;
  if ((data.dateMode ?? "known") !== "known") {
    data.arrivalDate = undefined;
    data.departureDate = undefined;
  }
  const dateSummary =
    (data.dateMode ?? "known") === "known"
      ? `${data.arrivalDate} to ${data.departureDate}`
      : data.dateMode === "flexible"
        ? "with flexible dates"
        : "with dates still to discuss";
  let delivered = false;

  // 1. Neon Postgres storage
  if (process.env.DATABASE_URL) {
    try {
      await ensureTablesExist();
      const messageText =
        [
          data.dateMode && data.dateMode !== "known"
            ? "Dates: " + data.dateMode
            : "",
          data.message,
        ]
          .filter(Boolean)
          .join("\n") || null;

      await query(
        `INSERT INTO enquiries (name, email, phone, arrival_date, departure_date, guests, apartment_preference, message, status, source)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          data.name,
          data.email,
          data.phone || null,
          data.arrivalDate || null,
          data.departureDate || null,
          data.guests,
          data.apartmentPreference || null,
          messageText,
          "new",
          "website",
        ]
      );
      delivered = true;
    } catch (err) {
      console.error("Neon DB storage failed:", err);
    }
  }

  // 2. Supabase storage fallback (if configured)
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    try {
      const db = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
      );
      const { error } = await db.from("enquiries").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        arrival_date: data.arrivalDate || null,
        departure_date: data.departureDate || null,
        guests: data.guests,
        apartment_preference: data.apartmentPreference || null,
        message:
          [
            data.dateMode && data.dateMode !== "known"
              ? "Dates: " + data.dateMode
              : "",
            data.message,
          ]
            .filter(Boolean)
            .join("\n") || null,
        status: "new",
        source: "website",
      });
      delivered = !error;
      if (error) console.error("Enquiry storage failed");
    } catch {
      console.error("Enquiry storage unavailable");
    }
  }
  if (
    process.env.RESEND_API_KEY &&
    process.env.RESEND_FROM_EMAIL &&
    process.env.RESEND_TO_EMAIL
  ) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = `${SITE_NAME} <${process.env.RESEND_FROM_EMAIL}>`;
    const preference = data.apartmentPreference || "General / Undecided";

    try {
      const notification = await resend.emails.send({
        from,
        to: process.env.RESEND_TO_EMAIL,
        replyTo: data.email,
        text: `New Accommodation Enquiry — ${SITE_NAME}\n\nGuest: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone ?? "Not provided"}\nDates: ${dateSummary}\nGuests: ${data.guests}\nApartment Preference: ${preference}\n\nMessage / Notes:\n${data.message ?? "No additional message"}\n`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; color: #1a1a1a; line-height: 1.6;">
            <h2 style="color: #92542B; margin-bottom: 8px;">New Accommodation Enquiry</h2>
            <p style="font-size: 16px; margin-top: 0;">You have received a new enquiry via the <strong>${SITE_NAME}</strong> website.</p>

            <div style="background-color: #f7f5f0; border-radius: 8px; padding: 18px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #666; width: 140px;"><strong>Apartment:</strong></td>
                  <td style="padding: 6px 0; font-weight: 600; color: #111;">${preference}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #666;"><strong>Dates:</strong></td>
                  <td style="padding: 6px 0;">${dateSummary}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #666;"><strong>Guests:</strong></td>
                  <td style="padding: 6px 0;">${data.guests}</td>
                </tr>
              </table>
            </div>

            <h3 style="color: #333; margin-top: 24px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Guest Information</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 6px 0; color: #666; width: 140px;"><strong>Name:</strong></td>
                <td style="padding: 6px 0;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 6px 0;"><a href="mailto:${data.email}" style="color: #92542B;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666;"><strong>Phone / WhatsApp:</strong></td>
                <td style="padding: 6px 0;">${data.phone ? `<a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}">${data.phone}</a>` : "Not provided"}</td>
              </tr>
            </table>

            ${
              data.message
                ? `
              <div style="background: #fff; border: 1px solid #e0ded9; border-radius: 6px; padding: 14px; margin-top: 14px;">
                <p style="margin: 0 0 6px 0; color: #666; font-size: 13px;"><strong>Special Requests / Message:</strong></p>
                <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
              </div>`
                : ""
            }

            <div style="margin-top: 30px;">
              <a href="mailto:${data.email}?subject=Regarding your enquiry at Mzilikazi Apartments" style="background-color: #92542B; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 500;">
                Reply Directly to Guest
              </a>
            </div>
          </div>
        `,
      });
      if (!notification.error) delivered = true;
      else console.error("Enquiry notification failed", notification.error);
    } catch (err) {
      console.error("Enquiry email unavailable:", err);
    }

    if (delivered) {
      try {
        await resend.emails.send({
          from,
          to: data.email,
          subject: `We've received your enquiry — ${SITE_NAME}`,
          text: `Hello ${data.name},\n\nThank you for reaching out to ${SITE_NAME}. We have received your enquiry for ${preference} (${dateSummary}, ${data.guests} guests).\n\nOur team in Victoria Falls will review availability and get back to you shortly with rates and arrangements.\n\nWarm regards,\n${SITE_NAME}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; color: #1a1a1a; line-height: 1.6;">
              <h2 style="color: #92542B;">Thank you, ${data.name}.</h2>
              <p>We have received your enquiry for <strong>${preference}</strong> in Victoria Falls.</p>

              <div style="background-color: #f7f5f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <p style="margin: 4px 0;"><strong>Stay dates:</strong> ${dateSummary}</p>
                <p style="margin: 4px 0;"><strong>Guests:</strong> ${data.guests}</p>
              </div>

              <p>Our reservations team will confirm availability and reply to you with rates and details shortly.</p>

              <p style="margin-top: 28px; color: #555;">
                Warm regards,<br />
                <strong>${SITE_NAME} Team</strong><br />
                Victoria Falls, Zimbabwe
              </p>
            </div>
          `,
        });
      } catch (err) {
        console.error("Guest acknowledgement unavailable:", err);
      }
    }
  }
  if (!delivered)
    return NextResponse.json(
      {
        error:
          "We could not deliver your enquiry at the moment. Please try again later.",
      },
      { status: 503 },
    );
  return NextResponse.json({ success: true }, { status: 201 });
}
