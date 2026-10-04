import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import { publishedAccommodations, accommodationPreviews } from "@/lib/property";
import {
  AccommodationCard,
  AccommodationFallback,
} from "@/components/ui/AccommodationCard";
export default function ApartmentsPreview() {
  return (
    <section id="apartments" className="section" tabIndex={-1} aria-labelledby="choose-your-space-title">
      <Container>
        <div className="section-heading">
          <div>
            <Eyebrow>Make yourself at home</Eyebrow>
            <h2 id="choose-your-space-title">Choose your space.</h2>
          </div>
          <TextLink href="/apartments">Explore accommodation</TextLink>
        </div>
        {publishedAccommodations.length ? (
          <div className="accommodation-list property-accommodation-list">
            {publishedAccommodations.map((a, index) => (
              <AccommodationCard key={a.slug} apartment={a} propertyPreview={accommodationPreviews[index % accommodationPreviews.length]} />
            ))}
          </div>
        ) : (
          <AccommodationFallback />
        )}
        <div className="actions">
          <TextLink href="/plan">
            Not sure which one fits your group? Help Me Choose
          </TextLink>
          <TextLink href="/apartments#compare">Compare apartments</TextLink>
        </div>
      </Container>
    </section>
  );
}
