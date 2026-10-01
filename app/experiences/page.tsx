import { PageIntro, Container } from "@/components/ui/Editorial";
import ExperienceExplorer from "@/components/trip/ExperienceExplorer";
import DayBuilder from "@/components/trip/DayBuilder";
import Itineraries from "@/components/trip/Itineraries";

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
          <ExperienceExplorer />
        </Container>
      </section>
      <DayBuilder />
      <Itineraries />
      <FinalCTA />
    </>
  );
}
