import type { Metadata } from "next";
import Location from "@/components/home/Location";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import AvailabilityPanel from "@/components/forms/AvailabilityPanel";
import ApartmentsPreview from "@/components/home/ApartmentsPreview";
import TheStay from "@/components/home/TheStay";
import VictoriaFallsExtras from "@/components/home/VictoriaFallsExtras";
import Proof from "@/components/home/Proof";
import FinalCTA from "@/components/home/FinalCTA";
import { Container } from "@/components/ui/Editorial";
import { pageMetadata } from "@/lib/seo";

const baseMetadata = pageMetadata(
  "Self-Catering Accommodation in Victoria Falls",
  "Discover comfortable two-bedroom self-catering apartments in Victoria Falls, Zimbabwe. Explore accommodation for up to four guests and enquire about availability.",
  "/",
);

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute:
      "Mzilikazi Apartments | Self-Catering Accommodation in Victoria Falls",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="availability-band" aria-label="Have dates in mind">
        <Container>
          <div className="availability-band-header">
            <p className="eyebrow">Have dates already?</p>
            <p className="form-note">
              Enter your arrival, departure and guests to carry them straight into
              your enquiry.
            </p>
          </div>
          <AvailabilityPanel />
        </Container>
      </section>
      <ApartmentsPreview />
      <TheStay />
      <VictoriaFallsExtras />
      <Location />
      <Proof />
      <FAQ compact />
      <FinalCTA />
    </>
  );
}
