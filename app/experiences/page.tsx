import { PageIntro, Container } from "@/components/ui/Editorial";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { experiences } from "@/lib/property";
import { pageMetadata } from "@/lib/seo";
import FinalCTA from "@/components/home/FinalCTA";
export const metadata = pageMetadata(
  "Victoria Falls experiences",
  "Find inspiration for your Victoria Falls visit, from the Falls to wildlife and local culture.",
  "/experiences",
);
export default function ExperiencesPage() {
  return (
    <>
      <PageIntro eyebrow="Beyond your stay" title="Days worth coming for.">
        <p>
          A little wonder, a change of pace, a new perspective. Make room for
          the experiences that matter to you.
        </p>
      </PageIntro>
      <section className="section">
        <Container>
          {experiences
            .filter((e) => e.enabled)
            .map((e, i) => (
              <ExperienceCard key={e.slug} experience={e} index={i} />
            ))}
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
