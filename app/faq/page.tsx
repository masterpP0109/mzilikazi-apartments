import type { Metadata } from 'next';
import FAQ from '@/components/home/FAQ';
import Link from 'next/link';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Common questions about staying at Mzilikazi Apartments in Victoria Falls, Zimbabwe — check-in, self-catering, activities, policies and more.',
};

export default function FAQPage() {
  return (
    <div className="pt-20 bg-[#FAF6EE] min-h-screen">
      {/* Page header */}
      <section className="bg-[#0B1B2B] py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow theme="light" className="mb-4">FAQ</SectionEyebrow>
          <OchreLine className="mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#FAF6EE] leading-tight mb-4">
            Common questions answered.
          </h1>
          <p className="font-inter text-[#FAF6EE]/70 text-lg">
            Everything you need to know before booking. Can&apos;t find what you&apos;re looking for? Send us a message.
          </p>
        </div>
      </section>

      {/* FAQ accordion */}
      <FAQ />

      {/* CTA */}
      <section className="bg-[#F0E8D6] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-2xl font-bold text-[#0B1B2B] mb-4">
            Still have a question?
          </h2>
          <p className="font-inter text-[#4A5568] text-sm mb-6">
            We respond to all enquiries within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
          >
            Contact Us <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
