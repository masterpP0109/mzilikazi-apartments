import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { accommodations, isPublicMedia } from "@/lib/property";
import { Container, ImageFrame, PageIntro, TextLink } from "@/components/ui/Editorial";
import ApartmentComparison from "@/components/ui/ApartmentComparison";
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
            ? `${a.name} — 2-Bedroom Suite in Victoria Falls`
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

  const publicName = a.confirmed ? a.name : null;
  const whatsapp = whatsappUrl(
    `Hello ${SITE_NAME}, I would like to request availability for ${publicName ?? "a suite"}.`,
  );
  const walkthroughItems = a.walkthrough.filter(
    (w) => w.description || isPublicMedia(w.media),
  );
  const enquiryHref =
    "/contact?preference=" + encodeURIComponent(publicName ?? "");

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
        eyebrow="Two-bedroom self-catering suite · Victoria Falls"
        title={publicName ?? "Let’s find your suite."}
        media={a.gallery.length > 0 ? a.gallery[0] : null}
        actions={
          publicName ? (
            <>
              <Link className="button button-primary" href={enquiryHref}>
                Request Availability
              </Link>
              <Link className="button button-secondary" href="#suite-enquiry">
                Enter Your Dates
              </Link>
            </>
          ) : undefined
        }
      >
        {a.confirmed && a.description ? (
          <>
            <p>{a.description}</p>
            <p className="suite-hero-facts">
              {a.guests != null ? `${a.guests} guests` : ""}
              {a.bedrooms != null ? ` · ${a.bedrooms} bedrooms` : ""}
              {a.rate ? ` · US$130 / night per apartment` : ""}
            </p>
          </>
        ) : (
          <p>
            Share your dates and preferences to request accommodation options for
            your visit.
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
              {a.confirmed && (
                <>
                  {a.about && (
                    <section>
                      <h2>Overview</h2>
                      <p>{a.about}</p>
                      <div style={{ marginTop: 12 }}>
                        <AddToTrip kind="accommodation" id={a.slug} />
                      </div>
                    </section>
                  )}

                  <DetailList
                    title="Sleeping arrangements & bathrooms"
                    items={a.sleeping}
                  />

                  <DetailList title="Amenities" items={a.amenities} />

                  {walkthroughItems.length > 0 && (
                    <section>
                      <h2>Inside the suite</h2>
                      <div className="suite-walkthrough-grid">
                        {walkthroughItems.map((w) => (
                          <article className="walkthrough-card" key={w.title}>
                            <ImageFrame
                              media={w.media}
                              ratio="landscape"
                              sizes="(max-width: 639px) 92vw, 360px"
                            />
                            <h3>{w.title}</h3>
                            {w.description && <p>{w.description}</p>}
                          </article>
                        ))}
                      </div>
                    </section>
                  )}

                  {a.policies.length > 0 && (
                    <section>
                      <h2>Good to know</h2>
                      <dl>
                        {a.policies.map((p) => (
                          <div className="policy-row" key={p.label}>
                            <dt>{p.label}</dt>
                            <dd>{p.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  )}
                </>
              )}

              <div className="actions">
                <TextLink href="/apartments">View all suites</TextLink>
                {whatsapp && (
                  <a
                    className="text-link"
                    href={whatsapp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ask on WhatsApp →
                  </a>
                )}
              </div>
            </div>

            <aside
              id="suite-enquiry"
              className="detail-sidebar"
              aria-label="Request availability for this suite"
            >
              <div className="suite-sidebar-summary">
                <p className="eyebrow">Nightly rate</p>
                <p className="suite-sidebar-rate">
                  <strong>US$130</strong> <span>/ night per apartment</span>
                </p>
                <p className="form-note">
                  Up to 4 guests · Availability and final total are confirmed
                  personally before payment.
                </p>
              </div>
              <AvailabilityPanel preference={publicName ?? undefined} />
              <div className="actions" style={{ marginTop: 16 }}>
                <TextLink href={enquiryHref}>
                  Ask a question about {publicName ?? "this suite"}
                </TextLink>
              </div>
            </aside>
          </div>

          <ApartmentComparison exclude={a.slug} />
        </Container>
      </section>

      <Proof apartmentSlug={a.slug} />
      <Location />
    </>
  );
}
