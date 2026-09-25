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
      {a.kitchen.length > 0 && <span>Kitchen</span>}
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
      <TextLink href={`/apartments/${a.slug}`}>View apartment</TextLink>
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
          <TextLink href="/contact">Find your space</TextLink>
        </div>
      </div>
    </div>
  );
}
