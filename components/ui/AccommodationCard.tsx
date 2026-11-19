import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageFrame, TextLink } from "./Editorial";
import { isPublicMedia, type Accommodation, type PropertyMedia } from "@/lib/property";

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
      {a.bathrooms != null ? (
        <span>
          {a.bathrooms} {a.bathrooms === 1 ? "bathroom" : "bathrooms"}
        </span>
      ) : (
        a.amenities.includes("En-suite bathrooms") && (
          <span>En-suite bathrooms</span>
        )
      )}
      {(a.kitchen.length > 0 || a.facilities.kitchen === true) && (
        <span>Self-catering kitchen</span>
      )}
      {a.facilities.wifi === true && <span>Wi-Fi</span>}
      {a.facilities.airConditioning === true && <span>Air conditioning</span>}
      {a.facilities.outdoor && <span>{a.facilities.outdoor}</span>}
    </div>
  );
}

export function AccommodationCard({
  apartment: a,
  propertyPreview = null,
}: {
  apartment: Accommodation;
  propertyPreview?: PropertyMedia | null;
}) {
  if (!a.confirmed || !a.name) return null;
  const primaryImage =
    a.gallery.find((m) => isPublicMedia(m) && m.kind === "property") ??
    propertyPreview;

  return (
    <article className="accommodation-card">
      <ImageFrame
        sizes="(max-width: 639px) 92vw, (max-width: 1023px) 44vw, 30vw"
        media={primaryImage}
      />
      <h3>{a.name}</h3>
      {a.description && <p>{a.description}</p>}
      <AccommodationFacts apartment={a} />
      {a.sleeping[0] && (
        <p className="form-note">Sleeping setup: {a.sleeping[0]}</p>
      )}
      {a.rate && (
        <p>
          <strong>{a.rate}</strong>
        </p>
      )}
      <div className="actions">
        <Link className="button button-primary" href={`/apartments/${a.slug}`}>
          View Apartment Details <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link
          className="button button-secondary"
          href={`/contact?preference=${encodeURIComponent(a.name)}`}
        >
          Check Availability
        </Link>
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
          <TextLink href="/plan">Help Me Choose an Apartment</TextLink>
        </div>
      </div>
    </div>
  );
}
