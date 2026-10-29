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
  const heroImage = {
    src: "/mzilikazi imgs/Experiences/Flight of Angels/Heli-8-scaled.jpg",
    alt: "Breathtaking aerial view of Victoria Falls, rainbow mist and the Zambezi gorge",
    kind: "destination" as const,
    verified: true,
  };

  return (
    <>
      <PageIntro
        eyebrow="Beyond your stay · Victoria Falls"
        title="Discover what you can experience in Victoria Falls"
        media={heroImage}
        mediaRatio="wide"
      >
        <p>Make Mzilikazi your base, then choose the days out that suit you. Explore popular excursions with practical guides to timing, indicative prices, transport and what your day may involve.</p>
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
