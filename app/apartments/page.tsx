import type { Metadata } from 'next';
import Link from 'next/link';
import { Users, BedDouble, ArrowRight } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

export const metadata: Metadata = {
  title: 'Apartments',
  description:
    'Browse all self-catering apartments at Mzilikazi, Victoria Falls. Choose the right space for your group — couples, families and extended stays welcome.',
};

// [PLACEHOLDER — replace with real Sanity data via sanityClient.fetch(APARTMENTS_QUERY)]
const apartments = [
  {
    id: '1',
    slug: 'apartment-one',
    name: '[PLACEHOLDER — confirm with client]',
    tagline: '[PLACEHOLDER — confirm tagline with client]',
    capacity: '[PLACEHOLDER]',
    bedrooms: '[PLACEHOLDER]',
    beds: '[PLACEHOLDER]',
    shortDescription: '[PLACEHOLDER — confirm short description with client]',
    highlights: [
      '[PLACEHOLDER — confirm highlights with client]',
      '[PLACEHOLDER — confirm highlights with client]',
      '[PLACEHOLDER — confirm highlights with client]',
    ],
    imageLabel: 'Apartment One interior [PLACEHOLDER — confirm with client]',
  },
  {
    id: '2',
    slug: 'apartment-two',
    name: '[PLACEHOLDER — confirm with client]',
    tagline: '[PLACEHOLDER — confirm tagline with client]',
    capacity: '[PLACEHOLDER]',
    bedrooms: '[PLACEHOLDER]',
    beds: '[PLACEHOLDER]',
    shortDescription: '[PLACEHOLDER — confirm short description with client]',
    highlights: [
      '[PLACEHOLDER — confirm highlights with client]',
      '[PLACEHOLDER — confirm highlights with client]',
      '[PLACEHOLDER — confirm highlights with client]',
    ],
    imageLabel: 'Apartment Two interior [PLACEHOLDER — confirm with client]',
  },
  {
    id: '3',
    slug: 'apartment-three',
    name: '[PLACEHOLDER — confirm with client]',
    tagline: '[PLACEHOLDER — confirm tagline with client]',
    capacity: '[PLACEHOLDER]',
    bedrooms: '[PLACEHOLDER]',
    beds: '[PLACEHOLDER]',
    shortDescription: '[PLACEHOLDER — confirm short description with client]',
    highlights: [
      '[PLACEHOLDER — confirm highlights with client]',
      '[PLACEHOLDER — confirm highlights with client]',
      '[PLACEHOLDER — confirm highlights with client]',
    ],
    imageLabel: 'Apartment Three interior [PLACEHOLDER — confirm with client]',
  },
];

export default function ApartmentsPage() {
  return (
    <div className="pt-20 bg-[#FAF6EE] min-h-screen">
      {/* Page header */}
      <section className="bg-[#0B1B2B] py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow theme="light" className="mb-4">Accommodation</SectionEyebrow>
          <OchreLine className="mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#FAF6EE] leading-tight max-w-2xl">
            Find the right space for your visit.
          </h1>
          <p className="font-inter text-[#FAF6EE]/70 text-lg mt-4 max-w-xl">
            Each apartment is fully self-catering, thoughtfully equipped and ready for couples, families or groups.
          </p>
        </div>
      </section>

      {/* Listing */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apt) => (
              <article
                key={apt.id}
                className="bg-white rounded-lg overflow-hidden border border-[#E2D9C8] hover:border-[#C8922A] transition-colors group flex flex-col"
              >
                <div className="overflow-hidden">
                  <ImagePlaceholder
                    ariaLabel={apt.imageLabel}
                    aspectRatio="4/3"
                    className="w-full group-hover:scale-105 transition-transform duration-500"
                    data-placeholder={`apartment_${apt.id}_hero_image`}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-playfair text-xl font-bold text-[#0B1B2B] mb-1">
                    {apt.name}
                  </h2>
                  <p className="font-inter text-sm text-[#4A5568] mb-4">
                    {apt.tagline}
                  </p>
                  <div className="flex gap-4 mb-4">
                    <span className="flex items-center gap-1.5 font-dm text-xs text-[#4A5568]">
                      <Users size={12} className="text-[#C8922A]" aria-hidden="true" />
                      Up to {apt.capacity} guests
                    </span>
                    <span className="flex items-center gap-1.5 font-dm text-xs text-[#4A5568]">
                      <BedDouble size={12} className="text-[#C8922A]" aria-hidden="true" />
                      {apt.bedrooms} bed(s)
                    </span>
                  </div>
                  <p className="font-inter text-sm text-[#4A5568] leading-relaxed mb-5 flex-1">
                    {apt.shortDescription}
                  </p>
                  <Link
                    href={`/apartments/${apt.slug}`}
                    className="inline-flex items-center gap-1.5 font-dm text-sm font-semibold text-[#C8922A] hover:text-[#0B1B2B] transition-colors mt-auto"
                  >
                    View apartment <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F0E8D6] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-2xl font-bold text-[#0B1B2B] mb-4">
            Not sure which apartment is right?
          </h2>
          <p className="font-inter text-[#4A5568] text-sm mb-6">
            Send us an enquiry and tell us about your group. We'll point you in the right direction.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
          >
            Make an Enquiry <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
