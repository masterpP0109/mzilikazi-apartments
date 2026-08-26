import Link from 'next/link';
import Image from 'next/image';
import {
  Plane,
  Binoculars,
  Waves,
  ArrowDown,
  Wind,
  Footprints,
  Sunset,
  Users,
  ChefHat,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import { LOCAL_SERVICES } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  Plane,
  Binoculars,
  Waves,
  ArrowDown,
  Wind,
  Footprints,
  Sunset,
  Users,
  ChefHat,
  Compass,
};

const serviceImages: Record<string, { src: string; alt: string }> = {
  'chobe-day-trip': {
    src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=75',
    alt: 'Elephants on the Chobe River in Botswana',
  },
  'guided-tours': {
    src: 'https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=600&q=75',
    alt: 'Victoria Falls viewed from a guided tour path',
  },
  'zambezi-sunset-cruise': {
    src: 'https://images.unsplash.com/photo-1504704911898-68304a7d2807?w=600&q=75',
    alt: 'Sunset cruise on the Zambezi river',
  },
  'helicopter-flights': {
    src: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=600&q=75',
    alt: 'Helicopter flight of angels over Victoria Falls',
  },
  'cultural-experiences': {
    src: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=75',
    alt: 'Traditional Zimbabwean village and crafts',
  },
  'private-chef': {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=75',
    alt: 'Private in-apartment chef cooking fresh meals',
  },
  'airport-transfers': {
    src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=75',
    alt: 'Airport transfer vehicle waiting',
  },
  'whitewater-rafting': {
    src: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=600&q=75',
    alt: 'White-water rafting in the Batoka Gorge',
  },
  'bungee-jumping': {
    src: 'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=600&q=75',
    alt: 'Victoria Falls bridge bungee jumping',
  },
};

const FEATURED_SERVICE_IDS = [
  'chobe-day-trip',
  'guided-tours',
  'zambezi-sunset-cruise',
  'helicopter-flights',
  'cultural-experiences',
  'private-chef',
];

const homepageServices = LOCAL_SERVICES.filter((s) =>
  FEATURED_SERVICE_IDS.includes(s.id)
);

export default function LocalServices() {
  return (
    <section
      id="local-services"
      className="bg-[#0B1B2B] py-20 lg:py-28 text-[#FAF6EE]"
      aria-label="Activities and experiences in Victoria Falls"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-16 items-end">
          <div>
            <SectionEyebrow theme="light" className="mb-4">
              Curated Destination Safaris &amp; Activities
            </SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#FAF6EE] leading-tight">
              We know Victoria Falls.{' '}
              <em className="italic font-normal text-[#D4A84B]">
                Let us plan your adventures.
              </em>
            </h2>
          </div>
          <div>
            <p className="font-inter text-[#FAF6EE]/70 text-base leading-relaxed">
              Navigating Victoria Falls operators alone is overwhelming. As your Connected Home Base, we connect you with vetted guides, handle airport and safari transfers, and ensure seamless door-to-door coordination.
            </p>
            <div className="mt-6 flex items-start gap-3 p-4 bg-[#132338] rounded-lg border border-[#0B1B2B]">
              <ShieldCheck
                size={18}
                className="text-[#C8922A] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="font-inter text-xs text-[#FAF6EE]/60 leading-relaxed">
                Every operator is personally vetted for safety, reliability, and service excellence. No middleman markup surprises.
              </p>
            </div>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homepageServices.map((service) => {
            const Icon = iconMap[service.icon] ?? Compass;
            const img = serviceImages[service.id];
            return (
              <div
                key={service.id}
                className="bg-[#132338] rounded-xl overflow-hidden border border-[#0B1B2B] hover:border-[#C8922A]/60 transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  {img && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#132338] via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 p-2 bg-[#0B1B2B]/90 text-[#C8922A] rounded-md border border-[#C8922A]/30">
                        <Icon size={16} />
                      </span>
                    </div>
                  )}
                  <div className="p-6 flex flex-col gap-2.5">
                    <h3 className="font-dm font-semibold text-[#FAF6EE] text-lg group-hover:text-[#D4A84B] transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-inter text-xs sm:text-sm text-[#FAF6EE]/60 leading-relaxed">
                      {service.body}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={('pageHref' in service && service.pageHref) ? service.pageHref : service.ctaHref}
                    className="inline-flex items-center gap-1.5 font-dm text-xs font-semibold text-[#C8922A] group-hover:text-[#FAF6EE] transition-colors"
                  >
                    <span>View details &amp; itinerary</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all experiences link */}
        <div className="mt-12 text-center">
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#132338] text-[#FAF6EE] border border-[#C8922A]/40 rounded font-dm text-sm font-semibold hover:bg-[#1f3554] transition-colors"
          >
            <span>Explore All Safaris, Adrenaline &amp; Cultural Tours</span>
            <ArrowRight size={15} className="text-[#C8922A]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
