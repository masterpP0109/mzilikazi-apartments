import Link from "next/link";
import { Container, Eyebrow, ImageFrame } from "@/components/ui/Editorial";
import AvailabilityPanel from "@/components/forms/AvailabilityPanel";
import { propertyMedia, isPublicMedia } from "@/lib/property";
export default function Hero() {
  return (
    <section id="hero" className="hero">
      <Container>
        <div
          className={`hero-top ${isPublicMedia(propertyMedia.hero) ? "has-image" : ""}`}
        >
          <div>
            <Eyebrow>Victoria Falls · Zimbabwe</Eyebrow>
            <h1>
              Come for the Falls.
              <br />
              <em>Stay somewhere worth coming home to.</em>
            </h1>
            <p className="hero-copy">
              A comfortable base. A little independence.
              <br />A self-catering stay, with room to plan the days around it.
            </p>
            <div className="actions">
              <Link className="button button-primary" href="/apartments">
                Explore the Stay
              </Link>
              <Link className="text-link" href="/plan">
                Plan My Victoria Falls Trip →
              </Link>
            </div>
          </div>
          <ImageFrame media={propertyMedia.hero} ratio="hero" priority />
        </div>
        <AvailabilityPanel />
        <div className="hero-footnote">
          <span>Your stay starts here.</span>
          <a href="#apartments" className="text-link">
            Settle in <span aria-hidden="true">↓</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
