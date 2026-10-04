import { ImageFrame } from "@/components/ui/Editorial";
import ApartmentComparison, {
  apartmentAttributes,
} from "@/components/ui/ApartmentComparison";
import { AddToTrip } from "@/components/trip/TripProvider";
import Location from "@/components/home/Location";
import Proof from "@/components/home/Proof";
import { notFound } from "next/navigation";
import { accommodations, isPublicMedia } from "@/lib/property";
import { Container, PageIntro, TextLink } from "@/components/ui/Editorial";
import { AccommodationFacts } from "@/components/ui/AccommodationCard";
import ApartmentGallery from "@/components/ui/ApartmentGallery";
import AvailabilityPanel from "@/components/forms/AvailabilityPanel";
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
  return a
    ? {
        ...pageMetadata(
          a.confirmed && a.name ? a.name : "Accommodation enquiry",
          a.confirmed && a.description
            ? a.description
            : "Ask about accommodation options and current availability for your Victoria Falls stay.",
          `/apartments/${a.slug}`,
        ),
        ...(!a.confirmed ? { robots: { index: false, follow: true } } : {}),
      }
    : { title: "Accommodation not found" };
}
function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2>{title}</h2>
      {items.length ? (
        <ul className="amenity-grid">
          {items.map((s) => (
            <li key={s}>
              <span aria-hidden="true">—</span>
              {s}
            </li>
          ))}
        </ul>
      ) : (
        <p>To be confirmed. Ask us about this when choosing your space.</p>
      )}
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
  const whatsapp = whatsappUrl();
  const publicName = a.confirmed ? a.name : null;
  const policyLabels = [
    "Check-in",
    "Check-out",
    "Children",
    "Parking",
    "Parties",
    "Cleaning",
    "Security",
    "Payment",
    "Cancellation",
  ];
  const policies = [
    ...policyLabels.map(
      (label) =>
        a.policies.find(
          (p) => p.label.toLowerCase() === label.toLowerCase(),
        ) ?? { label, value: "To be confirmed" },
    ),
    ...a.policies.filter(
      (p) =>
        !policyLabels.some(
          (label) => label.toLowerCase() === p.label.toLowerCase(),
        ),
    ),
  ];
  return (
    <>
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
        eyebrow="Your space in Victoria Falls"
        title={publicName ?? "Let’s find your space."}
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
          {a.confirmed && <ApartmentGallery images={a.gallery} />}
          <div className="detail-layout">
            <div className="detail-content">
              <AccommodationFacts apartment={a} />
              {a.confirmed && (
                <>
                  <section>
                    <h2>At a glance</h2>
                    <dl>
                      {apartmentAttributes(a)
                        .slice(0, 9)
                        .map(([label, value]) => (
                          <div className="policy-row" key={label}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                    </dl>
                    <AddToTrip kind="accommodation" id={a.slug} />
                  </section>
                  {a.walkthrough.some((w) => w.description || w.media) && (
                    <section>
                      <h2>A look around your space.</h2>
                      {a.walkthrough
                        .filter((w) => w.description || w.media)
                        .map((w) => (
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
                    title="Sleeping arrangements"
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
                <h2>Make it your stay.</h2>
                <p>
                  {a.confirmed && a.rate
                    ? a.rate
                    : "Request current rates for your dates and guest count."}
                </p>
                <p className="form-note">
                  An enquiry is the beginning of a conversation. Your stay is
                  confirmed separately.
                </p>
              </section>
              {a.confirmed && (
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
                </section>
              )}
              <TextLink href="/apartments">Explore accommodation</TextLink>
              {whatsapp && (
                <div>
                  <a className="text-link" href={whatsapp}>
                    Ask on WhatsApp →
                  </a>
                </div>
              )}
            </div>
            <aside className="detail-sidebar" aria-label="Check availability">
              <AvailabilityPanel preference={publicName ?? undefined} />
            </aside>
          </div>
          <ApartmentComparison exclude={a.slug} />
        </Container>
      </section>
      <Proof apartmentSlug={a.slug} />
      <Location />
      <section className="section">
        <Container>
          <h2>Ready to talk about your stay?</h2>
          <div className="actions">
            <TextLink
              href={
                "/contact?preference=" + encodeURIComponent(publicName ?? "")
              }
            >
              Check Availability
            </TextLink>
            <TextLink href="/plan">Plan the days around it</TextLink>
          </div>
        </Container>
      </section>
    </>
  );
}
