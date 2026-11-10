import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { experiences } from "@/lib/experience-content";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Experience() {
  const featuredExperiences = experiences.filter((e) => e.enabled && e.featured).slice(0, 3);

  return (
    <section className="section experience-preview" id="experiences" aria-labelledby="discover-experiences-title">
      <Container>
        <ScrollReveal>
          <div className="experience-intro">
            <Eyebrow>Beyond your doorstep</Eyebrow>
            <h2 id="discover-experiences-title">Discover what you can experience in Victoria Falls</h2>
            <p>
              From exploring the Falls to spending time on the river, discover the experiences that suit your interests and the pace of your stay.
            </p>
          </div>
        </ScrollReveal>

        <div className="experience-grid mobile-snap-row">
          {featuredExperiences.map((experience, index) => (
            <ScrollReveal key={experience.slug} delayMs={index * 120} className="snap-card-wrap">
              <ExperienceCard experience={experience} heading="h3" />
            </ScrollReveal>
          ))}
        </div>

        <div className="actions experience-actions">
          <TextLink href="/experiences">Browse all experiences</TextLink>
          <TextLink href="/apartments">Explore the Stay</TextLink>
        </div>
      </Container>
    </section>
  );
}
