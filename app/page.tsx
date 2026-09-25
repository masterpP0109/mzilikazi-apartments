import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ApartmentsPreview from "@/components/home/ApartmentsPreview";
import TheStay from "@/components/home/TheStay";
import Experience from "@/components/home/Experience";
import LocalServices from "@/components/home/LocalServices";
import Proof from "@/components/home/Proof";
import FinalCTA from "@/components/home/FinalCTA";
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
      <TrustStrip />
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
      <Experience />
      <LocalServices />
      <Proof />
      <FinalCTA />
    </>
  );
}
