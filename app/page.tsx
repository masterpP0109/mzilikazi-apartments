import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import TheStay from '@/components/home/TheStay';
import ApartmentsPreview from '@/components/home/ApartmentsPreview';
import WhyMzilikazi from '@/components/home/WhyMzilikazi';
import Experience from '@/components/home/Experience';
import LocalServices from '@/components/home/LocalServices';
import WhoIsItFor from '@/components/home/WhoIsItFor';
import Proof from '@/components/home/Proof';
import Offer from '@/components/home/Offer';
import FAQ from '@/components/home/FAQ';
import Contact from '@/components/home/Contact';
import FinalCTA from '@/components/home/FinalCTA';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${SITE_NAME} | ${SITE_TAGLINE} | Victoria Falls, Zimbabwe`,
  description:
    'Mzilikazi Guest Lodge in Victoria Falls, Zimbabwe. Comfortable self-catering suites, curated safaris and tours, digital concierge planning, and airport transfers.',
};

export default function HomePage() {
  return (
    <>
      {/* 1. DESIRE — Hero with value prop & Digital Concierge trigger */}
      <Hero />

      {/* 2. RELEVANCE — Trust & capability strip */}
      <TrustStrip />

      {/* 3. PROOF OF PRODUCT — Living space, kitchen & private chef */}
      <TheStay />

      {/* 4. PRODUCT — Available Suites & Rooms */}
      <ApartmentsPreview />

      {/* 5. DIFFERENTIATION — Why Mzilikazi vs generic hotels */}
      <WhyMzilikazi />

      {/* 6. VALUE — Victoria Falls destination context */}
      <Experience />

      {/* 7. SERVICES — Curated safaris, Chobe day trip, Falls tours & activities */}
      <LocalServices />

      {/* 8. AUDIENCE SEGMENTS — Families, Corporate, Couples, Adventure */}
      <WhoIsItFor />

      {/* 9. PROOF & REVIEWS — Guest reviews & Direct booking perks */}
      <Proof />

      {/* 10. VALUE SUMMARY — What's included in every stay */}
      <Offer />

      {/* 11. FAQ — Comprehensive trip planning answers */}
      <FAQ />

      {/* 12. ACTION — Reservation enquiry */}
      <Contact />

      {/* 13. EMOTIONAL CLOSE — Final CTA */}
      <FinalCTA />
    </>
  );
}
