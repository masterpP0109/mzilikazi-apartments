import { notFound, permanentRedirect } from "next/navigation";
import { accommodations, isPublicMedia } from "@/lib/property";
import { Container, ImageFrame, PageIntro, TextLink } from "@/components/ui/Editorial";
import { AccommodationFacts } from "@/components/ui/AccommodationCard";
import ApartmentComparison, {
  apartmentAttributes,
} from "@/components/ui/ApartmentComparison";
import ApartmentGallery from "@/components/ui/ApartmentGallery";
import ApartmentViewTracker from "@/components/ui/ApartmentViewTracker";
import AvailabilityPanel from "@/components/forms/AvailabilityPanel";
import { AddToTrip } from "@/components/trip/TripProvider";
import Location from "@/components/home/Location";
import Proof from "@/components/home/Proof";
import { pageMetadata } from "@/lib/seo";
import { whatsappUrl, SITE_NAME, SITE_URL } from "@/lib/constants";

const find = (slug: string) =>
  accommodations.find((a) => a.slug === slug || a.aliases.includes(slug));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = find(slug);
  const isCanonical = a?.slug === slug;
  return a
    ? {
        ...pageMetadata(
          a.confirmed && a.name
            ? `${a.name} — 2-Bedroom Apartment in Victoria Falls`
            : "Accommodation enquiry",
          a.confirmed && a.description
            ? `${a.description} US$130 per night for up to 4 guests.`
            : "Ask about accommodation options and current availability for your Victoria Falls stay.",
          `/apartments/${a.slug}`,
        ),
        ...(!a.confirmed || !isCanonical
          ? { robots: { index: false, follow: true } }
          : {}),
      }
    : { title: "Accommodation not found" };
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section>
      <h2>{title}</h2>
      <ul className="amenity-grid">
        {items.map((s) => (
          <li key={s}>
            <span aria-hidden="true">—</span>
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ApartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = find(slug);
  if (!a) notFound();
  if (a.slug !== slug && a.aliases.includes(slug)) {
    permanentRedirect(`/apartments/${a.slug}`);
  }
  const whatsapp = whatsappUrl(
    `Hello ${SITE_NAME}, I would like to check availability for ${a.name ?? "an apartment"}.`,
  );
  const publicName = a.confirmed ? a.name : null;
  const walkthroughItems = a.walkthrough.filter(
    (w) => w.description || isPublicMedia(w.media),
  );
  const policies = a.policies;

  return (
    <>
      <ApartmentViewTracker slug={a.slug} />
      {a.confirmed && a.name && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Apartment",
              name: a.name,
              url: SITE_URL + "/apartments/" + a.slug,
              ...(a.description ? { description: a.description } : {}),
              ...(a.bedrooms != null ? { numberOfBedrooms: a.bedrooms } : {}),
              ...(a.bathrooms != null
                ? { numberOfBathroomsTotal: a.bathrooms }
                : {}),
              ...(a.guests != null
                ? {
                    occupancy: {
                      "@type": "QuantitativeValue",
                      maxValue: a.guests,
                    },
                  }
                : {}),
              image: a.gallery
                .filter((m) => isPublicMedia(m) && m.kind === "property")
                .map((m) => m.src),
              containedInPlace: {
                "@type": "LodgingBusiness",
                name: SITE_NAME,
                url: SITE_URL,
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <PageIntro
        eyebrow="Two-bedroom self-catering apartment · Victoria Falls"
        title={publicName ?? "Let’s find your apartment."}
        media={a.gallery.length > 0 ? a.gallery[0] : null}
      >
        {a.confirmed && a.description ? (
          <p>{a.description}</p>
        ) : (
          <p>
            Share your dates and preferences to request the accommodation
            options for your visit.
          </p>
        )}
      </PageIntro>
      <section className="section">
        <Container>
          {a.confirmed && a.gallery.length > 0 && (
            <ApartmentGallery images={a.gallery} />
          )}
          <div className="detail-layout">
            <div className="detail-content">
              <AccommodationFacts apartment={a} />
              {a.confirmed && (
                <>
                  <section>
                    <h2>At a glance</h2>
                    <dl>
                      {apartmentAttributes(a).map(([label, value]) => (
                        <div className="policy-row" key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <AddToTrip kind="accommodation" id={a.slug} />
                  </section>
                  {walkthroughItems.length > 0 && (
                    <section>
                      <h2>A look around your apartment.</h2>
                      {walkthroughItems.map((w) => (
                        <article className="walkthrough" key={w.title}>
                          <ImageFrame media={w.media} />
                          <h3>{w.title}</h3>
                          {w.description && <p>{w.description}</p>}
                        </article>
                      ))}
                    </section>
                  )}
                  {a.about && (
                    <section>
                      <h2>About the apartment</h2>
                      <p>{a.about}</p>
                    </section>
                  )}
                  <DetailList
                    title="Sleeping arrangements & bathrooms"
                    items={a.sleeping}
                  />
                  <DetailList title="Amenities" items={a.amenities} />
                  <DetailList title="Kitchen facilities" items={a.kitchen} />
                  <DetailList
                    title="Who this apartment suits"
                    items={a.idealFor}
                  />
                  <DetailList title="What’s included" items={a.included} />
                </>
              )}
              <section>
                <h2>Rates &amp; availability</h2>
                <p>
                  {a.confirmed && a.rate
                    ? a.rate
                    : "Request current rates for your dates and guest count."}
                </p>
                <p className="form-note">
                  Submitting an enquiry checks availability with our team. Your
                  booking is confirmed once dates, rates, and terms are agreed.
                </p>
              </section>
              {a.confirmed && policies.length > 0 && (
                <section>
                  <h2>Good to know</h2>
                  <dl>
                    {policies.map((p) => (
                      <div className="policy-row" key={p.label}>
                        <dt>{p.label}</dt>
                        <dd>{p.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="form-note" style={{ marginTop: 12 }}>
                    Need cancellation, deposit, or event terms confirmed before
                    you travel?{" "}
                    <TextLink href="/contact">Talk to Our Team</TextLink>
                  </p>
                </section>
              )}
              <TextLink href="/apartments">Explore Apartments</TextLink>
              {whatsapp && (
                <div>
                  <a
                    className="text-link"
                    href={whatsapp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ask on WhatsApp →
                  </a>
                </div>
              )}
            </div>
            <aside className="detail-sidebar" aria-label="Request this apartment">
              <AvailabilityPanel preference={publicName ?? undefined} />
              <div className="actions" style={{ marginTop: 16 }}>
                <TextLink
                  href={
                    "/contact?preference=" + encodeURIComponent(publicName ?? "")
                  }
                >
                  Request This Apartment
                </TextLink>
              </div>
            </aside>
          </div>
          <ApartmentComparison exclude={a.slug} />
        </Container>
      </section>
      <Proof apartmentSlug={a.slug} />
      <Location />
      <section className="section">
        <Container>
          <h2>Ready to check your dates?</h2>
          <div className="actions">
            <TextLink
              href={
                "/contact?preference=" + encodeURIComponent(publicName ?? "")
              }
            >
              Request This Apartment
            </TextLink>
            <TextLink href="/plan">Plan Your Stay</TextLink>
          </div>
        </Container>
      </section>
    </>
  );
}
