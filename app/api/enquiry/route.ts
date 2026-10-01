import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { enquirySchema } from "@/lib/enquiry";
import { SITE_NAME } from "@/lib/constants";
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
    try {
      const notification = await resend.emails.send({
        from,
        to: process.env.RESEND_TO_EMAIL,
        replyTo: data.email,
        subject: `New accommodation enquiry — ${data.arrivalDate || data.dateMode || "dates to discuss"}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone ?? ""}\nArrival: ${data.arrivalDate}\nDeparture: ${data.departureDate || "to discuss"}\nGuests: ${data.guests}\nPreference: ${data.apartmentPreference ?? ""}\nMessage: ${data.message ?? ""}`,
      });
      if (!notification.error) delivered = true;
      else console.error("Enquiry notification failed");
    } catch {
      console.error("Enquiry email unavailable");
    }
    if (delivered) {
      try {
        await resend.emails.send({
          from,
          to: data.email,
          subject: `Your enquiry — ${SITE_NAME}`,
          text: `Thank you for contacting ${SITE_NAME}. We have received your enquiry ${dateSummary}, for ${data.guests} guests. Availability and booking confirmation will follow separately.`,
        });
      } catch {
        console.error("Guest acknowledgement unavailable");
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
