export type TripItem = {
  kind: "accommodation" | "experience" | "itinerary" | "day";
  id: string;
};
export type TripProfile = {
  traveller: string;
  adults: number;
  children: number;
  ages: string;
  dateMode: "known" | "flexible" | "deciding";
  arrival: string;
  departure: string;
  dateNotes: string;
  interests: string[];
  pace: string;
  notes: string;
  invoice: boolean;
};
export type Trip = { version: 1; items: TripItem[]; profile: TripProfile };
export const emptyProfile: TripProfile = {
  traveller: "",
  adults: 2,
  children: 0,
  ages: "",
  dateMode: "deciding",
  arrival: "",
  departure: "",
  dateNotes: "",
  interests: [],
  pace: "Balanced",
  notes: "",
  invoice: false,
};
export const emptyTrip: Trip = { version: 1, items: [], profile: emptyProfile };
const string = (v: unknown, max = 1000) =>
  typeof v === "string" ? v.slice(0, max) : "";
const count = (v: unknown, fallback: number, min: number) =>
  typeof v === "number" && Number.isInteger(v) && v >= min && v <= 20
    ? v
    : fallback;
export function restoreTrip(raw: unknown): Trip {
  if (
    !raw ||
    typeof raw !== "object" ||
    !("version" in raw) ||
    raw.version !== 1
  )
    return { ...emptyTrip, profile: { ...emptyProfile } };
  const value = raw as Record<string, unknown>;
  const p = (
    value.profile && typeof value.profile === "object" ? value.profile : {}
  ) as Record<string, unknown>;
  const items: TripItem[] = [];
  if (Array.isArray(value.items))
    for (const item of value.items.slice(0, 60)) {
      if (
        item &&
        typeof item === "object" &&
        ["accommodation", "experience", "itinerary", "day"].includes(
          item.kind,
        ) &&
        typeof item.id === "string" &&
        /^[a-z0-9-]{1,80}$/.test(item.id) &&
        !items.some((x) => x.kind === item.kind && x.id === item.id)
      )
        items.push({ kind: item.kind, id: item.id });
    }
  return {
    version: 1,
    items,
    profile: {
      traveller: string(p.traveller, 60),
      adults: count(p.adults, 2, 1),
      children: Math.min(count(p.children, 0, 0), 20 - count(p.adults, 2, 1)),
      ages: string(p.ages, 120),
      dateMode:
        p.dateMode === "known"
          ? "known"
          : p.dateMode === "flexible"
            ? "flexible"
            : "deciding",
      arrival: string(p.arrival, 10),
      departure: string(p.departure, 10),
      dateNotes: string(p.dateNotes, 200),
      interests: Array.isArray(p.interests)
        ? p.interests
            .filter((i): i is string => typeof i === "string")
            .slice(0, 7)
            .map((i) => i.slice(0, 40))
        : [],
      pace: string(p.pace, 60) || "Balanced",
      notes: string(p.notes, 1500),
      invoice: p.invoice === true,
    },
  };
}
export function toggleTripItem(items: TripItem[], item: TripItem): TripItem[] {
  return items.some((i) => i.kind === item.kind && i.id === item.id)
    ? items.filter((i) => !(i.kind === item.kind && i.id === item.id))
    : [...items, item].slice(0, 60);
}
export function tripMessage(
  trip: Trip,
  resolve: (item: TripItem) => string,
): string {
  const p = trip.profile;
  return [
    "My Victoria Falls trip",
    p.traveller && "Travelling with: " + p.traveller,
    "Adults: " + p.adults + "; children: " + p.children,
    p.children > 0 && p.ages && "Children’s ages: " + p.ages,
    p.dateMode === "known"
      ? "Dates: " + p.arrival + " to " + p.departure
      : "Dates: " + (p.dateMode === "flexible" ? "Flexible" : "Still deciding"),
    p.dateNotes,
    "Interests: " + (p.interests.join(", ") || "Open to ideas"),
    "Pace: " + p.pace,
    p.invoice && "Please advise on invoicing",
    ...trip.items.map((item) => item.kind + ": " + resolve(item)),
    p.notes,
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 5000);
}
