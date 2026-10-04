import {
  Container,
  Eyebrow,
  ImageFrame,
  TextLink,
} from "@/components/ui/Editorial";
import { travellerTypes } from "@/lib/planning";
export default function WhoIsItFor() {
  return (
    <section id="stay-types" className="section">
      <Container>
        <Eyebrow>Continue planning</Eyebrow>
        <h2>Find the starting point for your trip.</h2>
        <div className="journey-grid">
          {travellerTypes.map((t) => (
            <article className="journey-card" key={t.id}>
              <ImageFrame media={t.media} sizes="(max-width: 639px) 92vw, (max-width: 1023px) 44vw, 40vw" />
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
