import { guideArticles, itineraries } from "@/lib/planning";
import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
export default function GuideDirectory() {
  return (
    <section id="guide" className="section stone">
      <Container>
        <Eyebrow>Your Victoria Falls guide</Eyebrow>
        <h2>A little preparation. More room to enjoy it.</h2>
        {["Start Here", "Planning", "During Your Stay", "Travel Styles"].map(
          (category) => (
            <section className="guide-category" key={category}>
              <h3>{category}</h3>
              <div className="journey-grid">
                {guideArticles
                  .filter((a) => a.category === category)
                  .map((a) => (
                    <article className="journey-card" key={a.slug}>
                      <TextLink href={"/victoria-falls/" + a.slug}>
                        {a.title}
                      </TextLink>
                      <p>{a.summary}</p>
                    </article>
                  ))}
              </div>
            </section>
          ),
        )}
        <section className="guide-category">
          <h3>Itineraries</h3>
          <div className="guide-links">
            {itineraries.map((i) => (
              <TextLink key={i.id} href={"/plan/itineraries/" + i.id}>
                {i.nights} nights · {i.title}
              </TextLink>
            ))}
            <TextLink href="/plan">
              Planning a week? Build your own outline
            </TextLink>
          </div>
        </section>
      </Container>
    </section>
  );
}
