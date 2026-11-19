import Link from "next/link";
import { Container, Eyebrow, ImageFrame, TextLink } from "@/components/ui/Editorial";
import { transferMedia } from "@/lib/transfers";
import { propertyPhotos } from "@/lib/property";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function VictoriaFallsExtras() {
  return (
    <section
      className="section stone"
      id="experiences-and-transfers"
      aria-labelledby="vf-extras-title"
    >
      <Container>
        <div className="extras-shell">
          <ScrollReveal>
            <div className="section-heading">
              <div>
                <Eyebrow>Make the most of Victoria Falls</Eyebrow>
                <h2 id="vf-extras-title">Transfers and local experiences.</h2>
              </div>
              <TextLink href="/plan">Plan Your Stay</TextLink>
            </div>
            <p className="intro-copy">
              Optional airport pickups and Victoria Falls activities you can add
              alongside your accommodation enquiry.
            </p>
          </ScrollReveal>

          <div className="two-card-grid">
            <article className="accommodation-card accommodation-card-compact">
              <ImageFrame
                media={transferMedia.fleetExterior}
                ratio="landscape"
                sizes="(max-width: 639px) 92vw, 480px"
              />
              <div className="accommodation-card-body">
                <h3>Airport &amp; local transfers</h3>
                <p className="accommodation-card-summary">
                  Victoria Falls Airport (VFA) pickups, Rainforest drops, town
                  dining runs, and Chobe border transfers.
                </p>
                <div className="actions two-card-actions">
                  <Link className="button button-secondary" href="/transfers">
                    View Transfers
                  </Link>
                  <TextLink href="/contact?preference=Airport%20Transfer">
                    Request a Transfer
                  </TextLink>
                </div>
              </div>
            </article>

            <article className="accommodation-card accommodation-card-compact">
              <ImageFrame
                media={propertyPhotos.falls}
                ratio="landscape"
                sizes="(max-width: 639px) 92vw, 480px"
              />
              <div className="accommodation-card-body">
                <h3>Things to do in Victoria Falls</h3>
                <p className="accommodation-card-summary">
                  Guided Falls tours, Zambezi sunset cruises, game drives, and
                  local dining ideas to shape your stay.
                </p>
                <div className="actions two-card-actions">
                  <Link className="button button-secondary" href="/experiences">
                    Explore Things to Do
                  </Link>
                  <TextLink href="/victoria-falls">Victoria Falls Guide</TextLink>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
