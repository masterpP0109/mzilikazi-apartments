import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Users, BedDouble, ArrowRight, UtensilsCrossed, Wifi, ShieldCheck, Sparkles } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Suites & Self-Catering Accommodation | Victoria Falls',
  description:
    'Browse spacious 1-bedroom and 2-bedroom self-catering suites at Mzilikazi Guest Lodge, Victoria Falls. Full kitchens, private lounges, solar backup, high-speed Wi-Fi and family spaces.',
};

const suites = [
  {
    id: 'zambezi-suite',
    slug: 'zambezi-suite',
    name: 'The Zambezi Executive Suite',
    tagline: 'Two bedrooms, generous lounge, full modern kitchen, and private terrace.',
    capacity: '4 – 5',
    bedrooms: '2',
    beds: '1 King Bed + 2 Twin Beds (or 2 Kings)',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85',
    imageAlt: 'The Zambezi Executive Suite living and bedroom',
    shortDescription:
      'Designed for delegates, discerning couples, or small groups seeking extra privacy, dedicated workstations, and complete culinary independence.',
    highlights: [
      'Master bedroom with King bed & en-suite bathroom',
      'Second bedroom with flexible twin beds',
      'Full kitchen with stove, refrigerator, coffee machine & cookware',
      'Solar-backed power and high-speed Wi-Fi',
    ],
  },
  {
    id: 'family-suite',
    slug: 'family-suite',
    name: 'The Mosi-oa-Tunya Family Suite',
    tagline: 'Spacious 2-bedroom home base with private lounge, full kitchen, and garden access.',
    capacity: '4 – 6',
    bedrooms: '2',
    beds: '1 King Bed + 2 Single Beds + Sofa Bed',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=900&q=85',
    imageAlt: 'The Mosi-oa-Tunya Family Suite interior',
    shortDescription:
      'The ideal choice for families and small travelling parties who want everyone under one secure roof with ample space to relax between safaris.',
    highlights: [
      'Separate bedrooms for parents and children',
      'Full family kitchen and dining table',
      'Spacious living room for evening board games & relaxation',
      'Child-friendly layout and baby cot available on request',
    ],
  },
  {
    id: 'batoka-suite',
    slug: 'batoka-suite',
    name: 'The Batoka Garden Suite',
    tagline: 'Quiet 1-bedroom sanctuary with King bed, kitchen, and serene garden view.',
    capacity: '2',
    bedrooms: '1',
    beds: '1 Plush King Bed',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=900&q=85',
    imageAlt: 'The Batoka Garden Suite bedroom and garden view',
    shortDescription:
      'Perfect for couples or solo business travellers who want peaceful rest, great coffee, and an unhurried, comfortable Victoria Falls base.',
    highlights: [
      'Generous King bedroom with luxury cotton linens',
      'Equipped kitchen for slow breakfasts and private meals',
      'Work desk and dedicated high-speed Wi-Fi',
      'Air conditioning and garden patio seating',
    ],
  },
];

export default function ApartmentsPage() {
  return (
    <div className="pt-20 bg-[#FAF6EE] min-h-screen">
      {/* Hero */}
      <section className="bg-[#0B1B2B] py-20 lg:py-24 relative overflow-hidden text-[#FAF6EE]">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 75% 35%, rgba(200,146,42,0.1) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionEyebrow theme="light" className="mb-4">
            Accommodation &amp; Suites
          </SectionEyebrow>
          <OchreLine className="mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mb-5">
            Space to settle in.{' '}
            <em className="italic font-normal text-[#D4A84B]">
              A true Victoria Falls home base.
            </em>
          </h1>
          <p className="font-inter text-[#FAF6EE]/75 text-lg max-w-2xl leading-relaxed mb-6">
            Every suite at {SITE_NAME} features a fully equipped kitchen, comfortable living spaces, solar backup power, and dedicated local support. Choose the right layout for your group.
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-inter text-[#FAF6EE]/80">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#132338] rounded border border-[#0B1B2B]">
              <UtensilsCrossed size={14} className="text-[#C8922A]" /> Full Self-Catering Kitchens
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#132338] rounded border border-[#0B1B2B]">
              <Wifi size={14} className="text-[#C8922A]" /> High-Speed Wi-Fi
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#132338] rounded border border-[#0B1B2B]">
              <ShieldCheck size={14} className="text-[#C8922A]" /> Solar Backup Power
            </span>
          </div>
        </div>
      </section>

      {/* Suites list */}
      <section className="py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {suites.map((suite) => (
              <article
                key={suite.id}
                className="bg-white border border-[#E2D9C8] rounded-2xl overflow-hidden shadow-sm hover:border-[#C8922A] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Image */}
                <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[420px]">
                  <Image
                    src={suite.image}
                    alt={suite.imageAlt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B1B2B]/90 text-[#D4A84B] font-dm text-xs font-semibold rounded backdrop-blur-sm border border-[#C8922A]/30">
                    <Sparkles size={13} className="text-[#C8922A]" />
                    {suite.bedrooms} Bedroom Suite
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#0B1B2B] mb-2">
                      {suite.name}
                    </h2>
                    <p className="font-inter text-sm text-[#C8922A] font-medium mb-4">
                      {suite.tagline}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-[#E2D9C8] text-xs font-dm text-[#4A5568]">
                      <span className="flex items-center gap-1.5 bg-[#FAF6EE] px-2.5 py-1 rounded">
                        <Users size={14} className="text-[#C8922A]" /> Sleeps {suite.capacity}
                      </span>
                      <span className="flex items-center gap-1.5 bg-[#FAF6EE] px-2.5 py-1 rounded">
                        <BedDouble size={14} className="text-[#C8922A]" /> {suite.beds}
                      </span>
                    </div>

                    <p className="font-inter text-sm text-[#4A5568] leading-relaxed mb-6">
                      {suite.shortDescription}
                    </p>

                    <ul className="space-y-2 mb-8">
                      {suite.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-xs font-inter text-[#4A5568]">
                          <span className="text-[#C8922A] font-bold">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#FAF6EE]">
                    <Link
                      href={`/apartments/${suite.slug}`}
                      className="px-6 py-3 bg-[#0B1B2B] text-[#FAF6EE] font-dm font-semibold text-xs rounded hover:bg-[#132338] transition-colors inline-flex items-center gap-2"
                    >
                      <span>View Suite &amp; Floorplan</span>
                      <ArrowRight size={14} />
                    </Link>
                    <Link
                      href={`/contact?apartment=${encodeURIComponent(suite.name)}`}
                      className="px-6 py-3 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-xs rounded hover:bg-[#D4A84B] transition-colors"
                    >
                      Enquire for This Suite
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
