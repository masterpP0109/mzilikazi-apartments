import { reviews } from "@/lib/property";
import { Container, Eyebrow, ImageFrame, TextLink } from "@/components/ui/Editorial";
export default function Proof({ apartmentSlug }: { apartmentSlug?: string }) {
  const verified = reviews.filter(
    (r) =>
      r.verified &&
      r.quote &&
      r.name &&
      (!apartmentSlug || r.apartmentSlug === apartmentSlug),
  );
  if (!verified.length) return null;
  return (
    <section className="section stone">
      <Container>
        <Eyebrow>From our guests</Eyebrow>
        {verified.map((r, i) => (
          <blockquote key={r.name + i}>
            <ImageFrame media={r.image ?? null} ratio="square" />
            <p className="story-statement">“{r.quote}”</p>
            <cite>{r.name}</cite>
            <p className="form-note">
              {[r.travellerType, r.origin, r.stayLength, r.source]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </blockquote>
        ))}
        <div className="actions" style={{ marginTop: 32 }}>
          <TextLink href="/reviews/new">Stayed with us? Share your review</TextLink>
        </div>
      </Container>
    </section>
  );
}
