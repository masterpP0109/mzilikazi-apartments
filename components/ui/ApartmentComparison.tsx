import { publishedAccommodations, type Accommodation } from "@/lib/property";
import { TextLink } from "./Editorial";

export function apartmentAttributes(a: Accommodation): [string, string | number][] {
  const rows: [string, string | number][] = [];

  if (a.guests != null) rows.push(["Sleeps", `Up to ${a.guests} guests`]);
  if (a.bedrooms != null) rows.push(["Bedrooms", a.bedrooms]);
  if (a.sleeping[0]) rows.push(["Sleeping setup", a.sleeping[0]]);
  if (a.bathrooms != null) {
    rows.push(["Bathrooms", a.bathrooms === 1 ? "1 bathroom (full bathtub)" : `${a.bathrooms} bathrooms`]);
  } else if (a.sleeping[2]) {
    rows.push(["Bathrooms", a.sleeping[2]]);
  } else if (a.amenities.includes("En-suite bathrooms")) {
    rows.push(["Bathrooms", "En-suite bathrooms"]);
  }
  if (a.facilities.outdoor) {
    rows.push(["Entrance & outdoor", a.facilities.outdoor]);
  }
  if (a.kitchen.length > 0 || a.facilities.kitchen === true) {
    rows.push(["Kitchen", "Fully equipped kitchen with microwave"]);
  }
  if (a.facilities.wifi === true) rows.push(["Wi-Fi", "Included"]);
  if (a.facilities.airConditioning === true) rows.push(["Air conditioning", "Included"]);
  const parking = a.policies.find((p) => p.label === "Parking")?.value;
  if (parking) rows.push(["Parking", parking]);
  if (a.rate) rows.push(["Rate", a.rate]);

  return rows;
}

export default function ApartmentComparison({ exclude }: { exclude?: string }) {
  const apartments = publishedAccommodations.filter((a) => a.slug !== exclude);
  return (
    <section id="compare" className="comparison-section">
      <h2>
        {exclude
          ? "Compare with another apartment."
          : "Compare our three apartments."}
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
                View Apartment Details
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
          Not sure which one fits your group? Help Me Choose an Apartment
        </TextLink>
      </div>
    </section>
  );
}
