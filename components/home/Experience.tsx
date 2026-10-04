import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { experiences } from "@/lib/experience-content";
export default function Experience() {
  return <section className="section experience-preview" id="experiences" aria-labelledby="discover-experiences-title">
    <Container><div className="experience-intro"><Eyebrow>Beyond your doorstep</Eyebrow>
      <h2 id="discover-experiences-title">Discover what you can experience in Victoria Falls</h2>
      <p>From exploring the Falls to spending time on the river, discover the experiences that suit your interests and the pace of your stay.</p>
    </div>
    <div className="experience-grid">{experiences.filter(e=>e.enabled && e.featured).map(e=><ExperienceCard key={e.slug} experience={e} heading="h3" />)}</div>
    <div className="actions"><TextLink href="/experiences">Browse all experiences</TextLink><TextLink href="/apartments">Explore the Stay</TextLink></div>
    </Container>
  </section>;
}
