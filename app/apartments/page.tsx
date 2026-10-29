import WhereToStay from "@/components/ui/WhereToStay";
import ApartmentGallery from "@/components/ui/ApartmentGallery";
import ApartmentComparison from "@/components/ui/ApartmentComparison";
import { Container, PageIntro } from "@/components/ui/Editorial";
import { publishedAccommodations, propertyGallery, accommodationPreviews, propertyPhotos } from "@/lib/property";
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
        eyebrow="Stay with us · Victoria Falls"
        title="A little more room to be yourself."
        media={propertyPhotos.exteriorVeranda}
        mediaRatio="wide"
      >
        <p>
          Come with plans, or leave a few days open. Settle into a comfortable,
          self-catering apartment retreat with room to plan the days around it.
        </p>
      </PageIntro>
      <section id="rooms" className="section" tabIndex={-1} aria-label="Accommodation options">
        <Container>
          {publishedAccommodations.length ? (
            <div className="accommodation-list property-accommodation-list">
              {publishedAccommodations.map((a, index) => (
                <AccommodationCard key={a.slug} apartment={a} propertyPreview={accommodationPreviews[index % accommodationPreviews.length]} />
              ))}
            </div>
          ) : (
            <AccommodationFallback />
          )}
          <section className="property-gallery" aria-labelledby="property-gallery-title">
            <h2 id="property-gallery-title">A closer look at Mzilikazi.</h2>
            <p>Explore the bedrooms, living spaces and apartment details. Ask us which space suits your stay.</p>
            <ApartmentGallery images={propertyGallery} />
          </section>
          <ApartmentComparison />
        </Container>
      </section>
      <WhereToStay showOptions={false} />
      <FinalCTA />
    </>
  );
}
