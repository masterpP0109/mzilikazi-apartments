import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import { publishedAccommodations, accommodationPreviews } from "@/lib/property";
import {
  AccommodationCard,
  AccommodationFallback,
} from "@/components/ui/AccommodationCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ApartmentsPreview() {
  return (
    <section
      id="apartments"
      className="section"
      tabIndex={-1}
      aria-labelledby="choose-your-space-title"
    >
      <Container>
        <ScrollReveal>
          <div className="section-heading">
            <div>
              <Eyebrow>Two-bedroom self-catering apartments</Eyebrow>
              <h2 id="choose-your-space-title">Choose your apartment.</h2>
            </div>
            <TextLink href="/apartments">Explore Apartments</TextLink>
          </div>
          <p className="form-note" style={{ marginTop: -8, marginBottom: 18 }}>
            Each apartment sleeps up to four guests in two bedrooms, with a full
            kitchen, lounge, Wi-Fi, and air conditioning at US$130 per night.
          </p>
        </ScrollReveal>

        {publishedAccommodations.length ? (
          <div className="accommodation-list property-accommodation-list">
            {publishedAccommodations.map((a, index) => (
              <AccommodationCard
                key={a.slug}
                apartment={a}
                propertyPreview={
                  accommodationPreviews[index % accommodationPreviews.length]
                }
              />
            ))}
          </div>
        ) : (
          <AccommodationFallback />
        )}
        <div className="actions" style={{ marginTop: 24 }}>
          <TextLink href="/apartments#compare">Compare apartments</TextLink>
          <TextLink href="/plan">Help Me Choose an Apartment</TextLink>
        </div>
      </Container>
    </section>
  );
}
