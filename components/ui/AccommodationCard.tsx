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
  const bathroomText =
    a.bathrooms != null
      ? `${a.bathrooms} ${a.bathrooms === 1 ? "bathroom" : "bathrooms"}`
      : a.sleeping.find((s) => s.toLowerCase().includes("bathroom")) ??
        a.sleeping.find((s) => s.toLowerCase().includes("shower"));

  return (
    <div className="facts">
      {a.guests != null && <span>Up to {a.guests} guests</span>}
      {a.bedrooms != null && (
        <span>
          {a.bedrooms} {a.bedrooms === 1 ? "bedroom" : "bedrooms"}
        </span>
      )}
      {bathroomText && <span>{bathroomText}</span>}
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
  const summary = a.cardSummary ?? a.description;
  const metaParts = [
    a.guests != null ? `${a.guests} guests` : null,
    a.bedrooms != null ? `${a.bedrooms} bedrooms` : null,
  ].filter(Boolean);

  return (
    <article className="accommodation-card accommodation-card-compact">
      <ImageFrame
        ratio="landscape"
        sizes="(max-width: 639px) 92vw, (max-width: 1023px) 44vw, 30vw"
        media={primaryImage}
      />
      <div className="accommodation-card-body">
        <h3>{a.name}</h3>
        {summary && <p className="accommodation-card-summary">{summary}</p>}
        <div className="accommodation-card-meta">
          {metaParts.length > 0 && (
            <p className="accommodation-card-capacity">{metaParts.join(" · ")}</p>
          )}
          {a.rate && (
            <p className="accommodation-card-price">
              <strong>US$130 / night</strong>{" "}
              <span>per apartment</span>
            </p>
          )}
        </div>
        <div className="actions">
          <Link className="button button-primary" href={`/apartments/${a.slug}`}>
            View Suite <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
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
