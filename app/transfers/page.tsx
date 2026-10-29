import Link from "next/link";
import { Container, Eyebrow, ImageFrame, PageIntro, TextLink } from "@/components/ui/Editorial";
import { transferMedia, transferRoutes, fleetFeatures, transferFaqs } from "@/lib/transfers";
import { pageMetadata } from "@/lib/seo";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = pageMetadata(
  "Victoria Falls Airport & Local Transfers",
  "Reliable, air-conditioned airport transfers, Victoria Falls town shuttles, and Kazungula Chobe day-trip connections from Mzilikazi Guest Lodge.",
  "/transfers",
);

export default function TransfersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Victoria Falls · Private Transport"
        title="Reliable airport pickups, day trips and local transfers."
        media={transferMedia.fleetExterior}
        actions={
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <Link className="button button-primary" href="/contact?preference=Airport%20Transfer">
              Book a Transfer
            </Link>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>
              Air-conditioned Nissan Serena &amp; HiAce passenger fleet
            </span>
          </div>
        }
      >
        <p>
          Start your Victoria Falls holiday comfortably from the moment you step off the plane.
          Our private, air-conditioned passenger fleet and licensed local drivers provide dependable
          door-to-door airport pickups, town shuttles, and excursion connections.
        </p>
      </PageIntro>

      {/* Value Strip */}
      <section className="section stone" style={{ paddingBlock: "48px" }}>
        <Container>
          <div className="value-strip" style={{ borderBottom: "none", paddingBlock: 0 }}>
            <div>
              <h2>Door-to-door pickup</h2>
              <p>Meet-and-greet service inside VFA arrivals. No multiple stops or shared shuttle delays.</p>
            </div>
            <div>
              <h2>Flight status monitoring</h2>
              <p>We track your flight number in real time. If your flight is early or delayed, your driver is there.</p>
            </div>
            <div>
              <h2>Transparent, flexible payment</h2>
              <p>Settle via cash (USD), EcoCash, or international card. Book standalone or alongside your suite.</p>
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
              <Eyebrow>Vehicle Fleet &amp; Capacity</Eyebrow>
              <h2>Designed for stress-free travel.</h2>
              <p style={{ marginTop: 20 }}>
                Travelling with families, safari luggage, or camera gear requires thoughtful space.
                Our Nissan Serena passenger minivans are maintained to high safety standards and
                configured to keep passengers cool and luggage secure.
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
              Arrange Your Transfer
            </Link>
            <TextLink href="/apartments">Explore Accommodations</TextLink>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
