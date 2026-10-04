import { publishedAccommodations, type Accommodation } from "@/lib/property";
import { TextLink } from "./Editorial";
const pending = "To be confirmed";
export function apartmentAttributes(a: Accommodation) {
  const flag = (v: boolean | null) => (v == null ? pending : v ? "Yes" : "No");
  return [
    ["Sleeps", a.guests ?? pending],
    ["Bedrooms", a.bedrooms ?? pending],
    ["Bathrooms", a.bathrooms ?? (a.amenities.includes("En-suite bathrooms") ? "En-suite bathrooms" : pending)],
    [
      "Kitchen",
      a.kitchen.length
        ? "Fully equipped kitchen with microwave"
        : flag(a.facilities.kitchen),
    ],
    ["Lounge", flag(a.facilities.lounge)],
    ["Wi-Fi", flag(a.facilities.wifi)],
    ["Air conditioning", flag(a.facilities.airConditioning)],
    ["Parking", a.policies.find((p) => p.label === "Parking")?.value ?? flag(a.facilities.parking)],
    ["Outdoor space", a.facilities.outdoor ?? pending],
    ["Best suited for", a.idealFor.join(", ") || pending],
    ["Price", a.rate ?? pending],
  ];
}
export default function ApartmentComparison({ exclude }: { exclude?: string }) {
  const apartments = publishedAccommodations.filter((a) => a.slug !== exclude);
  return (
    <section id="compare" className="comparison-section">
      <h2>
        {exclude
          ? "Compare with another apartment."
          : "See which apartment fits."}
      </h2>
      {apartments.length ? (
        <div className="comparison-grid">
          {apartments.map((a) => (
            <article className="comparison-card" key={a.slug}>
              <h3>{a.name}</h3>
              <dl>
                {apartmentAttributes(a).map(([label, value]) => (
                  <div className="comparison-fact" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <TextLink href={"/apartments/" + a.slug}>
                Explore This Apartment
              </TextLink>
            </article>
          ))}
        </div>
      ) : (
        <p>
          Tell us about your group and ask for a comparison of current
          accommodation options, including room layouts, facilities and rates.
        </p>
      )}
      <div className="actions">
        <TextLink href="/plan">
          Not sure which one fits your group? Help Me Choose
        </TextLink>
      </div>
    </section>
  );
}
