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
        <div className="proof-shell">
          <ScrollReveal>
            <div className="proof-header">
              <Eyebrow>Guest experiences</Eyebrow>
              <h2>What our guests say</h2>
            </div>
          </ScrollReveal>

          <div className={verified.length === 1 ? "proof-grid proof-grid-single" : "proof-grid"}>
            {verified.map((r, i) => (
              <blockquote key={r.name + i} className="proof-card">
                <p className="proof-quote">“{r.quote}”</p>
                <footer className="proof-meta">
                  <cite>{r.name}</cite>
                  <p>
                    {[r.origin, r.travellerType, r.stayLength]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="actions proof-actions">
            <TextLink href="/reviews/new">Stayed with us? Share your review</TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
