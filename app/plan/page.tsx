import { PageIntro, Container, TextLink } from "@/components/ui/Editorial";
import TripPlanner from "@/components/trip/TripPlanner";
import DayBuilder from "@/components/trip/DayBuilder";
import Itineraries from "@/components/trip/Itineraries";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Plan your Victoria Falls trip",
  "Build a simple plan around your travellers, dates and interests. Save ideas and send one enquiry.",
  "/plan",
);
export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return (
    <>
      <PageIntro
        eyebrow="Make a little plan"
        title="Your people. Your pace. Your Victoria Falls trip."
      >
        <p>
          Start with who is coming. Save a few ideas, then tell us what you have
          in mind.
        </p>
      </PageIntro>
      <section id="trip-planner" className="section">
        <Container>
          <div className="planner-page">
            <TripPlanner
              initialInterest={
                typeof params.interest === "string"
                  ? ((
                      {
                        Relaxed: "Relaxation",
                        Iconic: "Victoria Falls",
                        Family: "Family Time",
                      } as Record<string, string>
                    )[params.interest] ?? params.interest)
                  : undefined
              }
              initialSegment={
                typeof params.traveller === "string"
                  ? params.traveller
                  : undefined
              }
            />
          </div>
          <div className="actions">
            <TextLink href="#itineraries">Browse itineraries</TextLink>
            <TextLink href="/victoria-falls/getting-here">
              Getting here
            </TextLink>
            <TextLink href="/faq">Before you arrive</TextLink>
          </div>
        </Container>
      </section>
      <DayBuilder />
      <Itineraries />
    </>
  );
}
