import Link from "next/link";
import { Container, Eyebrow, ImageFrame, TextLink } from "@/components/ui/Editorial";
import { transferMedia, transferRoutes, fleetFeatures } from "@/lib/transfers";

export default function TransfersSection() {
  const previewRoutes = transferRoutes.slice(0, 4);

  return (
    <section className="section transfers-section" id="transfers" aria-labelledby="transfers-title">
      <Container>
        <div className="section-heading">
          <div>
            <Eyebrow>Getting Around · Victoria Falls</Eyebrow>
            <h2 id="transfers-title">
              Seamless airport pickups, town transfers and safari connections.
            </h2>
          </div>
          <TextLink href="/transfers">View all routes &amp; rates</TextLink>
        </div>

        <p className="transfers-intro-copy">
          Arrive with complete peace of mind. Whether landing at Victoria Falls International Airport (VFA),
          heading to the rainforest gate for morning views of the Falls, or travelling to the Kazungula border
          for a Chobe day safari, our air-conditioned passenger fleet and licensed drivers take care of the journey.
        </p>

        <div className="transfers-layout">
          <div className="transfers-media-column">
            <div className="transfers-featured-image">
              <ImageFrame
                media={transferMedia.fleetExterior}
                ratio="landscape"
                sizes="(max-width: 767px) 100vw, 45vw"
              />
              <p className="property-photo-caption">
                Our air-conditioned Nissan Serena passenger minivan ready for guest transport.
              </p>
            </div>
            <div className="transfers-luggage-preview">
              <ImageFrame
                media={transferMedia.fleetInterior}
                ratio="landscape"
                sizes="(max-width: 767px) 100vw, 45vw"
              />
              <p className="property-photo-caption">
                Comfortable passenger interior with fold-down snack trays, air conditioning and generous legroom.
              </p>
            </div>
          </div>

          <div className="transfers-routes-column">
            <div className="transfers-routes-list">
              {previewRoutes.map((route) => (
                <article key={route.id} className="transfer-card">
                  <div className="transfer-card-header">
                    <span className="transfer-badge">{route.badge}</span>
                    <span className="transfer-duration">{route.duration}</span>
                  </div>
                  <h3>{route.title}</h3>
                  <p>{route.description}</p>
                  <ul className="transfer-highlights">
                    {route.highlights.slice(0, 2).map((item, idx) => (
                      <li key={idx}>
                        <span aria-hidden="true">—</span> {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="transfers-fleet-strip">
              <h4>Why travel with Mzilikazi Transfers?</h4>
              <div className="fleet-features-grid">
                {fleetFeatures.map((f) => (
                  <div key={f.title} className="fleet-feature-item">
                    <strong>{f.title}</strong>
                    <p>{f.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="actions" style={{ marginTop: 32 }}>
              <Link className="button button-primary" href="/transfers">
                Explore Transfer Routes
              </Link>
              <TextLink href="/contact?preference=Airport%20Transfer">
                Enquire about your transport
              </TextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
