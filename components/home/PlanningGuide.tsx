import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import { guideArticles } from "@/lib/planning";
export default function PlanningGuide() {
  return (
    <section className="section stone">
      <Container>
        <Eyebrow>A little local planning</Eyebrow>
        <h2>Planning your first Victoria Falls trip?</h2>
        <div className="guide-links">
          {[
            "when-to-visit",
            "how-many-days",
            "budget",
            "getting-around",
            "what-to-pack",
            "families",
          ].map((slug) => {
            const a = guideArticles.find((g) => g.slug === slug)!;
            return (
              <TextLink key={slug} href={"/victoria-falls/" + slug}>
                {a.title}
              </TextLink>
            );
          })}
        </div>
        <div className="actions">
          <TextLink href="/victoria-falls">
            Explore the Victoria Falls Guide
          </TextLink>
        </div>
      </Container>
    </section>
  );
}
