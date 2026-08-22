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

export const metadata: Metadata = {
  title: 'Mzilikazi Rooms | Self-Catering Accommodation in Victoria Falls, Zimbabwe',
  description:
    'Self-catering rooms with kitchens in Victoria Falls, Zimbabwe. Comfortable, spacious accommodation for couples, families and groups. Book your stay near Victoria Falls.',
};

export default function HomePage() {
  return (
    <>
      {/* 1. DESIRE — Make them want it */}
      <Hero />

      {/* 2. RELEVANCE — Build trust immediately */}
      <TrustStrip />

      {/* 3. PROOF OF PRODUCT — Show the actual stay */}
      <TheStay />

      {/* 4. PRODUCT — Show the apartments */}
      <ApartmentsPreview />

      {/* 5. DIFFERENTIATION — Why this over alternatives */}
      <WhyMzilikazi />

      {/* 6. VALUE — Destination value */}
      <Experience />

      {/* 7. SERVICES — Transfers, tours, adventure, wildlife */}
      <LocalServices />

      {/* 8. RELEVANCE — Who is this for, segmented with services */}
      <WhoIsItFor />

      {/* 9. PROOF — Social proof */}
      <Proof />

      {/* 10. VALUE SUMMARY — What's included */}
      <Offer />

      {/* 11. RISK REDUCTION — FAQs */}
      <FAQ />

      {/* 12. ACTION — Enquiry form */}
      <Contact />

      {/* 13. EMOTIONAL CLOSE — Final CTA */}
      <FinalCTA />
    </>
  );
}
