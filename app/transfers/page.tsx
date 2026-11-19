import Link from "next/link";
import { Container, Eyebrow, ImageFrame, PageIntro, TextLink } from "@/components/ui/Editorial";
import { transferMedia, transferRoutes, fleetFeatures, transferFaqs } from "@/lib/transfers";
import { pageMetadata } from "@/lib/seo";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = pageMetadata(
  "Victoria Falls Airport & Local Transfers",
  "Airport transfers, Victoria Falls town shuttles, and Kazungula Chobe day-trip connections arranged for Mzilikazi Apartments guests.",
  "/transfers",
);

export default function TransfersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Victoria Falls · Guest Transport"
        title="Airport pickups, day trips and local transfers."
        media={transferMedia.fleetExterior}
        actions={
          <div className="actions">
            <Link className="button button-primary" href="/contact?preference=Airport%20Transfer">
              Request a Transfer
            </Link>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>
              Air-conditioned passenger minivan &amp; arranged local transport
            </span>
          </div>
        }
      >
        <p>
          Arrive in Victoria Falls without guesswork. We can help arrange door-to-door
          airport pickups, town shuttles, and excursion connections alongside your stay.
        </p>
      </PageIntro>

      {/* Value Strip */}
      <section className="section stone" style={{ paddingBlock: "48px" }}>
        <Container>
          <div className="value-strip" style={{ borderBottom: "none", paddingBlock: 0 }}>
            <div>
              <h2>Door-to-door pickup</h2>
              <p>Private transfers from Victoria Falls Airport (VFA) straight to your apartment.</p>
            </div>
            <div>
              <h2>Flight arrival coordination</h2>
              <p>Share your flight number and arrival time in advance so pickup timing is coordinated.</p>
            </div>
            <div>
              <h2>Confirmed upfront</h2>
              <p>Receive availability, exact route pricing, and payment options before confirming.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Comprehensive Route Directory */}
      <section className="section" id="routes" aria-labelledby="transfer-routes-title">
        <Container>
          <div className="section-heading">
            <div>
              <Eyebrow>Transfer Directory</Eyebrow>
              <h2 id="transfer-routes-title">Popular Routes &amp; Transfer Services</h2>
            </div>
            <p className="transfers-intro-copy" style={{ maxWidth: 540, marginBottom: 0 }}>
              Need a custom route or private vehicle for the day? Share your itinerary and we will arrange
              dedicated transport tailored to your schedule.
            </p>
          </div>

          <div className="transfers-full-grid">
            {transferRoutes.map((route) => (
              <article key={route.id} className="transfer-detail-card">
                <div className="transfer-card-header">
                  <span className="transfer-badge">{route.badge}</span>
                  <span className="transfer-duration">{route.duration}</span>
                </div>
                <h3>{route.title}</h3>
                <div className="transfer-endpoints">
                  <div>
                    <span className="endpoint-label">Pickup:</span>
                    <span>{route.pickup}</span>
                  </div>
                  <div>
                    <span className="endpoint-label">Drop-off:</span>
                    <span>{route.dropoff}</span>
                  </div>
                </div>
                <p>{route.description}</p>
                <div className="transfer-card-footer">
                  <strong>Key inclusions:</strong>
                  <ul>
                    {route.highlights.map((h, i) => (
                      <li key={i}>
                        <span aria-hidden="true">—</span> {h}
                      </li>
                    ))}
                  </ul>
                  <p className="recommended-for">
                    <em>Ideal for:</em> {route.recommendedFor}
                  </p>
                  <div className="actions" style={{ marginTop: 20 }}>
                    <Link
                      className="button button-secondary"
                      href={`/contact?preference=Transfer:%20${encodeURIComponent(route.title)}`}
                    >
                      Enquire about this route
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Fleet & Comfort Details */}
      <section className="section stone">
        <Container>
          <div className="editorial-split">
            <div>
              <Eyebrow>Vehicle &amp; Comfort</Eyebrow>
              <h2>Arranged for stress-free travel.</h2>
              <p style={{ marginTop: 20 }}>
                Travelling with family, luggage, or camera gear is much easier with dedicated
                air-conditioned transport arranged in advance. Share your group size and luggage
                notes so we can confirm the right vehicle and rate for your trip.
              </p>
              <div className="fleet-features-grid" style={{ marginTop: 32 }}>
                {fleetFeatures.map((feat) => (
                  <div key={feat.title} className="fleet-feature-item">
                    <strong>{feat.title}</strong>
                    <p>{feat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gap: 24 }}>
              <div>
                <ImageFrame
                  media={transferMedia.fleetInterior}
                  ratio="landscape"
                  sizes="(max-width: 767px) 100vw, 500px"
                />
                <p className="property-photo-caption" style={{ marginTop: 10 }}>
                  Spacious air-conditioned passenger cabin with fold-down refreshment trays and generous legroom.
                </p>
              </div>
              <div>
                <ImageFrame
                  media={transferMedia.fleetLuggage}
                  ratio="landscape"
                  sizes="(max-width: 767px) 100vw, 500px"
                />
                <p className="property-photo-caption" style={{ marginTop: 10 }}>
                  Deep, versatile rear cargo space for suitcases, backpacks and travel essentials.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section" aria-labelledby="transfers-faq-title">
        <Container>
          <div className="section-heading">
            <div>
              <Eyebrow>Practical details</Eyebrow>
              <h2 id="transfers-faq-title">Transfer FAQs</h2>
            </div>
          </div>

          <dl className="faq-list">
            {transferFaqs.map((faq) => (
              <div key={faq.question} className="faq-item">
                <dt>
                  <h3>{faq.question}</h3>
                </dt>
                <dd>
                  <p>{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>

          <div className="actions" style={{ marginTop: 40 }}>
            <Link className="button button-primary" href="/contact?preference=Airport%20Transfer">
              Request a Transfer
            </Link>
            <TextLink href="/apartments">Explore Apartments</TextLink>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
