export function parseEmailRecipients(value?: string): string[] {
  if (!value) return [];

  const recipients = value
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean)
    .filter((address) => address.includes("@") && address.includes("."));

  return [...new Set(recipients)];
}

export function buildGuestNotificationEmail({
  siteName,
  apartmentPreference,
  dateSummary,
  guestName,
  guestEmail,
  guestPhone,
  guestCount,
  message,
}: {
  siteName: string;
  apartmentPreference: string;
  dateSummary: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string | undefined;
  guestCount: number;
  message?: string;
}) {
  const subject = `New accommodation enquiry — ${siteName}`;
  const text = [
    `New Accommodation Enquiry — ${siteName}`,
    "",
    `Guest: ${guestName}`,
    `Email: ${guestEmail}`,
    `Phone: ${guestPhone ?? "Not provided"}`,
    `Dates: ${dateSummary}`,
    `Guests: ${guestCount}`,
    `Apartment Preference: ${apartmentPreference}`,
    "",
    "Message / Notes:",
    message || "No additional message",
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; color: #1a1a1a; line-height: 1.6;">
      <h2 style="color: #92542B; margin-bottom: 8px;">New Accommodation Enquiry</h2>
      <p style="font-size: 16px; margin-top: 0;">You have received a new enquiry via the <strong>${siteName}</strong> website.</p>
      <div style="background-color: #f7f5f0; border-radius: 8px; padding: 18px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #666; width: 140px;"><strong>Apartment:</strong></td>
            <td style="padding: 6px 0; font-weight: 600; color: #111;">${apartmentPreference}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #666;"><strong>Dates:</strong></td>
            <td style="padding: 6px 0;">${dateSummary}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #666;"><strong>Guests:</strong></td>
            <td style="padding: 6px 0;">${guestCount}</td>
          </tr>
        </table>
      </div>
      <h3 style="color: #333; margin-top: 24px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Guest Information</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #666; width: 140px;"><strong>Name:</strong></td>
          <td style="padding: 6px 0;">${guestName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #666;"><strong>Email:</strong></td>
          <td style="padding: 6px 0;"><a href="mailto:${guestEmail}" style="color: #92542B;">${guestEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #666;"><strong>Phone / WhatsApp:</strong></td>
          <td style="padding: 6px 0;">${guestPhone ? `<a href="https://wa.me/${guestPhone.replace(/[^0-9]/g, '')}">${guestPhone}</a>` : "Not provided"}</td>
        </tr>
      </table>
      ${message ? `<div style="background: #fff; border: 1px solid #e0ded9; border-radius: 6px; padding: 14px; margin-top: 14px;"><p style="margin: 0 0 6px 0; color: #666; font-size: 13px;"><strong>Special Requests / Message:</strong></p><p style="margin: 0; white-space: pre-wrap;">${message}</p></div>` : ""}
      <div style="margin-top: 30px;">
        <a href="mailto:${guestEmail}?subject=Regarding your enquiry at ${siteName}" style="background-color: #92542B; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 500;">Reply Directly to Guest</a>
      </div>
    </div>
  `;

  return { subject, text, html };
}

export function buildGuestConfirmationEmail({
  siteName,
  guestName,
  preference,
  dateSummary,
  guestCount,
}: {
  siteName: string;
  guestName: string;
  preference: string;
  dateSummary: string;
  guestCount: number;
}) {
  const subject = `We've received your enquiry — ${siteName}`;
  const text = [
    `Hello ${guestName},`,
    "",
    `Thank you for reaching out to ${siteName}. We have received your enquiry for ${preference} (${dateSummary}, ${guestCount} guests).`,
    "",
    "Our team in Victoria Falls will review availability and get back to you shortly with rates and arrangements.",
    "",
    "Warm regards,",
    siteName,
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; color: #1a1a1a; line-height: 1.6;">
      <h2 style="color: #92542B;">Thank you, ${guestName}.</h2>
      <p>We have received your enquiry for <strong>${preference}</strong> in Victoria Falls.</p>
      <div style="background-color: #f7f5f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="margin: 4px 0;"><strong>Stay dates:</strong> ${dateSummary}</p>
        <p style="margin: 4px 0;"><strong>Guests:</strong> ${guestCount}</p>
      </div>
      <p>Our reservations team will confirm availability and reply to you with rates and details shortly.</p>
      <p style="margin-top: 28px; color: #555;">
        Warm regards,<br />
        <strong>${siteName} Team</strong><br />
        Victoria Falls, Zimbabwe
      </p>
    </div>
  `;

  return { subject, text, html };
}
