import test from "node:test";
import assert from "node:assert/strict";
import {
  restoreTrip,
  toggleTripItem,
  tripMessage,
  emptyTrip,
} from "../lib/trip.ts";
import { enquirySchema } from "../lib/enquiry.ts";
test("saved trips tolerate corrupt data and incompatible versions", () => {
  for (const raw of [
    null,
    [],
    { version: 2 },
    { version: 1, items: "bad", profile: null },
  ])
    assert.equal(restoreTrip(raw).items.length, 0);
});
test("saved ideas are deduplicated and unsafe item IDs are discarded", () => {
  const item = { kind: "experience", id: "chobe-day-trip" };
  const trip = restoreTrip({
    version: 1,
    items: [
      item,
      item,
      { kind: "experience", id: "<script>" },
      { kind: "other", id: "test" },
    ],
  });
  assert.deepEqual(trip.items, [item]);
  assert.deepEqual(toggleTripItem(trip.items, item), []);
});
test("plan messages contain travellers, flexible dates and saved ideas", () => {
  const trip = {
    ...emptyTrip,
    profile: {
      ...emptyTrip.profile,
      traveller: "Family",
      children: 2,
      ages: "4 and 9",
      dateMode: "flexible",
      dateNotes: "June, about five nights",
    },
    items: [{ kind: "itinerary", id: "five-nights" }],
  };
  const message = tripMessage(trip, () => "Take Your Time");
  for (const text of [
    "Family",
    "children: 2",
    "4 and 9",
    "Flexible",
    "June",
    "Take Your Time",
  ])
    assert.ok(message.includes(text));
  assert.ok(message.length <= 5000);
});
const guest = { name: "Test Guest", email: "guest@example.org", guests: 2 };
test("flexible enquiries require contact details but do not require invented dates", () => {
  assert.ok(
    enquirySchema.safeParse({
      ...guest,
      dateMode: "flexible",
      arrivalDate: "",
      departureDate: "",
    }).success,
  );
  assert.ok(
    enquirySchema.safeParse({ ...guest, dateMode: "deciding" }).success,
  );
  assert.equal(
    enquirySchema.safeParse({ ...guest, dateMode: "known" }).success,
    false,
  );
  assert.equal(enquirySchema.safeParse({ ...guest }).success, false);
  assert.equal(
    enquirySchema.safeParse({
      ...guest,
      dateMode: "flexible",
      email: "invalid",
    }).success,
    false,
  );
});
test("traditional enquiries still reject past arrival dates", () => {
  assert.equal(
    enquirySchema.safeParse({
      ...guest,
      arrivalDate: "2020-01-01",
      departureDate: "2020-01-03",
    }).success,
    false,
  );
});
