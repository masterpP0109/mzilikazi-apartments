import Link from 'next/link';
import Image from 'next/image';
import { Heart, Users, Mountain, Briefcase, ArrowRight } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';

const segments = [
  {
    Icon: Heart,
    label: 'Couples & Honeymooners',
    headline: 'The trip should feel intimate, relaxed, and seamless.',
    description:
      'A quiet, private suite for slow mornings together. Space to unwind after a helicopter flight over the gorge or a candlelit dinner on the Zambezi River. Where you stay shapes how the whole journey feels.',
    services: ['Helicopter flights', 'Zambezi sunset cruise', 'Private in-suite chef', 'Guided Falls tour'],
    ctaLabel: 'Plan a couples itinerary',
    ctaHref: '/experiences',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    alt: 'Couple watching a sunset over water',
  },
  {
    Icon: Users,
    label: 'Families & Small Groups',
    headline: 'Give everyone space — without paying hotel room multipliers.',
    description:
      'Spacious 2-bedroom suites with full kitchens, dining space, and private lounges. Prepare meals on your kids’ schedule, keep cold drinks in the fridge, and let our concierge arrange child-friendly safaris.',
    services: ['Family 2-Bedroom Suites', 'Chobe River Safari', 'Village Cultural Visit', 'Private Chef Hire'],
    ctaLabel: 'Explore family accommodation',
    ctaHref: '/family-group-accommodation-victoria-falls',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    alt: 'Family on an African adventure together',
  },
  {
    Icon: Briefcase,
    label: 'Corporate & Conference Delegates',
    headline: 'Certainty, speed, and clean corporate administration.',
    description:
      'Attending a summit or regional conference in Victoria Falls? Enjoy quiet workspaces, high-speed Wi-Fi, solar backup, official VAT tax invoicing, and coordinated airport and venue transfers.',
    services: ['Official Corporate Invoices', 'Reliable Wi-Fi & Solar Backup', 'Venue Shuttles', 'Group Room Blocks'],
    ctaLabel: 'View corporate stay options',
    ctaHref: '/corporate-stays-victoria-falls',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    alt: 'Executive workspace and business travel amenities',
  },
  {
    Icon: Mountain,
    label: 'Safari & Adventure Seekers',
    headline: 'You did not come all this way for a view from the fence.',
    description:
      'From cross-border Chobe National Park day safaris and Zambezi white-water rafting to gorge swings and micarlight flights. We connect you with top vetted operators and handle all transport.',
    services: ['Chobe Day Trip (Botswana)', 'White-water rafting', 'Helicopter flights', 'Bungee & Gorge swing'],
    ctaLabel: 'Discover adventure packages',
    ctaHref: '/experiences/chobe-day-trip',
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80',
    alt: 'Adventurers exploring nature and waterfalls',
  },
];

export default function WhoIsItFor() {
  return (
    <section
      id="who-is-it-for"
      className="bg-[#FAF6EE] py-20 lg:py-28"
      aria-label="Who is Mzilikazi Guest Lodge for"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <SectionEyebrow className="mb-4">Who It&apos;s For</SectionEyebrow>
          <OchreLine className="mx-auto mb-6" />
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#0B1B2B] leading-tight">
            Built around how real guests travel.
          </h2>
          <p className="font-inter text-[#4A5568] text-base mt-4 leading-relaxed">
            We are not trying to be a generic hotel for everyone. These are the guests who find that Mzilikazi is their ideal Victoria Falls home base.
          </p>
        </div>

        {/* Cards — 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {segments.map(({ Icon, label, headline, description, services, ctaLabel, ctaHref, image, alt }) => (
            <div
              key={label}
              className="bg-white border border-[#E2D9C8] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#C8922A] transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B1B2B]/90 text-[#D4A84B] font-dm text-xs font-semibold rounded backdrop-blur-sm border border-[#C8922A]/30">
                    <Icon size={14} className="text-[#C8922A]" />
                    {label}
                  </span>
                </div>

                <div className="p-7 flex flex-col gap-4">
                  <h3 className="font-playfair text-xl font-bold text-[#0B1B2B] leading-snug">
                    {headline}
                  </h3>
                  <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
                    {description}
                  </p>

                  {/* Highlight tags */}
                  <div className="pt-2">
                    <p className="text-[11px] font-dm font-semibold text-[#0B1B2B] uppercase tracking-wider mb-2">
                      Key Highlights:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {services.map((service) => (
                        <span
                          key={service}
                          className="px-2.5 py-1 bg-[#FAF6EE] text-[#4A5568] text-xs font-inter rounded border border-[#E2D9C8]"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="px-7 pb-6 pt-2 border-t border-[#FAF6EE]">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 font-dm font-semibold text-sm text-[#C8922A] group-hover:text-[#0B1B2B] transition-colors"
                >
                  {ctaLabel} <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
