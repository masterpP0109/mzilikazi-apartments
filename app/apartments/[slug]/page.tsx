import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Users, BedDouble, ArrowRight } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

// [PLACEHOLDER — replace with real Sanity data via sanityClient.fetch(APARTMENT_BY_SLUG_QUERY)]
const apartmentData: Record<string, {
  name: string;
  tagline: string;
  capacity: string;
  bedrooms: string;
  beds: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  amenities: string[];
}> = {
  'apartment-one': {
    name: '[PLACEHOLDER — confirm with client]',
    tagline: '[PLACEHOLDER — confirm tagline with client]',
    capacity: '[PLACEHOLDER]',
    bedrooms: '[PLACEHOLDER]',
    beds: '[PLACEHOLDER]',
    shortDescription: '[PLACEHOLDER — confirm short description with client]',
    longDescription: '[PLACEHOLDER — confirm long description with client]',
    highlights: [
      '[PLACEHOLDER — confirm with client]',
      '[PLACEHOLDER — confirm with client]',
      '[PLACEHOLDER — confirm with client]',
    ],
    amenities: [
      'Fully equipped kitchen [PLACEHOLDER — confirm spec with client]',
      'Wi-Fi [PLACEHOLDER — confirm speed with client]',
      'Air conditioning [PLACEHOLDER — confirm with client]',
      'Linen and towels',
      'Parking [PLACEHOLDER — confirm with client]',
    ],
  },
  'apartment-two': {
    name: '[PLACEHOLDER — confirm with client]',
    tagline: '[PLACEHOLDER — confirm tagline with client]',
    capacity: '[PLACEHOLDER]',
    bedrooms: '[PLACEHOLDER]',
    beds: '[PLACEHOLDER]',
    shortDescription: '[PLACEHOLDER — confirm short description with client]',
    longDescription: '[PLACEHOLDER — confirm long description with client]',
    highlights: ['[PLACEHOLDER — confirm with client]'],
    amenities: ['[PLACEHOLDER — confirm amenities with client]'],
  },
  'apartment-three': {
    name: '[PLACEHOLDER — confirm with client]',
    tagline: '[PLACEHOLDER — confirm tagline with client]',
    capacity: '[PLACEHOLDER]',
    bedrooms: '[PLACEHOLDER]',
    beds: '[PLACEHOLDER]',
    shortDescription: '[PLACEHOLDER — confirm short description with client]',
    longDescription: '[PLACEHOLDER — confirm long description with client]',
    highlights: ['[PLACEHOLDER — confirm with client]'],
    amenities: ['[PLACEHOLDER — confirm amenities with client]'],
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const apt = apartmentData[slug];
  if (!apt) return {};
  return {
    title: apt.name,
    description: apt.shortDescription,
  };
}

export async function generateStaticParams() {
  return Object.keys(apartmentData).map((slug) => ({ slug }));
}

export default async function ApartmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const apt = apartmentData[slug];
  if (!apt) notFound();

  return (
    <div className="pt-20 bg-[#FAF6EE] min-h-screen">
      {/* Hero */}
      <section className="bg-[#0B1B2B] py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/apartments"
            className="inline-flex items-center gap-2 font-dm text-sm text-[#FAF6EE]/60 hover:text-[#C8922A] transition-colors mb-6"
          >
            ← All apartments
          </Link>
          <SectionEyebrow theme="light" className="mb-4">Apartment</SectionEyebrow>
          <OchreLine className="mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#FAF6EE] leading-tight mb-3">
            {apt.name}
          </h1>
          <p className="font-inter text-[#FAF6EE]/70 text-lg">{apt.tagline}</p>
          <div className="flex gap-6 mt-4">
            <span className="flex items-center gap-2 font-dm text-sm text-[#FAF6EE]/60">
              <Users size={14} className="text-[#C8922A]" aria-hidden="true" />
              Up to {apt.capacity} guests
            </span>
            <span className="flex items-center gap-2 font-dm text-sm text-[#FAF6EE]/60">
              <BedDouble size={14} className="text-[#C8922A]" aria-hidden="true" />
              {apt.bedrooms} bedroom(s) · {apt.beds} bed(s)
            </span>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#F0E8D6] py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <ImagePlaceholder
                key={i}
                ariaLabel={`${apt.name} — photo ${i} [PLACEHOLDER — confirm with client]`}
                aspectRatio="4/3"
                className="rounded"
                data-placeholder={`apartment_${slug}_gallery_${i}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="font-playfair text-2xl font-bold text-[#0B1B2B] mb-4">
                About this apartment
              </h2>
              <p className="font-inter text-[#4A5568] text-base leading-relaxed mb-8">
                {apt.longDescription}
              </p>

              {/* Highlights */}
              <h3 className="font-dm font-semibold text-[#0B1B2B] text-base mb-4">
                Highlights
              </h3>
              <ul className="space-y-2 mb-8">
                {apt.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <Check size={15} className="text-[#C8922A] mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="font-inter text-sm text-[#4A5568]">{h}</span>
                  </li>
                ))}
              </ul>

              {/* Amenities */}
              <h3 className="font-dm font-semibold text-[#0B1B2B] text-base mb-4">
                Amenities
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {apt.amenities.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <Check size={14} className="text-[#C8922A] mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="font-inter text-sm text-[#4A5568]">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-[#0B1B2B] rounded-lg p-6 sticky top-24">
                <p className="font-playfair text-2xl font-bold text-[#C8922A] mb-1">
                  {/* [PLACEHOLDER — confirm pricing with client] */}
                  Price on request
                </p>
                <p className="font-inter text-xs text-[#FAF6EE]/40 mb-6">
                  [PLACEHOLDER — confirm pricing with client]
                </p>
                <Link
                  href={`/contact?apartment=${slug}`}
                  className="block w-full text-center py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
                >
                  Enquire About This Apartment
                </Link>
                <p className="font-inter text-xs text-[#FAF6EE]/40 text-center mt-3">
                  We respond within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related CTA */}
      <section className="bg-[#F0E8D6] py-12">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="font-inter text-[#4A5568] text-sm mb-4">
            Looking at all your options?
          </p>
          <Link
            href="/apartments"
            className="inline-flex items-center gap-2 font-dm text-sm font-semibold text-[#C8922A] hover:text-[#0B1B2B] transition-colors"
          >
            View all apartments <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
