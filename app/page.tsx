import Location from "@/components/home/Location";
import LocalTeam from "@/components/home/LocalTeam";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ApartmentsPreview from "@/components/home/ApartmentsPreview";
import TheStay from "@/components/home/TheStay";
import Experience from "@/components/home/Experience";
import TransfersSection from "@/components/home/TransfersSection";
import LocalServices from "@/components/home/LocalServices";
import Proof from "@/components/home/Proof";
import FinalCTA from "@/components/home/FinalCTA";
import Itineraries from "@/components/trip/Itineraries";
import { Container, ImageFrame } from "@/components/ui/Editorial";
import { propertyMedia, isPublicMedia } from "@/lib/property";
import { SITE_TAGLINE } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Your Victoria Falls home base",
  SITE_TAGLINE,
  "/",
);
export default function HomePage() {
  return (
    <>
      <Hero />
      <ApartmentsPreview />
      <TheStay />
      {isPublicMedia(propertyMedia.pause) && (
        <section className="section photo-break">
          <Container>
            <ImageFrame media={propertyMedia.pause} ratio="wide" />
            <h2>Space to settle in.</h2>
          </Container>
        </section>
      )}
      <TransfersSection />
      <Experience />
      <Itineraries />
      <Location />
      <LocalServices />
      <LocalTeam />
      <TrustStrip />
      <Proof />
      <FAQ compact />
      <FinalCTA />
    </>
  );
}
