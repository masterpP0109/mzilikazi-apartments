import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import { itineraries } from "@/lib/planning";
import { AddToTrip } from "./TripProvider";
export default function Itineraries() {
  return (
    <section id="itineraries" className="section">
      <Container>
        <Eyebrow>A few starting points</Eyebrow>
        <h2>Don’t know where to start?</h2>
        <p className="intro-copy">
          Keep the outline. Change the details. These are trip ideas, rather
          than packages.
        </p>
        <div className="journey-grid itinerary-grid">
          {itineraries.map((i) => (
            <article className="journey-card" key={i.id}>
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
              <TextLink href={"/plan/itineraries/" + i.id}>
                View Itinerary
              </TextLink>
              <AddToTrip kind="itinerary" id={i.id} />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
