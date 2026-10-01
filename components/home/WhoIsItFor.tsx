import {
  Container,
  Eyebrow,
  ImageFrame,
  TextLink,
} from "@/components/ui/Editorial";
import { travellerTypes } from "@/lib/planning";
export default function WhoIsItFor() {
  return (
    <section className="section">
      <Container>
        <Eyebrow>Find your kind of stay</Eyebrow>
        <h2>What kind of trip are you planning?</h2>
        <div className="journey-grid">
          {travellerTypes.map((t) => (
            <article className="journey-card" key={t.id}>
              <ImageFrame media={t.media} />
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <p className="form-note">{t.reasons}</p>
              <TextLink href={t.href}>{t.cta}</TextLink>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
