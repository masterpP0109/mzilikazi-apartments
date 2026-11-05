import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";
import { enquirySchema } from "../lib/enquiry.ts";
import {
  accommodations,
  publishedAccommodations,
  isPublicMedia,
  reviews,
} from "../lib/property.ts";
import {
  buildGuestNotificationEmail,
  buildGuestConfirmationEmail,
  parseEmailRecipients,
} from "../lib/email.ts";

const port = 3187;
let server;

test.before(async () => {
  const build = spawn(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
    stdio: "inherit",
    windowsHide: true,
  });
  await new Promise((resolve, reject) => {
    build.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Next.js build failed with exit code ${code}`));
    });
    build.on("error", reject);
  });

  const env = {
    ...process.env,
    NODE_ENV: "production",
    DATABASE_URL: "",
    RESEND_API_KEY: "",
    RESEND_FROM_EMAIL: "",
    RESEND_TO_EMAIL: "",
    SUPABASE_SERVICE_ROLE_KEY: "",
    NEXT_PUBLIC_SUPABASE_URL: "",
    NEXT_PRIVATE_TEST_MODE: "1",
  };
  server = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "-p",
      String(port),
      "-H",
      "127.0.0.1",
    ],
    { env, stdio: "ignore", windowsHide: true },
  );

  for (let i = 0; i < 80; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${port}/api/health`)).ok) break;
    } catch {}
    await setTimeout(250);
  }
});

test.after(() => server?.kill());

const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
const later = new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10);
const valid = {
  name: "Test Guest",
  email: "guest@example.org",
  arrivalDate: tomorrow,
  departureDate: later,
  guests: 2,
};
test("valid enquiries pass without optional accommodation facts", () =>
  assert.ok(enquirySchema.safeParse(valid).success));
test("departure must be after arrival", () =>
  assert.equal(
    enquirySchema.safeParse({ ...valid, departureDate: tomorrow }).success,
    false,
  ));
test("calendar dates, contact details and whole guest counts are validated", () => {
  for (const overrides of [
    { arrivalDate: "2099-02-30" },
    { email: "invalid" },
    { guests: 0 },
    { guests: 21 },
    { guests: 1.5 },
  ])
    assert.equal(
      enquirySchema.safeParse({ ...valid, ...overrides }).success,
      false,
    );
});
test("accommodation retains legacy URLs and publishes confirmed units", () => {
  assert.equal(accommodations.flatMap((a) => [a.slug, ...a.aliases]).length, 14);
  assert.equal(publishedAccommodations.length, 3);
  // Mangwana Suite (index 2) remains pending without exposed gallery until photos are ready
  const pending = accommodations[2];
  assert.equal(pending.gallery.length, 0);
});
test("development and unverified photos never qualify as public media", () => {
  const photo = {
    src: "/real-photo.webp",
    alt: "Property courtyard",
    kind: "property",
    verified: true,
  };
  assert.equal(isPublicMedia(photo), true);
  assert.equal(isPublicMedia({ ...photo, verified: false }), false);
  assert.equal(isPublicMedia({ ...photo, kind: "development" }), false);
  assert.equal(isPublicMedia(null), false);
  assert.ok(reviews.length > 0);
});

test("enquiry emails include explicit subjects for provider compatibility", () => {
  const notification = buildGuestNotificationEmail({
    siteName: "Mzilikazi Apartments",
    apartmentPreference: "Mzilikazi Suite",
    dateSummary: "2026-11-10 to 2026-11-12",
    guestName: "Test Guest",
    guestEmail: "guest@example.org",
    guestPhone: "+263 77 123 4567",
    guestCount: 2,
    message: "Early check-in please.",
  });
  assert.match(notification.subject, /enquiry/i);
  assert.ok(notification.text.includes("New Accommodation Enquiry"));

  const acknowledgement = buildGuestConfirmationEmail({
    siteName: "Mzilikazi Apartments",
    guestName: "Test Guest",
    preference: "Mzilikazi Suite",
    dateSummary: "2026-11-10 to 2026-11-12",
    guestCount: 2,
  });
  assert.match(acknowledgement.subject, /received your enquiry/i);
  assert.ok(acknowledgement.text.includes("Thank you"));
});

test("recipient parsing ignores blanks and garbage entries in SMTP lists", () => {
  const recipients = parseEmailRecipients(
    "info@mzilikaziapartments.com, , lets test the emails and the enqury now , info@other.com",
  );

  assert.deepEqual(recipients, [
    "info@mzilikaziapartments.com",
    "info@other.com",
  ]);
});

test("health endpoint exposes safe liveness status", async () => {
  const response = await fetch("http://127.0.0.1:3187/api/health");
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.status, "ok");
  assert.equal(body.service, "mzilikazi-apartments");
});
