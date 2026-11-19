import WhereToStay from "@/components/ui/WhereToStay";
import ApartmentComparison from "@/components/ui/ApartmentComparison";
import { Container, PageIntro } from "@/components/ui/Editorial";
import {
  publishedAccommodations,
  accommodationPreviews,
  propertyPhotos,
} from "@/lib/property";
import {
  AccommodationCard,
  AccommodationFallback,
} from "@/components/ui/AccommodationCard";
import FinalCTA from "@/components/home/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Two-Bedroom Self-Catering Apartments in Victoria Falls",
  "Explore three spacious two-bedroom self-catering apartments in Victoria Falls at US$130 per night for up to four guests. Compare sleeping setups, bathrooms, and amenities.",
  "/apartments",
);

export default function ApartmentsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Stay with us · Victoria Falls"
        title="Two-bedroom self-catering apartments."
        media={propertyPhotos.exteriorVeranda}
        mediaRatio="wide"
      >
        <p>
          Three two-bedroom apartments sleeping up to four guests each — with
          self-catering kitchens, air conditioning, Wi-Fi, and on-site parking
          at US$130 per night.
        </p>
      </PageIntro>
      <section
        id="rooms"
        className="section"
        tabIndex={-1}
        aria-label="Accommodation options"
      >
        <Container>
          {publishedAccommodations.length ? (
            <div className="accommodation-list property-accommodation-list">
              {publishedAccommodations.map((a, index) => (
                <AccommodationCard
                  key={a.slug}
                  apartment={a}
                  propertyPreview={
                    accommodationPreviews[index % accommodationPreviews.length]
                  }
                />
              ))}
            </div>
          ) : (
            <AccommodationFallback />
          )}
          <ApartmentComparison />
        </Container>
      </section>
      <WhereToStay showOptions={false} />
      <FinalCTA />
    </>
  );
}
