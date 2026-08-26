import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Plane, Binoculars, Waves, ArrowDown, Wind,
  Footprints, Sunset, Users, ChefHat, ArrowRight, ShieldCheck, MapPin,
} from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { LOCAL_SERVICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Experiences & Activities | Victoria Falls',
  description:
    'Airport transfers, guided tours, white-water rafting, bungee jumping, helicopter flights, game drives and Zambezi sunset cruises — all arranged through Mzilikazi Apartments in Victoria Falls, Zimbabwe.',
};

const iconMap: Record<string, React.ElementType> = {
  Plane, Binoculars, Waves, ArrowDown, Wind,
  Footprints, Sunset, Users, ChefHat,
};

// Segment-to-service mapping: for each guest type, surface the most relevant services
const segmentRecommendations = [
  {
    segment: 'Couples',
    headline: "You came for something special. Make sure you get it.",
    description:
      "The Falls together at sunrise. A helicopter flight over the gorge. A sundowner cruise as the hippos surface. We know what makes a trip feel like more than just a trip — and we will help you put those moments together.",
    serviceIds: ['helicopter-flights', 'zambezi-sunset-cruise', 'private-chef', 'guided-tours'],
    icon: '♥',
  },
  {
    segment: 'Families',
    headline: "Give the kids something they will remember for the rest of their lives.",
    description:
      "Wildlife that fills the windscreen. The spray of the largest waterfall on earth. A river with elephants at the bank. The Falls region is one of the rare places where children and adults are genuinely equally amazed — and we will help you find activities that work for every age.",
    serviceIds: ['game-drives', 'guided-tours', 'private-chef', 'airport-transfers'],
    icon: '⬡',
  },
  {
    segment: 'Adventure Seekers',
    headline: "You did not come all this way to watch from the edge.",
    description:
      "The Zambezi is one of the world's great white-water rivers. The Victoria Falls Bridge jump is 111 metres. The gorge swings, the zip lines, the rapids — this is one of the highest concentrations of serious adventure in Africa. We connect you with the operators who run these safely and brilliantly.",
    serviceIds: ['whitewater-rafting', 'bungee-jumping', 'helicopter-flights'],
    icon: '▲',
  },
  {
    segment: 'Groups',
    headline: "A trip this big deserves proper planning. We handle the logistics.",
    description:
      "Airport pickups that account for everyone. Activities that work for different ages and risk tolerances. Experiences that give the group something to talk about at dinner. Let us take the coordination weight off whoever drew the short straw as trip organiser.",
    serviceIds: ['airport-transfers', 'game-drives', 'zambezi-sunset-cruise', 'cultural-experiences'],
    icon: '◈',
  },
];

export default function ExperiencesPage() {
  return (
    <div className="pt-20 bg-[#FAF6EE] min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-[#0B1B2B] py-20 lg:py-28 relative overflow-hidden">
        {/* Subtle decorative radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(200,146,42,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionEyebrow theme="light" className="mb-4">
            Experiences &amp; Services
          </SectionEyebrow>
          <OchreLine className="mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6EE] leading-tight max-w-3xl mb-5">
            Everything around the Falls.{' '}
            <em className="italic font-normal text-[#D4A84B]">
              All in one place.
            </em>
          </h1>
          <p className="font-inter text-[#FAF6EE]/60 text-lg max-w-2xl leading-relaxed mb-6">
            We are not a tour operator. But we know Victoria Falls, we know the
            operators worth trusting, and we will help you put together the kind
            of trip that actually delivers — from the moment your flight lands to
            the last sunset on the Zambezi.
          </p>
          {/* Trust signal */}
          <div className="inline-flex items-start gap-3 p-4 bg-[#132338] rounded-lg border border-[#0B1B2B] max-w-xl">
            <ShieldCheck
              size={16}
              className="text-[#C8922A] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="font-inter text-xs text-[#FAF6EE]/50 leading-relaxed">
              Every operator and service we recommend has been personally vetted
              by our team. We will not send our guests to someone we do not trust.
              {/* [PLACEHOLDER — confirm vetting criteria and operator relationships with client] */}
            </p>
          </div>
        </div>
      </section>

      {/* ── Hero image slot ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-20">
        <ImagePlaceholder
          ariaLabel="Victoria Falls activities and experiences [PLACEHOLDER — confirm with client]"
          aspectRatio="16/9"
          className="w-full rounded-lg shadow-xl"
          data-placeholder="experiences_hero_image"
        />
      </div>

      {/* ── By guest segment ── */}
      <section className="py-16 lg:py-20" aria-label="Experiences by guest type">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <SectionEyebrow className="mb-4">Plan Around You</SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#0B1B2B] leading-tight">
              The right experience depends on who you are.
            </h2>
            <p className="font-inter text-[#4A5568] text-base mt-4 leading-relaxed">
              A couple on their anniversary needs a different trip to a family
              with three children or a group after the biggest adventure of their
              lives. Here is how we think about it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {segmentRecommendations.map((seg) => {
              const segServices = LOCAL_SERVICES.filter((s) =>
                seg.serviceIds.includes(s.id)
              );
              return (
                <div
                  key={seg.segment}
                  className="bg-white border border-[#E2D9C8] rounded-lg p-8 flex flex-col gap-5"
                >
                  {/* Segment header */}
                  <div>
                    <span className="font-dm text-xs font-semibold uppercase tracking-widest text-[#C8922A] block mb-2">
                      {seg.segment}
                    </span>
                    <h3 className="font-playfair text-xl font-bold text-[#0B1B2B] leading-snug mb-3">
                      {seg.headline}
                    </h3>
                    <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
                      {seg.description}
                    </p>
                  </div>

                  {/* Recommended services for this segment */}
                  <div className="pt-4 border-t border-[#E2D9C8]">
                    <p className="font-dm text-xs font-semibold uppercase tracking-widest text-[#4A5568] mb-3">
                      We recommend for {seg.segment.toLowerCase()}
                    </p>
                    <ul className="space-y-2">
                      {segServices.map((s) => {
                        const Icon = iconMap[s.icon] ?? ShieldCheck;
                        return (
                          <li key={s.id} className="flex items-center gap-3">
                            <Icon
                              size={14}
                              className="text-[#C8922A] shrink-0"
                              aria-hidden="true"
                            />
                            <span className="font-inter text-sm text-[#0B1B2B]">
                              {s.title}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <Link
                    href={`/contact?type=${seg.segment.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 font-dm text-sm font-semibold text-[#C8922A] hover:text-[#0B1B2B] transition-colors mt-auto pt-2"
                  >
                    Plan a {seg.segment.toLowerCase()} trip
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Full service directory ── */}
      <section className="bg-[#0B1B2B] py-20 lg:py-28" aria-label="All activities and services">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <SectionEyebrow theme="light" className="mb-4">
              All Services
            </SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#FAF6EE] leading-tight">
              Everything we can help you arrange.
            </h2>
            <p className="font-inter text-[#FAF6EE]/60 text-base mt-4 leading-relaxed">
              From arrival to final evening. Each one connected through operators
              we have personally vetted.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LOCAL_SERVICES.map((service) => {
              const Icon = iconMap[service.icon] ?? ShieldCheck;
              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="bg-[#132338] rounded-lg border border-[#0B1B2B] hover:border-[#C8922A]/30 transition-colors overflow-hidden"
                  aria-label={service.title}
                >
                  {/* Image slot */}
                  <ImagePlaceholder
                    ariaLabel={`${service.title} — Victoria Falls [PLACEHOLDER — add real photo]`}
                    aspectRatio="16/9"
                    className="w-full"
                    data-placeholder={`service_${service.id}_image`}
                  />

                  <div className="p-6 flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="p-2 bg-[#0B1B2B] rounded border border-[#C8922A]/20 w-fit">
                            <Icon
                              size={16}
                              className="text-[#C8922A]"
                              aria-hidden="true"
                            />
                          </div>
                          <span className="font-dm text-[10px] font-semibold uppercase tracking-widest text-[#FAF6EE]/30">
                            {service.category}
                          </span>
                        </div>
                        <h3 className="font-dm font-semibold text-[#FAF6EE] text-lg">
                          {service.title}
                        </h3>
                        <p className="font-inter text-xs text-[#C8922A] italic mt-1">
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Body — emotionally written for the target market */}
                    <p className="font-inter text-sm text-[#FAF6EE]/60 leading-relaxed">
                      {service.body}
                    </p>

                    {/* Benefit pull quote */}
                    <blockquote className="border-l-2 border-[#C8922A]/40 pl-4">
                      <p className="font-playfair text-sm italic text-[#FAF6EE]/40 leading-snug">
                        {service.benefit}
                      </p>
                    </blockquote>

                    {/* Operator trust signal */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[#0B1B2B]">
                      <ShieldCheck
                        size={13}
                        className="text-[#C8922A]/70 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="font-inter text-[11px] text-[#FAF6EE]/50 leading-tight">
                        Vetted local Zimbabwean operator &amp; guide
                      </span>
                    </div>

                    {/* CTA */}
                    <Link
                      href={service.ctaHref}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors mt-1 w-full sm:w-auto"
                    >
                      {service.ctaLabel}
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-[#F0E8D6] py-16 lg:py-20" aria-label="How the service works">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionEyebrow className="mb-4">How It Works</SectionEyebrow>
            <OchreLine className="mx-auto mb-6" />
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#0B1B2B]">
              Less research. More trip.
            </h2>
            <p className="font-inter text-[#4A5568] text-base mt-4 max-w-xl mx-auto leading-relaxed">
              Most guests spend hours online trying to figure out which operators
              are legitimate. We have already done that work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Tell us what you want',
                body: 'Mention activities and services when you make your stay enquiry — or message us directly. Let us know who is coming and what kind of trip you are after.',
              },
              {
                step: '02',
                title: 'We connect you',
                body: "We match you with the right operator for your group and your goals. We'll give you all the details: what to expect, what it costs, and what to bring.",
              },
              {
                step: '03',
                title: 'You just show up',
                body: 'Your transfers, tours and activities are sorted before you arrive. You land in Victoria Falls knowing the trip is already planned.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white border border-[#E2D9C8] rounded-lg p-6">
                <span className="font-playfair text-3xl font-light text-[#C8922A]/40 block mb-3">
                  {item.step}
                </span>
                <h3 className="font-dm font-semibold text-[#0B1B2B] text-base mb-2">
                  {item.title}
                </h3>
                <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location context ── */}
      <section className="bg-[#FAF6EE] py-16" aria-label="Victoria Falls location context">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <SectionEyebrow className="mb-4">The Base</SectionEyebrow>
              <OchreLine className="mb-6" />
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#0B1B2B] leading-tight mb-4">
                A comfortable place to return to.
              </h2>
              <p className="font-inter text-[#4A5568] text-base leading-relaxed mb-4">
                Every activity we recommend is accessible from Mzilikazi. You go
                out, you have the experience, and you come back to an apartment
                with a kitchen, a comfortable bed and space to process the day.
              </p>
              <p className="font-inter text-[#4A5568] text-base leading-relaxed mb-6">
                That combination — the extraordinary experiences of Victoria Falls,
                supported by a dependable and comfortable base — is exactly what
                we are here for.
              </p>
              <div className="flex items-center gap-2 text-sm font-inter text-[#4A5568]">
                <MapPin size={14} className="text-[#C8922A] shrink-0" aria-hidden="true" />
                <span>
                  Victoria Falls, Zimbabwe
                  {/* [PLACEHOLDER — add verified distance to Falls, town and airport when confirmed] */}
                </span>
              </div>
            </div>
            <ImagePlaceholder
              ariaLabel="Mzilikazi Apartments — your base for exploring Victoria Falls [PLACEHOLDER — confirm with client]"
              aspectRatio="4/3"
              className="w-full rounded-lg"
              data-placeholder="experiences_property_image"
            />
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-[#0B1B2B] py-16" aria-label="Book your stay">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#FAF6EE] mb-4 leading-tight">
            Ready to plan your Victoria Falls trip?
          </h2>
          <p className="font-inter text-[#FAF6EE]/60 text-sm mb-8 leading-relaxed">
            Book your stay and tell us what activities you are interested in.
            We will take it from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
            >
              Book Your Stay
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href="/apartments"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-[#FAF6EE]/20 text-[#FAF6EE]/70 font-dm font-semibold text-sm rounded hover:border-[#C8922A] hover:text-[#C8922A] transition-colors"
            >
              View the Apartments
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
