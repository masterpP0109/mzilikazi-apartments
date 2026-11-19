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
        <ScrollReveal>
          <div className="section-heading">
            <div>
              <Eyebrow>Make the most of Victoria Falls</Eyebrow>
              <h2 id="vf-extras-title">Transfers and local experiences.</h2>
            </div>
            <TextLink href="/plan">Plan Your Stay</TextLink>
          </div>
          <p className="intro-copy">
            Arrange airport pickups and discover local activities to enjoy during
            your stay — shared alongside your accommodation enquiry whenever you
            need them.
          </p>
        </ScrollReveal>

        <div className="accommodation-list" style={{ marginTop: 32 }}>
          <article className="accommodation-card">
            <ImageFrame
              media={transferMedia.fleetExterior}
              ratio="landscape"
              sizes="(max-width: 639px) 92vw, 45vw"
            />
            <h3>Airport &amp; local transfers</h3>
            <p>
              Coordinate Victoria Falls Airport (VFA) pickups, Rainforest gate
              drops, town dining runs, and border transfers alongside your stay.
            </p>
            <div className="actions">
              <Link className="button button-secondary" href="/transfers">
                View Transfers
              </Link>
              <TextLink href="/contact?preference=Airport%20Transfer">
                Request a Transfer
              </TextLink>
            </div>
          </article>

          <article className="accommodation-card">
            <ImageFrame
              media={propertyPhotos.falls}
              ratio="landscape"
              sizes="(max-width: 639px) 92vw, 45vw"
            />
            <h3>Things to do in Victoria Falls</h3>
            <p>
              Explore guided Falls tours, Zambezi sunset cruises, game drives,
              and local dining ideas to help shape your days.
            </p>
            <div className="actions">
              <Link className="button button-secondary" href="/experiences">
                Explore Things to Do
              </Link>
              <TextLink href="/victoria-falls">Victoria Falls Guide</TextLink>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
