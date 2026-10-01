import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import { publishedAccommodations } from "@/lib/property";
import {
  AccommodationCard,
  AccommodationFallback,
} from "@/components/ui/AccommodationCard";
export default function ApartmentsPreview() {
  return (
    <section id="apartments" className="section">
      <Container>
        <div className="section-heading">
          <div>
            <Eyebrow>Make yourself at home</Eyebrow>
            <h2>Choose your space.</h2>
          </div>
          <TextLink href="/apartments">Explore accommodation</TextLink>
        </div>
        {publishedAccommodations.length ? (
          <div className="accommodation-list">
            {publishedAccommodations.map((a) => (
              <AccommodationCard key={a.slug} apartment={a} />
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
