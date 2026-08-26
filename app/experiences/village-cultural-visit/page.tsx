import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Users,
  Heart,
  Sparkles,
  ShieldCheck,
  Building,
} from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import EnquiryForm from '@/components/forms/EnquiryForm';

export const metadata: Metadata = {
  title: 'Village & Cultural Visit | Victoria Falls, Zimbabwe | Mzilikazi Guest Lodge',
  description:
    'Experience authentic Zimbabwean culture, rural village life, craft traditions, and community heritage on a respectful guided cultural visit in Victoria Falls.',
  keywords: [
    'Victoria Falls village tour',
    'cultural tour Victoria Falls Zimbabwe',
    'rural village visit Victoria Falls',
    'Zimbabwe cultural heritage experience',
    'community tourism Victoria Falls',
  ],
};

const culturalPillars = [
  {
    icon: Building,
    title: 'Traditional Homestead Architecture',
    desc: 'Walk through traditional rural family homesteads. Learn about traditional building techniques, pole-and-dagga huts, thatch roofing, grain stores, and the layout of family compounds.',
  },
  {
    icon: Users,
    title: 'Warm Community Conversations',
    desc: 'Meet local village elders, headmen, and families. Engage in authentic, unhurried conversations about daily life, agriculture, cattle rearing, and regional traditions.',
  },
  {
    icon: Sparkles,
    title: 'Artisans, Weaving & Crafts',
    desc: 'Watch skilled local artisans weave ilala palm baskets, carve local teak and soapstone, and learn the symbolism behind indigenous Zimbabwean craft patterns.',
  },
  {
    icon: Heart,
    title: 'Direct Community Benefit',
    desc: 'Your visit contributes directly and transparently to local community development, village water projects, and village schooling initiatives.',
  },
];

export default function VillageCulturalVisitPage() {
  return (
    <div className="pt-20 bg-[#FAF6EE] min-h-screen">
      {/* Hero */}
      <section className="bg-[#0B1B2B] py-20 lg:py-28 relative overflow-hidden text-[#FAF6EE]">
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
            Signature Cultural Heritage
          </SectionEyebrow>
          <OchreLine className="mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mb-6">
            Victoria Falls is not only something to see.{' '}
            <em className="italic font-normal text-[#D4A84B]">
              It is somewhere people live.
            </em>
          </h1>
          <p className="font-inter text-[#FAF6EE]/75 text-lg max-w-2xl leading-relaxed mb-8">
            Step beyond the tourist perimeter to experience the heart of Zimbabwe. An authentic, respectful guided visit to a local rural village that connects you with traditions, crafts, and genuine hospitality.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#village-enquiry"
              className="px-8 py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
            >
              Arrange a Cultural Village Visit
            </a>
            <span className="text-xs font-dm text-[#FAF6EE]/60 px-4 py-2 bg-[#132338] rounded border border-[#0B1B2B]">
              Duration: 2.5 to 3 Hours (Morning or Afternoon)
            </span>
          </div>
        </div>
      </section>

      {/* Hero Visual */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-20">
        <div className="relative aspect-[16/8] sm:aspect-[21/9] rounded-lg overflow-hidden shadow-2xl border border-[#E2D9C8]">
          <Image
            src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600&q=85"
            alt="Warm Zimbabwean craft market and artisan weaving"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between text-[#FAF6EE] gap-2">
            <div>
              <p className="font-playfair text-xl font-bold">Authentic Cultural Immersion</p>
              <p className="font-inter text-xs text-[#FAF6EE]/80">Respectful, guided community tourism supporting local rural families</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C8922A] text-[#0B1B2B] font-dm text-xs font-semibold rounded">
              <ShieldCheck size={14} /> Vetted Local Community Partner
            </span>
          </div>
        </div>
      </div>

      {/* The 4 Destination Pillars */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionEyebrow className="mb-4">Destination Context</SectionEyebrow>
            <OchreLine className="mx-auto mb-6" />
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#0B1B2B]">
              The Four Pillars of Victoria Falls
            </h2>
            <p className="font-inter text-[#4A5568] text-base mt-4 leading-relaxed">
              Most itineraries cover Nature, Wildlife, and Adventure. Adding the Cultural pillar provides a truly complete, unforgettable journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', name: 'NATURE', desc: 'Victoria Falls & Batoka Gorge geology' },
              { num: '02', name: 'WILDLIFE', desc: 'Chobe & Zambezi river safaris and game drives' },
              { num: '03', name: 'ADVENTURE', desc: 'Rafting, helicopter flights & bridge bungee' },
              { num: '04', name: 'PEOPLE', desc: 'Rural village visits, traditions & community life', active: true },
            ].map((p) => (
              <div
                key={p.num}
                className={`p-6 rounded-xl border flex flex-col justify-between ${
                  p.active
                    ? 'bg-[#0B1B2B] text-[#FAF6EE] border-[#C8922A] shadow-lg ring-1 ring-[#C8922A]'
                    : 'bg-white text-[#0B1B2B] border-[#E2D9C8]'
                }`}
              >
                <span
                  className={`font-playfair text-3xl font-bold ${
                    p.active ? 'text-[#C8922A]' : 'text-[#4A5568]/30'
                  }`}
                >
                  {p.num}
                </span>
                <div className="mt-4">
                  <h3 className={`font-dm font-bold text-sm tracking-wider uppercase mb-1 ${p.active ? 'text-[#C8922A]' : 'text-[#0B1B2B]'}`}>
                    {p.name}
                  </h3>
                  <p className={`font-inter text-xs leading-relaxed ${p.active ? 'text-[#FAF6EE]/80' : 'text-[#4A5568]'}`}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Experience Details */}
      <section className="bg-[#F0E8D6] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <SectionEyebrow className="mb-4">What You Will Experience</SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#0B1B2B]">
              Real traditions, honest storytelling, and genuine warmth.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {culturalPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white border border-[#E2D9C8] rounded-xl p-8 flex flex-col gap-3"
                >
                  <div className="p-2.5 bg-[#FAF6EE] rounded-lg text-[#C8922A] w-fit">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-dm font-bold text-[#0B1B2B] text-lg">
                    {pillar.title}
                  </h3>
                  <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="village-enquiry" className="bg-[#0B1B2B] py-20 text-[#FAF6EE]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionEyebrow theme="light" className="mb-4">Book Cultural Experience</SectionEyebrow>
            <OchreLine className="mx-auto mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#FAF6EE]">
              Add a Village &amp; Cultural Visit
            </h2>
            <p className="font-inter text-[#FAF6EE]/70 text-base mt-3">
              Suitable for couples, families with kids, and groups. Tell us your stay dates and we will coordinate your visit.
            </p>
          </div>

          <div className="bg-white text-[#0B1B2B] border border-[#E2D9C8] rounded-xl p-8 shadow-xl">
            <EnquiryForm defaultPreference="Village & Cultural Experience" />
          </div>
        </div>
      </section>
    </div>
  );
}
