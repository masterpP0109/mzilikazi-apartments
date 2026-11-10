import Link from "next/link";
import { Container, Eyebrow, ImageFrame, TextLink } from "@/components/ui/Editorial";
import { itineraries } from "@/lib/planning";
import { AddToTrip } from "./TripProvider";
import type { PropertyMedia } from "@/lib/property";
import ScrollReveal from "@/components/ui/ScrollReveal";

const itineraryImages: Record<string, PropertyMedia> = {
  "two-nights": {
    src: "/mzilikazi imgs/Experiences/Guided Tour of the Falls_/Tour-of-the-falls-7-scaled.jpg",
    alt: "Guided tour at Victoria Falls rainforest viewpoints",
    kind: "destination",
    verified: true,
  },
  "three-nights": {
    src: "/mzilikazi imgs/Experiences/Flight of Angels/Heli-8-scaled.jpg",
    alt: "Aerial helicopter view of Victoria Falls and Zambezi gorge",
    kind: "destination",
    verified: true,
  },
  "five-nights": {
    src: "/mzilikazi imgs/Experiences/Standard Cruise_/Standard-2-scaled.jpg",
    alt: "Zambezi river sunset cruise at Victoria Falls",
    kind: "destination",
    verified: true,
  },
};

export default function Itineraries() {
  return (
    <section id="itineraries" className="section" aria-labelledby="itineraries-title">
      <Container>
        <ScrollReveal>
          <div className="section-heading">
            <div>
              <Eyebrow>Explore Victoria Falls</Eyebrow>
              <h2 id="itineraries-title">Your stay. Your kind of adventure.</h2>
            </div>
            <TextLink href="/plan">Explore all trip ideas →</TextLink>
          </div>
          <p className="intro-copy">
            Whether you’re visiting for two nights or staying a little longer, discover ideas for making the most of Victoria Falls.
          </p>
        </ScrollReveal>

        <div className="journey-grid itinerary-grid">
          {itineraries.map((i) => (
            <article className="journey-card" key={i.id}>
              {itineraryImages[i.id] && (
                <ImageFrame
                  media={itineraryImages[i.id]}
                  ratio="landscape"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 44vw, 30vw"
                />
              )}
              <div style={{ marginTop: 12 }}>
                <p className="eyebrow">{i.nights} Nights</p>
                <h3>{i.title}</h3>
                <p>{i.description}</p>
                <ol className="itinerary-summary">
                  {i.days.map((d, n) => (
                    <li key={d.title}>
                      <span>Day {n + 1}</span> {d.title}
                    </li>
                  ))}
                </ol>
                <div style={{ marginTop: 16 }}>
                  <TextLink href={"/plan/itineraries/" + i.id}>
                    View Itinerary
                  </TextLink>
                </div>
                <div style={{ marginTop: 8 }}>
                  <AddToTrip kind="itinerary" id={i.id} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="actions" style={{ marginTop: 36 }}>
          <Link className="button button-primary" href="/plan">
            Explore Trip Ideas
          </Link>
          <TextLink href="/victoria-falls">
            Read the Victoria Falls Guide
          </TextLink>
          <TextLink href="/plan">
            Not sure which fits your group? Help Me Choose
          </TextLink>
        </div>
      </Container>
    </section>
  );
}
