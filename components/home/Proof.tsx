import { reviews } from "@/lib/property";
import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import ScrollReveal from "@/components/ui/ScrollReveal";

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
    <section className="section stone proof-section">
      <Container>
        <ScrollReveal>
          <div className="proof-header">
            <Eyebrow>From our guests</Eyebrow>
            <p>
              A few words from people who've made Mzilikazi part of their Victoria
              Falls stay.
            </p>
          </div>
        </ScrollReveal>

        <div className="proof-grid">
          {verified.map((r, i) => (
            <blockquote key={r.name + i} className="proof-card">
              <p className="proof-quote">“{r.quote}”</p>
              <div className="proof-meta">
                <cite>{r.name}</cite>
                <p>
                  {[r.travellerType, r.origin, r.stayLength]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
            </blockquote>
          ))}
        </div>

        <div className="actions proof-actions">
          <TextLink href="/reviews/new">Stayed with us? Share your review</TextLink>
        </div>
      </Container>
    </section>
  );
}
