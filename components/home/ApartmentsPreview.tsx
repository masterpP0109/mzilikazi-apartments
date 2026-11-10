import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import { publishedAccommodations, accommodationPreviews } from "@/lib/property";
import {
  AccommodationCard,
  AccommodationFallback,
} from "@/components/ui/AccommodationCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ApartmentsPreview() {
  return (
    <section id="apartments" className="section" tabIndex={-1} aria-labelledby="choose-your-space-title">
      <Container>
        <ScrollReveal>
          <div className="section-heading">
            <div>
              <Eyebrow>Make yourself at home</Eyebrow>
              <h2 id="choose-your-space-title">Choose your apartment.</h2>
            </div>
            <TextLink href="/apartments">Explore accommodation</TextLink>
          </div>
          <p className="form-note" style={{ marginTop: -8, marginBottom: 18 }}>
            Two bedrooms, up to four guests and practical self-catering comforts. From US$130 per night.
          </p>
        </ScrollReveal>

        {publishedAccommodations.length ? (
          <div className="accommodation-list property-accommodation-list mobile-snap-row">
            {publishedAccommodations.map((a, index) => (
              <ScrollReveal key={a.slug} delayMs={index * 120} className="snap-card-wrap">
                <AccommodationCard apartment={a} propertyPreview={accommodationPreviews[index % accommodationPreviews.length]} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <AccommodationFallback />
        )}
        <div className="actions" style={{ marginTop: 24 }}>
          <TextLink href="/plan">
            Not sure which one fits your group? Help Me Choose
          </TextLink>
          <TextLink href="/apartments#compare">Compare apartments</TextLink>
        </div>
      </Container>
    </section>
  );
}
