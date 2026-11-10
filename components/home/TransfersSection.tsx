import Link from "next/link";
import { Container, Eyebrow, ImageFrame, TextLink } from "@/components/ui/Editorial";
import { transferMedia, transferRoutes } from "@/lib/transfers";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function TransfersSection() {
  const categories = transferRoutes.slice(0, 4);

  return (
    <section className="section transfers-section" id="transfers" aria-labelledby="transfers-title">
      <Container>
        <ScrollReveal>
          <div className="section-heading">
            <div>
              <Eyebrow>Getting Around · Victoria Falls</Eyebrow>
              <h2 id="transfers-title">Airport pickups, local hops and safari connections.</h2>
            </div>
            <TextLink href="/transfers">View all routes &amp; rates</TextLink>
          </div>

          <p className="transfers-intro-copy">
            From landing at Victoria Falls International Airport (VFA) to rainforest excursions and evening dining, our private air-conditioned vehicle ensures simple, reliable transport throughout your stay.
          </p>
        </ScrollReveal>

        <div className="transfers-layout">
          <ScrollReveal className="transfers-media-column">
            <div className="transfers-featured-image">
              <ImageFrame
                media={transferMedia.fleetExterior}
                ratio="landscape"
                sizes="(max-width: 767px) 100vw, 45vw"
              />
              <p className="property-photo-caption">
                Our air-conditioned passenger minivan ready for guest transfers.
              </p>
            </div>
            <div className="transfers-featured-image" style={{ marginTop: 20 }}>
              <ImageFrame
                media={transferMedia.fleetInterior}
                ratio="landscape"
                sizes="(max-width: 767px) 100vw, 45vw"
              />
              <p className="property-photo-caption">
                Comfortable interior with air conditioning and generous luggage space.
              </p>
            </div>
          </ScrollReveal>

          <div className="transfers-routes-column">
            <div className="transfers-routes-list">
              {categories.map((route) => (
                <article key={route.id} className="transfer-card">
                  <div className="transfer-card-header">
                    <span className="transfer-badge">{route.badge}</span>
                    <span className="transfer-duration">{route.duration}</span>
                  </div>
                  <h3>{route.title}</h3>
                  <p>{route.description.split(".")[0]}.</p>
                </article>
              ))}
            </div>

            <div className="actions" style={{ marginTop: 28 }}>
              <Link className="button button-primary" href="/transfers">
                View Full Transfer Details
              </Link>
              <TextLink href="/contact?preference=Airport%20Transfer">
                Enquire about a transfer
              </TextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
