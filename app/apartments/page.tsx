import { Container, PageIntro } from "@/components/ui/Editorial";
import { publishedAccommodations } from "@/lib/property";
import {
  AccommodationCard,
  AccommodationFallback,
} from "@/components/ui/AccommodationCard";
import FinalCTA from "@/components/home/FinalCTA";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Accommodation in Victoria Falls",
  "Find your space for a Victoria Falls stay. Enquire about accommodation options, current rates and availability.",
  "/apartments",
);
export default function ApartmentsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Stay with us"
        title="A little more room to be yourself."
      >
        <p>
          Come with plans, or leave a few days open. Start by finding the right
          space for your visit.
        </p>
      </PageIntro>
      <section className="section">
        <Container>
          {publishedAccommodations.length ? (
            <div className="accommodation-list">
              {publishedAccommodations.map((a) => (
                <AccommodationCard key={a.slug} apartment={a} />
              ))}
            </div>
          ) : (
            <AccommodationFallback />
          )}
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
