import { reviews } from "@/lib/property";
import { Container, Eyebrow } from "@/components/ui/Editorial";
export default function Proof() {
  const verified = reviews.filter((r) => r.verified && r.quote && r.name);
  if (!verified.length) return null;
  return (
    <section className="section stone">
      <Container>
        <Eyebrow>From our guests</Eyebrow>
        {verified.map((r) => (
          <blockquote key={r.name}>
            <p className="story-statement">“{r.quote}”</p>
            <cite>{r.name}</cite>
          </blockquote>
        ))}
      </Container>
    </section>
  );
}
