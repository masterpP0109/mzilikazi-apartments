"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";
import {
  emptyTrip,
  restoreTrip,
  toggleTripItem,
  tripMessage,
  type Trip,
  type TripItem,
  type TripProfile,
} from "@/lib/trip";
import { publishedAccommodations, experiences } from "@/lib/property";
import { itineraries, dayIdeas } from "@/lib/planning";
import { whatsappUrl, SITE_NAME } from "@/lib/constants";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Link from "next/link";
const catalog = {
  accommodation: publishedAccommodations.map((a) => ({
    id: a.slug,
    title: a.name!,
    summary: a.description ?? "",
    href: "/apartments/" + a.slug,
  })),
  experience: experiences
    .filter((e) => e.enabled)
    .map((e) => ({
      id: e.slug,
      title: e.title,
      summary: e.description,
      href: "/experiences/" + e.slug,
    })),
  itinerary: itineraries.map((i) => ({
    id: i.id,
    title: i.title,
    summary:
      i.nights +
      " nights. " +
      i.days.map((day, n) => "Day " + (n + 1) + ": " + day.title).join("; "),
    href: "/plan/itineraries/" + i.id,
  })),
  day: dayIdeas.map((d) => ({
    id: d.id,
    title: d.title + " day idea",
    summary: d.stops.map(([time, idea]) => time + ": " + idea).join("; "),
    href: "/plan#day-ideas",
  })),
};
export function tripEntry(item: TripItem) {
  return catalog[item.kind].find((i) => i.id === item.id);
}

export function tripDescription(item: TripItem) {
  const entry = tripEntry(item);
  return entry
    ? entry.title + (entry.summary ? " — " + entry.summary : "")
    : "";
}

const serverSnapshot = { trip: emptyTrip, ready: false, notice: "" };
let snapshot = serverSnapshot;
const listeners = new Set<() => void>();
function loadSavedTrip() {
  try {
    const trip = restoreTrip(
      JSON.parse(localStorage.getItem("mzilikazi-trip-v1") || "null"),
    );
    trip.items = trip.items.filter((i) => tripEntry(i));
    snapshot = { trip, ready: true, notice: "" };
  } catch {
    snapshot = {
      trip: emptyTrip,
      ready: true,
      notice: "Saved ideas could not be loaded. You can start a new trip here.",
    };
  }
}
function subscribe(listener: () => void) {
  if (!snapshot.ready) loadSavedTrip();
  listeners.add(listener);
  const storage = (event: StorageEvent) => {
    if (event.key === "mzilikazi-trip-v1" || event.key === null) {
      loadSavedTrip();
      listeners.forEach((l) => l());
    }
  };
  window.addEventListener("storage", storage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", storage);
  };
}
function saveTrip(trip: Trip) {
  let notice = "";
  try {
    localStorage.setItem("mzilikazi-trip-v1", JSON.stringify(trip));
  } catch {
    notice =
      "Your ideas are available for this visit, but this browser could not save them for later.";
  }
  snapshot = { trip, ready: true, notice };
  listeners.forEach((l) => l());
}

const Context = createContext<{
  trip: Trip;
  ready: boolean;
  notice: string;
  toggle: (item: TripItem) => void;
  update: (profile: Partial<TripProfile>) => void;
  open: () => void;
} | null>(null);
export function useTrip() {
  const value = useContext(Context);
  if (!value) throw new Error("TripProvider is required");
  return value;
}
export default function TripProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { trip, ready, notice } = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => serverSnapshot,
  );
  const [opened, setOpened] = useState(false);
  const [sending, setSending] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!opened) return;
    const el = dialog.current;
    el?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el?.close();
      document.body.style.overflow = previous;
    };
  }, [opened]);
  const toggle = useCallback((item: TripItem) => {
    if (tripEntry(item))
      saveTrip({
        ...snapshot.trip,
        items: toggleTripItem(snapshot.trip.items, item),
      });
  }, []);
  const update = useCallback(
    (profile: Partial<TripProfile>) =>
      saveTrip({
        ...snapshot.trip,
        profile: { ...snapshot.trip.profile, ...profile },
      }),
    [],
  );
  const message = tripMessage(trip, tripDescription);
  const whatsapp = whatsappUrl("Hello " + SITE_NAME + ",\n" + message);
  return (
    <Context.Provider
      value={{
        trip,
        ready,
        notice,
        toggle,
        update,
        open: () => {
          setSending(false);
          setOpened(true);
        },
      }}
    >
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="my-trip-title"
        onCancel={() => setOpened(false)}
        onClose={() => setOpened(false)}
      >
        <div className="dialog-header">
          <div>
            <p className="eyebrow">Your saved ideas</p>
            <h2 id="my-trip-title">My Trip · {trip.items.length}</h2>
          </div>
          <button
            className="icon-button"
            aria-label="Close My Trip"
            onClick={() => setOpened(false)}
          >
            ✕
          </button>
        </div>
        {notice && (
          <p role="status" className="form-note">
            {notice}
          </p>
        )}
        {sending ? (
          <>
            <button className="text-link" onClick={() => setSending(false)}>
              ← Back to my ideas
            </button>
            <EnquiryForm
              allowFlexibleDates
              initialValues={{
                message,
                guests: Math.min(
                  20,
                  trip.profile.adults + trip.profile.children,
                ),
                apartmentPreference: trip.profile.traveller,
                dateMode: trip.profile.dateMode,
                arrivalDate: trip.profile.arrival,
                departureDate: trip.profile.departure,
              }}
            />
          </>
        ) : (
          <>
            {["accommodation", "experience", "itinerary", "day"].map((kind) => {
              const items = trip.items.filter((i) => i.kind === kind);
              return items.length ? (
                <section className="trip-group" key={kind}>
                  <h3>
                    {kind === "accommodation"
                      ? "Accommodation"
                      : kind === "experience"
                        ? "Activities / ideas"
                        : kind === "itinerary"
                          ? "Itineraries"
                          : "Day ideas"}
                  </h3>
                  <ul className="trip-list">
                    {items.map((i) => (
                      <li key={i.id}>
                        <Link
                          href={tripEntry(i)!.href}
                          onClick={() => setOpened(false)}
                        >
                          {tripEntry(i)!.title}
                        </Link>
                        <button
                          className="text-link"
                          onClick={() => toggle(i)}
                          aria-label={"Remove " + tripEntry(i)!.title}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null;
            })}
            {!trip.items.length && (
              <p>
                Nothing saved yet. Add an experience, apartment or itinerary as
                you explore.
              </p>
            )}
            <dl className="trip-profile">
              <div>
                <dt>Travellers</dt>
                <dd>
                  {trip.profile.adults} adults · {trip.profile.children}{" "}
                  children
                  {trip.profile.traveller ? " · " + trip.profile.traveller : ""}
                </dd>
              </div>
              <div>
                <dt>Dates</dt>
                <dd>
                  {trip.profile.dateMode === "known"
                    ? (trip.profile.arrival || "Choose arrival") +
                      " to " +
                      (trip.profile.departure || "choose departure")
                    : trip.profile.dateMode === "flexible"
                      ? "Flexible dates"
                      : "Still deciding"}
                </dd>
              </div>
              {trip.profile.interests.length > 0 && (
                <div>
                  <dt>Interests</dt>
                  <dd>{trip.profile.interests.join(", ")}</dd>
                </div>
              )}
            </dl>
            <div className="actions">
              <Link
                className="text-link"
                href="/plan"
                onClick={() => setOpened(false)}
              >
                Edit traveller details →
              </Link>
              <button
                className="button button-primary"
                onClick={() => setSending(true)}
              >
                Send My Trip to Mzilikazi
              </button>
              {whatsapp && (
                <a className="text-link" href={whatsapp}>
                  Share on WhatsApp →
                </a>
              )}
            </div>
            <p className="form-note">
              Ideas are saved on this device. Dates, rates and activities are
              confirmed separately.
            </p>
          </>
        )}
      </dialog>
    </Context.Provider>
  );
}
export function MyTripButton() {
  const { trip, ready, open } = useTrip();
  return (
    <button className="text-link my-trip-button" onClick={open}>
      My Trip · {ready ? trip.items.length : 0}
    </button>
  );
}
export function AddToTrip({
  kind,
  id,
}: {
  kind: TripItem["kind"];
  id: string;
}) {
  const { trip, ready, toggle } = useTrip();
  const saved = trip.items.some((i) => i.kind === kind && i.id === id);
  return (
    <button
      type="button"
      disabled={!ready}
      className="text-link"
      aria-pressed={saved}
      onClick={() => toggle({ kind, id })}
    >
      {saved ? "✓ Saved to My Trip" : "+ Add to My Trip"}
    </button>
  );
}
