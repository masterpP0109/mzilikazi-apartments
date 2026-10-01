import { Container, Eyebrow, ImageFrame } from "@/components/ui/Editorial";
import { stayMoments } from "@/lib/planning";
export default function LifeAtMzilikazi() {
  return (
    <section className="section">
      <Container>
        <Eyebrow>Life at Mzilikazi</Eyebrow>
        <h2>Make yourself at home.</h2>
        <div className="journey-grid moments-grid">
          {stayMoments.map((m) => (
            <article key={m.title}>
              <ImageFrame media={m.media} />
              <h3>{m.title}</h3>
              <p>{m.copy}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
