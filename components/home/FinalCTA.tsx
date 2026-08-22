import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="bg-[#0B1B2B] py-24 lg:py-32"
      aria-label="Book your stay"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionEyebrow theme="light" className="mb-4">
          Your Victoria Falls Stay
        </SectionEyebrow>
        <OchreLine className="mx-auto mb-8" />

        <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#FAF6EE] leading-tight mb-6">
          Your Victoria Falls stay starts here.
        </h2>
        <p className="font-inter text-lg text-[#FAF6EE]/70 leading-relaxed max-w-xl mx-auto mb-10">
          One of the greatest natural wonders in the world is waiting. All you need is a comfortable, reliable place to come back to.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-base rounded hover:bg-[#D4A84B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8922A] focus-visible:ring-offset-2"
          >
            Book Your Stay <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/apartments"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-[#FAF6EE] text-[#FAF6EE] font-dm font-semibold text-base rounded hover:bg-[#FAF6EE] hover:text-[#0B1B2B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6EE] focus-visible:ring-offset-2"
          >
            Explore the Rooms
          </Link>
        </div>

        {/* Trust note */}
        <p className="font-inter text-xs text-[#FAF6EE]/30 mt-10">
          No hidden fees. No fabricated claims. Just a real place to stay near Victoria Falls.
        </p>
      </div>
    </section>
  );
}
