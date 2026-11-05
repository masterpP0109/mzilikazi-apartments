import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { enquirySchema } from "@/lib/enquiry";
import { SITE_NAME } from "@/lib/constants";
import { query, ensureTablesExist } from "@/lib/db";
import {
  buildGuestNotificationEmail,
  buildGuestConfirmationEmail,
  parseEmailRecipients,
} from "@/lib/email";

const externalDeliveryDisabled =
  process.env.NEXT_PRIVATE_TEST_MODE === "1" || process.env.NODE_ENV === "test";

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
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check your dates and contact details.",
        details: parsed.error.flatten(),
      },
      { status: 422 },
    );
  }

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

  if (externalDeliveryDisabled) {
    console.info("Enquiry delivery disabled for local test isolation.");
    return NextResponse.json(
      {
        error:
          "We could not deliver your enquiry at the moment. Please try again later.",
      },
      { status: 503 },
    );
  }

  let delivered = false;
  let stored = false;

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
        ],
      );
      stored = true;
    } catch (err) {
      console.error("Neon DB storage failed:", err);
    }
  }

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
      stored = !error;
      if (error) console.error("Enquiry storage failed");
    } catch (err) {
      console.error("Enquiry storage unavailable:", err);
    }
  }

  const smtpConfigured =
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD &&
    process.env.FROM_EMAIL &&
    process.env.TO_EMAIL;

  if (smtpConfigured) {
    const preference = data.apartmentPreference || "General / Undecided";
    const smtpPort = Number(process.env.SMTP_PORT);
    const recipients = parseEmailRecipients(process.env.TO_EMAIL);

    if (recipients.length === 0) {
      console.error("No valid SMTP recipients configured for enquiry notifications.");
    } else {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        const notificationPayload = buildGuestNotificationEmail({
          siteName: SITE_NAME,
          apartmentPreference: preference,
          dateSummary,
          guestName: data.name,
          guestEmail: data.email,
          guestPhone: data.phone,
          guestCount: data.guests,
          message: data.message,
        });

        const info = await transporter.sendMail({
          from: `${SITE_NAME} <${process.env.FROM_EMAIL}>`,
          to: recipients,
          replyTo: data.email,
          subject: notificationPayload.subject,
          text: notificationPayload.text,
          html: notificationPayload.html,
        });

        if (info?.messageId) delivered = true;
        else console.error("SMTP enquiry notification failed");
      } catch (err) {
        console.error(
          "SMTP enquiry email unavailable:",
          err instanceof Error ? err.message : "unknown error",
        );
      }

      if (delivered) {
        try {
          const confirmationPayload = buildGuestConfirmationEmail({
            siteName: SITE_NAME,
            guestName: data.name,
            preference,
            dateSummary,
            guestCount: data.guests,
          });
          await nodemailer
            .createTransport({
              host: process.env.SMTP_HOST,
              port: smtpPort,
              secure: smtpPort === 465,
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
              },
            })
            .sendMail({
              from: `${SITE_NAME} <${process.env.FROM_EMAIL}>`,
              to: data.email,
              replyTo: process.env.FROM_EMAIL,
              subject: confirmationPayload.subject,
              text: confirmationPayload.text,
              html: confirmationPayload.html,
            });
        } catch (err) {
          console.error(
            "Guest acknowledgement unavailable:",
            err instanceof Error ? err.message : "unknown error",
          );
        }
      }
    }
  } else if (
    process.env.RESEND_API_KEY &&
    process.env.RESEND_FROM_EMAIL &&
    process.env.RESEND_TO_EMAIL
  ) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = `${SITE_NAME} <${process.env.RESEND_FROM_EMAIL}>`;
    const preference = data.apartmentPreference || "General / Undecided";

    try {
      const notificationPayload = buildGuestNotificationEmail({
        siteName: SITE_NAME,
        apartmentPreference: preference,
        dateSummary,
        guestName: data.name,
        guestEmail: data.email,
        guestPhone: data.phone,
        guestCount: data.guests,
        message: data.message,
      });
      const notification = await resend.emails.send({
        from,
        to: process.env.RESEND_TO_EMAIL,
        replyTo: data.email,
        subject: notificationPayload.subject,
        text: notificationPayload.text,
        html: notificationPayload.html,
      });
      if (notification?.data?.id) delivered = true;
      else console.error("Enquiry notification failed");
    } catch (err) {
      console.error(
        "Enquiry email unavailable:",
        err instanceof Error ? err.message : "unknown error",
      );
    }

    if (delivered) {
      try {
        const confirmationPayload = buildGuestConfirmationEmail({
          siteName: SITE_NAME,
          guestName: data.name,
          preference,
          dateSummary,
          guestCount: data.guests,
        });
        await resend.emails.send({
          from,
          to: data.email,
          replyTo: process.env.RESEND_FROM_EMAIL,
          subject: confirmationPayload.subject,
          text: confirmationPayload.text,
          html: confirmationPayload.html,
        });
      } catch (err) {
        console.error(
          "Guest acknowledgement unavailable:",
          err instanceof Error ? err.message : "unknown error",
        );
      }
    }
  }

  if (!delivered && stored) {
    return NextResponse.json(
      {
        error:
          "We received your enquiry but could not complete the confirmation delivery. Please try again later.",
      },
      { status: 503 },
    );
  }

  if (!delivered) {
    return NextResponse.json(
      {
        error:
          "We could not deliver your enquiry at the moment. Please try again later.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
