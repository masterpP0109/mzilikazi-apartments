import { PageIntro, Container } from "@/components/ui/Editorial";
import ExperienceExplorer from "@/components/trip/ExperienceExplorer";
import DayBuilder from "@/components/trip/DayBuilder";
import Itineraries from "@/components/trip/Itineraries";

import { pageMetadata } from "@/lib/seo";
import WhereToStay from "@/components/ui/WhereToStay";
import MoreExperiences from "@/components/ui/MoreExperiences";
import FinalCTA from "@/components/home/FinalCTA";
export const metadata = pageMetadata(
  "Victoria Falls experiences",
  "Find inspiration for your Victoria Falls visit, from the Falls to wildlife and local culture.",
  "/experiences",
);
export default function ExperiencesPage() {
  return (
    <>
      <PageIntro eyebrow="Beyond your stay" title="Discover what you can experience in Victoria Falls">
        <p>Make Mzilikazi your base, then choose the days out that suit you. Explore seven popular experiences with practical guides to timing, indicative prices, transport and what your day may involve. A host-led cultural visit is also included as a further planning idea.</p>
      </PageIntro>
      <section className="section">
        <Container>
          <ExperienceExplorer />
        </Container>
      </section>
      <MoreExperiences />
      <WhereToStay />
      <DayBuilder />
      <Itineraries />
      <FinalCTA />
    </>
  );
}
