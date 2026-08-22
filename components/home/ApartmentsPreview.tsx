import Link from 'next/link';
import Image from 'next/image';
import { Users, BedDouble, ArrowRight } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';

const apartments = [
  {
    id: '1',
    name: 'The Garden Room',
    tagline: 'A spacious room with a fully equipped kitchen and private garden view.',
    capacity: '2',
    bedrooms: '1',
    slug: 'apartment-one',
    // Warm, well-lit double bedroom with neat furnishings
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    imageAlt: 'Bright double bedroom with warm lighting and modern furnishings',
  },
  {
    id: '2',
    name: 'The Family Suite',
    tagline: 'Two bedrooms, a full kitchen, and generous living space for families.',
    capacity: '4',
    bedrooms: '2',
    slug: 'apartment-two',
    // Spacious bedroom with twin beds suitable for families
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
    imageAlt: 'Spacious family bedroom with twin beds and plenty of room',
  },
  {
    id: '3',
    name: 'The Falls View Room',
    tagline: 'A comfortable room with kitchen access and easy reach of the Falls.',
    capacity: '2',
    bedrooms: '1',
    slug: 'apartment-three',
    // Cosy bedroom with earthy tones
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
    imageAlt: 'Cosy bedroom with earthy tones and a comfortable double bed',
  },
];

export default function ApartmentsPreview() {
  return (
    <section
      id="apartments"
      className="bg-[#F0E8D6] py-20 lg:py-28"
      aria-label="Apartments"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionEyebrow className="mb-4">The Rooms</SectionEyebrow>
          <OchreLine className="mx-auto mb-6" />
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#0B1B2B] leading-tight">
            Find the right room for your visit.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {apartments.map((apt) => (
            <article
              key={apt.id}
              className="bg-white rounded-lg overflow-hidden border border-[#E2D9C8] hover:border-[#C8922A] transition-colors group"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                  src={apt.image}
                  alt={apt.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-[#0B1B2B] mb-1">
                  {apt.name}
                </h3>
                <p className="font-inter text-sm text-[#4A5568] mb-4">
                  {apt.tagline}
                </p>
                <div className="flex gap-4 mb-5">
                  <span className="flex items-center gap-1.5 font-dm text-xs text-[#4A5568]">
                    <Users size={13} className="text-[#C8922A]" aria-hidden="true" />
                    Up to {apt.capacity} guests
                  </span>
                  <span className="flex items-center gap-1.5 font-dm text-xs text-[#4A5568]">
                    <BedDouble size={13} className="text-[#C8922A]" aria-hidden="true" />
                    {apt.bedrooms} bedroom(s)
                  </span>
                </div>
                <Link
                  href={`/apartments/${apt.slug}`}
                  className="inline-flex items-center gap-1.5 font-dm text-sm font-semibold text-[#C8922A] hover:text-[#0B1B2B] transition-colors"
                  aria-label={`View details for ${apt.name}`}
                >
                  View room <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-12 text-center">
          <Link
            href="/apartments"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0B1B2B] text-[#FAF6EE] font-dm font-semibold text-sm rounded hover:bg-[#132338] transition-colors"
          >
            See all rooms <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
