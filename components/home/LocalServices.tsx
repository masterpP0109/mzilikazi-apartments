import Link from 'next/link';
import Image from 'next/image';
import {
  Plane, Binoculars, Waves, ArrowDown, Wind,
  Footprints, Sunset, Users, ChefHat, ArrowRight, ShieldCheck,
} from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import { LOCAL_SERVICES } from '@/lib/constants';

// Icon map — mirrors the icon string keys in LOCAL_SERVICES data
const iconMap: Record<string, React.ElementType> = {
  Plane, Binoculars, Waves, ArrowDown, Wind,
  Footprints, Sunset, Users, ChefHat,
};

// Matching images per service id
const serviceImages: Record<string, { src: string; alt: string }> = {
  'airport-transfers':  { src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=75', alt: 'Airport runway at sunset' },
  'whitewater-rafting': { src: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=600&q=75', alt: 'White-water rafting through a gorge' },
  'bungee-jumping':     { src: 'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=600&q=75', alt: 'Bungee jump off a high bridge over a gorge' },
  'guided-tours':       { src: 'https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=600&q=75', alt: 'Victoria Falls viewed from a guided tour path' },
  'game-drives':        { src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=75', alt: 'Elephants walking at golden hour on a game drive' },
  'private-chef':       { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=75', alt: 'Chef preparing a meal in a modern kitchen' },
  'helicopter-flights': { src: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=600&q=75', alt: 'Helicopter flying over landscape' },
  'zambezi-sunset-cruise': { src: 'https://images.unsplash.com/photo-1504704911898-68304a7d2807?w=600&q=75', alt: 'Sunset cruise on a calm African river' },
  'cultural-experiences': { src: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=75', alt: 'Vibrant African craft market' },
};

// Show only a curated subset on the homepage — the full list lives on /experiences
const HOMEPAGE_SERVICE_IDS = [
  'airport-transfers',
  'whitewater-rafting',
  'bungee-jumping',
  'guided-tours',
  'game-drives',
  'private-chef',
];

const homepageServices = LOCAL_SERVICES.filter((s) =>
  HOMEPAGE_SERVICE_IDS.includes(s.id)
);

export default function LocalServices() {
  return (
    <section
      id="local-services"
      className="bg-[#0B1B2B] py-20 lg:py-28"
      aria-label="Activities and services in Victoria Falls"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-16 items-end">
          <div>
            <SectionEyebrow theme="light" className="mb-4">
              Activities &amp; Services
            </SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#FAF6EE] leading-tight">
              We know the destination.{' '}
              <em className="italic font-normal text-[#D4A84B]">
                Let us help you plan the trip.
              </em>
            </h2>
          </div>
          <div>
            <p className="font-inter text-[#FAF6EE]/60 text-base leading-relaxed">
              The Falls, the gorge, the Zambezi, the bush — there is a lot here to
              experience. Navigating it alone takes time. We connect you with
              operators we trust, so you spend less time researching and more time
              actually doing.
            </p>
            {/* Trust signal — honest framing */}
            <div className="mt-6 flex items-start gap-3 p-4 bg-[#132338] rounded-lg border border-[#0B1B2B]">
              <ShieldCheck
                size={18}
                className="text-[#C8922A] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="font-inter text-xs text-[#FAF6EE]/50 leading-relaxed">
                We only recommend operators we have vetted personally. These are not
                generic listings — they are people our team trusts with our guests.
                {/* [PLACEHOLDER — confirm vetting criteria / operator relationships with client] */}
              </p>
            </div>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {homepageServices.map((service) => {
            const Icon = iconMap[service.icon] ?? ShieldCheck;
            return (
              <div
                key={service.id}
                className="bg-[#132338] rounded-lg overflow-hidden border border-[#0B1B2B] hover:border-[#C8922A]/40 transition-colors flex flex-col group"
              >
                {/* Image */}
                {serviceImages[service.id] && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={serviceImages[service.id].src}
                      alt={serviceImages[service.id].alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#132338] via-[#132338]/40 to-transparent" />
                  </div>
                )}
                <div className="p-6 flex flex-col gap-4 flex-1">
                {/* Icon + category */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-[#0B1B2B] rounded-lg border border-[#C8922A]/20 w-fit">
                    <Icon
                      size={18}
                      className="text-[#C8922A]"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="font-dm text-[10px] font-semibold uppercase tracking-widest text-[#FAF6EE]/30">
                    {service.category}
                  </span>
                </div>

                {/* Title + tagline */}
                <div>
                  <h3 className="font-dm font-semibold text-[#FAF6EE] text-base mb-1">
                    {service.title}
                  </h3>
                  <p className="font-inter text-xs text-[#C8922A] italic">
                    {service.tagline}
                  </p>
                </div>

                {/* Body copy — emotionally targeted */}
                <p className="font-inter text-xs text-[#FAF6EE]/50 leading-relaxed flex-1">
                  {service.body}
                </p>

                {/* Benefit pull-quote */}
                <p className="font-playfair text-sm italic text-[#FAF6EE]/40 border-l-2 border-[#C8922A]/30 pl-3 leading-snug">
                  {service.benefit}
                </p>

                {/* CTA */}
                <Link
                  href={service.ctaHref}
                  className="inline-flex items-center gap-1.5 font-dm text-xs font-semibold text-[#C8922A] hover:text-[#D4A84B] transition-colors mt-auto pt-2 group-hover:gap-2"
                >
                  {service.ctaLabel}
                  <ArrowRight size={12} aria-hidden="true" />
                </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* See all experiences link */}
        <div className="mt-10 text-center">
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-[#FAF6EE]/20 text-[#FAF6EE]/70 font-dm font-semibold text-sm rounded hover:border-[#C8922A] hover:text-[#C8922A] transition-colors"
          >
            View All Experiences &amp; Services
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
