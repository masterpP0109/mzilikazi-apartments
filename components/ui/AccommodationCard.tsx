import { AddToTrip } from "@/components/trip/TripProvider";
import { ImageFrame, TextLink } from "./Editorial";
import { isPublicMedia, type Accommodation } from "@/lib/property";
export function AccommodationFacts({
  apartment: a,
}: {
  apartment: Accommodation;
}) {
  if (!a.confirmed) return null;
  return (
    <div className="facts">
      {a.guests != null && <span>Up to {a.guests} guests</span>}
      {a.bedrooms != null && (
        <span>
          {a.bedrooms} {a.bedrooms === 1 ? "bedroom" : "bedrooms"}
        </span>
      )}
      {a.bathrooms != null && <span>{a.bathrooms} bathrooms</span>}
      {(a.kitchen.length > 0 || a.facilities.kitchen === true) && (
        <span>Kitchen</span>
      )}
      {a.facilities.lounge === true && <span>Lounge</span>}
      {a.facilities.wifi === true && <span>Wi-Fi</span>}
      {a.facilities.airConditioning === true && <span>Air conditioning</span>}
      {a.facilities.outdoor && <span>{a.facilities.outdoor}</span>}
    </div>
  );
}
export function AccommodationCard({
  apartment: a,
}: {
  apartment: Accommodation;
}) {
  if (!a.confirmed || !a.name) return null;
  return (
    <article className="accommodation-card">
      <ImageFrame
        media={
          a.gallery.find((m) => isPublicMedia(m) && m.kind === "property") ??
          null
        }
      />
      <h3>{a.name}</h3>
      {a.description && <p>{a.description}</p>}
      <AccommodationFacts apartment={a} />
      {a.idealFor.length > 0 && (
        <p className="form-note">Best for: {a.idealFor.join(", ")}</p>
      )}
      {a.rate && <p>{a.rate}</p>}
      <div className="actions">
        <TextLink href={`/apartments/${a.slug}`}>
          Explore This Apartment
        </TextLink>
        <AddToTrip kind="accommodation" id={a.slug} />
      </div>
    </article>
  );
}
export function AccommodationFallback() {
  return (
    <div className="empty-accommodation">
      <h3>
        A stay that fits
        <br />
        the way you travel.
      </h3>
      <div>
        <p>
          Travelling together, taking a little time away or visiting for work?
          Tell us your dates and who is coming. Ask for the accommodation
          options and current rates for your stay.
        </p>
        <div className="actions">
          <TextLink href="/plan">Help Me Choose</TextLink>
        </div>
      </div>
    </div>
  );
}
