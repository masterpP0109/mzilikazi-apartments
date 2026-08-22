import type { Metadata } from 'next';
import Contact from '@/components/home/Contact';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Mzilikazi Apartments in Victoria Falls, Zimbabwe. Enquire about availability, ask questions, or start planning your stay.',
};

export default function ContactPage() {
  return (
    <div className="pt-20 bg-[#FAF6EE] min-h-screen">
      {/* Page header */}
      <section className="bg-[#0B1B2B] py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow theme="light" className="mb-4">Get in Touch</SectionEyebrow>
          <OchreLine className="mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#FAF6EE] leading-tight mb-4">
            Let's plan your stay.
          </h1>
          <p className="font-inter text-[#FAF6EE]/70 text-lg">
            Send us an enquiry and we'll respond within 24 hours with availability and next steps.
          </p>
        </div>
      </section>

      {/* Contact section (reuses homepage component) */}
      <Contact />
    </div>
  );
}
