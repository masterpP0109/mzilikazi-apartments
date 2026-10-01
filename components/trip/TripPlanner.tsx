"use client";
import { useState, useRef } from "react";
import { useTrip, AddToTrip } from "./TripProvider";
import { interests, itineraries } from "@/lib/planning";
import { publishedAccommodations, experiences } from "@/lib/property";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { tripMessage } from "@/lib/trip";
import { tripDescription } from "./TripProvider";
import { whatsappUrl, SITE_NAME } from "@/lib/constants";
import Link from "next/link";
export default function TripPlanner({
  initialSegment,
  initialInterest,
}: {
  initialSegment?: string;
  initialInterest?: string;
}) {
  const { trip, update, ready, notice } = useTrip();
  const p = trip.profile;
  const [interestOverride, setInterestOverride] = useState(initialInterest);
  const selectedInterests =
    interestOverride && interests.includes(interestOverride)
      ? Array.from(new Set([...p.interests, interestOverride]))
      : p.interests;
  const [step, setStep] = useState(1);
  const [segmentOverride, setSegmentOverride] = useState(initialSegment);
  const [sending, setSending] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const kinds = ["Couple", "Family", "Friends", "Group", "Solo", "Work"];
  const changeStep = (n: number) => {
    setStep(n);
    requestAnimationFrame(() => heading.current?.focus());
  };
  const kind = kinds.includes(segmentOverride || "")
    ? segmentOverride!
    : p.traveller;
  const recommended = publishedAccommodations.filter(
    (a) =>
      a.guests != null &&
      a.guests >= p.adults + p.children &&
      (!a.idealFor.length ||
        a.idealFor.some((s) => s.toLowerCase().includes(kind.toLowerCase()))),
  );
  const itinerary =
    itineraries[
      p.pace === "Make It Special"
        ? 2
        : selectedInterests.includes("Wildlife")
          ? 1
          : 0
    ];
  const relevant = experiences.filter(
    (e) =>
      e.enabled &&
      (selectedInterests.includes(e.category) ||
        (e.category === "The Falls" &&
          selectedInterests.includes("Victoria Falls"))),
  );
  const message = tripMessage(
    {
      ...trip,
      profile: { ...p, traveller: kind, interests: selectedInterests },
    },
    tripDescription,
  );
  const whatsapp = whatsappUrl("Hello " + SITE_NAME + ",\n" + message);
  return (
    <div className="planner-flow">
      <h2 ref={heading} tabIndex={-1}>
        {sending ? "Send your plan" : "Your trip, one step at a time."}
      </h2>
      {notice && (
        <p role="status" className="form-note">
          {notice}
        </p>
      )}
      {sending ? (
        <>
          <button className="text-link" onClick={() => setSending(false)}>
            ← Back to your starting point
          </button>
          <EnquiryForm
            allowFlexibleDates
            initialValues={{
              message,
              guests: Math.min(20, p.adults + p.children),
              apartmentPreference: kind,
              dateMode: p.dateMode,
              arrivalDate: p.arrival,
              departureDate: p.departure,
            }}
          />
        </>
      ) : (
        <>
          <p className="eyebrow">Step {step} of 6</p>
          <progress aria-label="Trip planner progress" value={step} max={6} />
          <form
            className="enquiry-form"
            onSubmit={(e) => {
              e.preventDefault();
              update({ traveller: kind, interests: selectedInterests });
              changeStep(Math.min(6, step + 1));
            }}
          >
            {step === 1 && (
              <fieldset>
                <legend>Who are you travelling with?</legend>
                <div className="choice-grid">
                  {kinds.map((k) => (
                    <label key={k} className="choice">
                      <input
                        type="radio"
                        name="traveller"
                        value={k}
                        checked={kind === k}
                        required
                        onChange={() => {
                          setSegmentOverride(undefined);
                          update({ traveller: k });
                        }}
                      />
                      {k}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
            {step === 2 && (
              <>
                <h3>How many people?</h3>
                <div className="field-row">
                  <label className="field">
                    Adults
                    <input
                      type="number"
                      min={1}
                      max={20 - p.children}
                      value={p.adults}
                      required
                      onChange={(e) =>
                        update({ adults: Number(e.target.value) })
                      }
                    />
                  </label>
                  <label className="field">
                    Children
                    <input
                      type="number"
                      min={0}
                      max={20 - p.adults}
                      value={p.children}
                      required
                      onChange={(e) =>
                        update({ children: Number(e.target.value) })
                      }
                    />
                  </label>
                </div>
                {p.children > 0 && (
                  <label className="field">
                    Children’s ages (optional)
                    <input
                      value={p.ages}
                      maxLength={120}
                      placeholder="For example: 4 and 9"
                      onChange={(e) => update({ ages: e.target.value })}
                    />
                  </label>
                )}
                <p className="form-note">
                  For more than 20 people, add your group size in the notes.
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <h3>When are you thinking of coming?</h3>
                <label className="field">
                  Your dates
                  <select
                    value={p.dateMode}
                    onChange={(e) =>
                      update({ dateMode: e.target.value as typeof p.dateMode })
                    }
                  >
                    <option value="known">Known dates</option>
                    <option value="flexible">Flexible dates</option>
                    <option value="deciding">Still deciding</option>
                  </select>
                </label>
                {p.dateMode === "known" ? (
                  <div className="field-row">
                    <label className="field">
                      Arrival
                      <input
                        type="date"
                        value={p.arrival}
                        min={new Date().toISOString().slice(0, 10)}
                        required
                        onChange={(e) => update({ arrival: e.target.value })}
                      />
                    </label>
                    <label className="field">
                      Departure
                      <input
                        type="date"
                        value={p.departure}
                        min={
                          p.arrival
                            ? new Date(Date.parse(p.arrival) + 86400000)
                                .toISOString()
                                .slice(0, 10)
                            : undefined
                        }
                        required
                        onChange={(e) => update({ departure: e.target.value })}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="field">
                    Any month or length of stay in mind? (optional)
                    <input
                      maxLength={200}
                      value={p.dateNotes}
                      onChange={(e) => update({ dateNotes: e.target.value })}
                    />
                  </label>
                )}
              </>
            )}
            {step === 4 && (
              <fieldset>
                <legend>What are you interested in?</legend>
                <div className="choice-grid">
                  {interests.map((i) => (
                    <label key={i} className="choice">
                      <input
                        type="checkbox"
                        checked={selectedInterests.includes(i)}
                        onChange={() => {
                          setInterestOverride(undefined);
                          update({
                            interests: selectedInterests.includes(i)
                              ? selectedInterests.filter((v) => v !== i)
                              : [...selectedInterests, i],
                          });
                        }}
                      />
                      {i}
                    </label>
                  ))}
                </div>
                <p className="form-note">
                  You can leave this open and ask for ideas.
                </p>
              </fieldset>
            )}
            {step === 5 && (
              <>
                <fieldset>
                  <legend>How do you like to travel?</legend>
                  <div className="choice-grid">
                    {["Keep It Simple", "Balanced", "Make It Special"].map(
                      (i) => (
                        <label key={i} className="choice">
                          <input
                            type="radio"
                            name="pace"
                            checked={p.pace === i}
                            onChange={() => update({ pace: i })}
                          />
                          {i}
                        </label>
                      ),
                    )}
                  </div>
                </fieldset>
                <label className="field">
                  Anything else we should know?
                  <textarea
                    value={p.notes}
                    maxLength={1500}
                    onChange={(e) => update({ notes: e.target.value })}
                  />
                </label>
                <label className="choice">
                  <input
                    type="checkbox"
                    checked={p.invoice}
                    onChange={(e) => update({ invoice: e.target.checked })}
                  />
                  Ask about invoicing
                </label>
              </>
            )}
            {step === 6 && (
              <>
                <h3>A suggested starting point.</h3>
                <p className="form-note">
                  These are ideas to discuss, subject to availability and
                  suitability. Save the ones you like.
                </p>
                <section className="planner-result">
                  <h4>Accommodation</h4>
                  {recommended.length ? (
                    recommended.map((a) => (
                      <div key={a.slug}>
                        <Link
                          className="text-link"
                          href={"/apartments/" + a.slug}
                        >
                          {a.name}
                        </Link>
                        <AddToTrip kind="accommodation" id={a.slug} />
                      </div>
                    ))
                  ) : (
                    <p>
                      Ask us which space suits {p.adults + p.children} guests.
                      We’ll need to confirm room layouts, facilities and
                      availability before recommending an apartment.
                    </p>
                  )}
                </section>
                <section className="planner-result">
                  <h4>Suggested itinerary</h4>
                  <p>
                    {itinerary.nights} nights · {itinerary.title}
                  </p>
                  <Link
                    className="text-link"
                    href={"/plan/itineraries/" + itinerary.id}
                  >
                    View itinerary →
                  </Link>
                  <AddToTrip kind="itinerary" id={itinerary.id} />
                </section>
                <section className="planner-result">
                  <h4>Relevant activities</h4>
                  {relevant.length ? (
                    relevant.map((e) => (
                      <div key={e.slug}>
                        <Link
                          className="text-link"
                          href={"/experiences/" + e.slug}
                        >
                          {e.title}
                        </Link>
                        <AddToTrip kind="experience" id={e.slug} />
                      </div>
                    ))
                  ) : (
                    <p>
                      Keep a day open, or explore the experience ideas to find a
                      starting point.
                    </p>
                  )}
                </section>
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => setSending(true)}
                >
                  Send My Plan to Mzilikazi
                </button>
                {whatsapp && (
                  <a className="text-link" href={whatsapp}>
                    Talk to us on WhatsApp →
                  </a>
                )}
              </>
            )}
            <div className="actions">
              {step > 1 && (
                <button
                  type="button"
                  className="text-link"
                  onClick={() => changeStep(step - 1)}
                >
                  ← Back
                </button>
              )}
              {step < 6 && (
                <button disabled={!ready} className="button button-primary">
                  {step === 5 ? "See my starting point" : "Continue"} →
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}
