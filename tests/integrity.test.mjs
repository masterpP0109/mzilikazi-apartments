import test from "node:test";
import assert from "node:assert/strict";
import { enquirySchema } from "../lib/enquiry.ts";
import {
  accommodations,
  publishedAccommodations,
  isPublicMedia,
  reviews,
} from "../lib/property.ts";

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
test("pending accommodation retains legacy URLs without exposing facts", () => {
  assert.equal(accommodations.flatMap((a) => [a.slug, ...a.aliases]).length, 6);
  assert.equal(publishedAccommodations.length, 0);
  for (const a of accommodations) {
    assert.equal(a.name, null);
    assert.equal(a.guests, null);
    assert.equal(a.gallery.length, 0);
  }
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
  assert.equal(reviews.filter((r) => r.verified).length, 0);
});
