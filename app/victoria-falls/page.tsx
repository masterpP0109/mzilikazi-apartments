import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Plane, Binoculars, Waves, ArrowDown, Wind, Footprints, Sunset, Users, ChefHat } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { LOCAL_SERVICES } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  Plane, Binoculars, Waves, ArrowDown, Wind, Footprints, Sunset, Users, ChefHat,
};

// Highlight only the most compelling adventure/experience services on this page
const FEATURED_SERVICE_IDS = [
  'airport-transfers',
  'guided-tours',
  'whitewater-rafting',
  'bungee-jumping',
  'helicopter-flights',
  'game-drives',
];
const featuredServices = LOCAL_SERVICES.filter((s) => FEATURED_SERVICE_IDS.includes(s.id));

export const metadata: Metadata = {
  title: 'Victoria Falls',
  description:
    'Victoria Falls activities, experiences and travel information. Airport transfers, guided tours, white-water rafting, bungee jumping, game drives and more — arranged through Mzilikazi Apartments, Zimbabwe.',
};

const experiences = [
  {
    title: 'The Falls Themselves',
    category: 'Sightseeing',
    description:
      'Victoria Falls — Mosi-oa-Tunya, "The Smoke That Thunders" — is one of the Seven Natural Wonders of the World and the largest curtain of falling water on Earth. Plan to visit multiple times during your stay, as the experience varies dramatically with the light and season.',
    imageLabel: 'Victoria Falls — the main waterfall [PLACEHOLDER — confirm with client]',
  },
  {
    title: 'Adventure Activities',
    category: 'Adventure',
    description:
      "Bungee jumping off the bridge, white-water rafting on the Zambezi, zip-lining, gorge swinging and helicopter flights are all available. Victoria Falls is genuinely one of the world's premier adventure destinations.",
    imageLabel: 'Adventure activity at Victoria Falls [PLACEHOLDER — confirm with client]',
  },
  {
    title: 'Wildlife & Game Drives',
    category: 'Wildlife',
    description:
      'Chobe National Park in Botswana is a day trip away. Hwange National Park and Zambezi National Park are accessible for game drives, and river safaris on the Zambezi offer excellent wildlife viewing.',
    imageLabel: 'Wildlife near Victoria Falls [PLACEHOLDER — confirm with client]',
  },
  {
    title: 'Cultural Experiences',
    category: 'Culture',
    description:
      'The local craft market, Livingstone Island, Boma dinner experiences and village visits offer a richer view of the region. Ask our team for recommendations.',
    imageLabel: 'Cultural experience near Victoria Falls [PLACEHOLDER — confirm with client]',
  },
];

const practicalInfo = [
  { label: 'Best time to visit', value: 'February–May for peak flow. June–August for drier gorge access. [PLACEHOLDER — confirm seasonal advice with local expert]' },
  { label: 'Distance from Harare', value: '[PLACEHOLDER — confirm with client or research]' },
  { label: 'Nearest airport', value: 'Victoria Falls International Airport (VFA) [PLACEHOLDER — confirm transfer time]' },
  { label: 'Currency', value: 'USD widely accepted in Victoria Falls, Zimbabwe.' },
  { label: 'Visa', value: 'Most nationalities require a visa. KAZA Univisa available for Zambia/Zimbabwe combo. Check current requirements before travel.' },
];

export default function VictoriaFallsPage() {
  return (
    <div className="pt-20 bg-[#FAF6EE] min-h-screen">
      {/* Header */}
      <section className="bg-[#0B1B2B] py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionEyebrow theme="light" className="mb-4">The Destination</SectionEyebrow>
          <OchreLine className="mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6EE] leading-tight max-w-3xl mb-4">
            Victoria Falls is the experience. Mzilikazi is your base for it.
          </h1>
          <p className="font-inter text-[#FAF6EE]/70 text-lg max-w-2xl">
            One of the greatest natural wonders in the world. Here is what awaits you — and how to make the most of every day.
          </p>
        </div>
      </section>

      {/* Hero image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <ImagePlaceholder
          ariaLabel="Victoria Falls panorama [PLACEHOLDER — confirm with client]"
          aspectRatio="16/9"
          className="w-full rounded-lg shadow-xl"
          data-placeholder="victoria_falls_hero_image"
        />
      </div>

      {/* Experiences */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <SectionEyebrow className="mb-4">What To Do</SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#0B1B2B]">
              More than a waterfall.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((exp) => (
              <div key={exp.title} className="bg-white rounded-lg overflow-hidden border border-[#E2D9C8]">
                <ImagePlaceholder
                  ariaLabel={exp.imageLabel}
                  aspectRatio="16/9"
                  className="w-full"
                  data-placeholder={`experience_${exp.title.toLowerCase().replace(/\s+/g, '_')}`}
                />
                <div className="p-6">
                  <span className="font-dm text-xs font-semibold uppercase tracking-wider text-[#C8922A] block mb-2">
                    {exp.category}
                  </span>
                  <h3 className="font-dm font-semibold text-[#0B1B2B] text-lg mb-2">{exp.title}</h3>
                  <p className="font-inter text-sm text-[#4A5568] leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical info */}
      <section className="bg-[#0B1B2B] py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <SectionEyebrow theme="light" className="mb-4">Practical Information</SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#FAF6EE]">
              Before you arrive.
            </h2>
          </div>
          <dl className="space-y-5">
            {practicalInfo.map((item) => (
              <div key={item.label} className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-5 border-b border-[#132338] last:border-0">
                <dt className="font-dm font-semibold text-[#C8922A] text-sm">{item.label}</dt>
                <dd className="font-inter text-sm text-[#FAF6EE]/60 sm:col-span-2 leading-relaxed">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Services we arrange ── */}
      <section className="bg-[#FAF6EE] py-20 lg:py-24" aria-label="Activities and services we arrange">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-14 items-end">
            <div>
              <SectionEyebrow className="mb-4">What We Arrange</SectionEyebrow>
              <OchreLine className="mb-6" />
              <h2 className="font-playfair text-3xl font-bold text-[#0B1B2B] leading-tight">
                From the moment you land.
              </h2>
            </div>
            <div>
              <p className="font-inter text-[#4A5568] text-base leading-relaxed mb-4">
                We are not a tour operator. But we are embedded in Victoria Falls, we
                know the people who run these experiences properly, and we will help you
                plan a trip that actually delivers — from the airport pickup to the last
                activity on your final evening.
              </p>
              <div className="flex items-start gap-3 p-4 bg-[#FAF6EE] rounded-lg border border-[#E2D9C8]">
                <ShieldCheck size={16} className="text-[#C8922A] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="font-inter text-xs text-[#4A5568] leading-relaxed">
                  Every operator below has been personally vetted by our team.
                  We will not recommend someone we do not trust with our guests.
                  {/* [PLACEHOLDER — confirm vetting relationship with client] */}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredServices.map((service) => {
              const Icon = iconMap[service.icon] ?? ShieldCheck;
              return (
                <div
                  key={service.id}
                  className="bg-white border border-[#E2D9C8] rounded-lg p-6 flex flex-col gap-4 hover:border-[#C8922A]/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-[#FAF6EE] rounded-lg border border-[#E2D9C8] w-fit">
                      <Icon size={18} className="text-[#C8922A]" aria-hidden="true" />
                    </div>
                    <span className="font-dm text-[10px] font-semibold uppercase tracking-widest text-[#4A5568]/40">
                      {service.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-dm font-semibold text-[#0B1B2B] text-base mb-1">
                      {service.title}
                    </h3>
                    <p className="font-inter text-xs text-[#C8922A] italic mb-3">
                      {service.tagline}
                    </p>
                    <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
                      {service.body}
                    </p>
                  </div>
                  <blockquote className="border-l-2 border-[#C8922A]/30 pl-3 mt-auto">
                    <p className="font-playfair text-xs italic text-[#4A5568]/60 leading-snug">
                      {service.benefit}
                    </p>
                  </blockquote>
                  <Link
                    href={service.ctaHref}
                    className="inline-flex items-center gap-1.5 font-dm text-xs font-semibold text-[#C8922A] hover:text-[#0B1B2B] transition-colors"
                  >
                    {service.ctaLabel} <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/experiences"
              className="inline-flex items-center gap-2 font-dm text-sm font-semibold text-[#C8922A] hover:text-[#0B1B2B] transition-colors"
            >
              See all experiences &amp; services <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0B1B2B] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-2xl font-bold text-[#FAF6EE] mb-4">
            Ready to plan your Victoria Falls visit?
          </h2>
          <p className="font-inter text-[#FAF6EE]/60 text-sm mb-6 leading-relaxed">
            Book your stay and tell us what you want to do while you are here.
            We will take it from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
            >
              Book Your Stay <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href="/apartments"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-[#FAF6EE]/20 text-[#FAF6EE]/70 font-dm font-semibold text-sm rounded hover:border-[#C8922A] hover:text-[#C8922A] transition-colors"
            >
              View Apartments
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
