import Link from 'next/link';
import Image from 'next/image';
import { Heart, Users, Mountain, Briefcase, ArrowRight } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';

const segments = [
  {
    Icon: Heart,
    label: 'Couples',
    headline: "The trip should feel like the trip.",
    description:
      "A proper kitchen for a slow morning together. A comfortable bed to come back to after a full day. Privacy when you need it, space when you want it. The Falls are extraordinary — where you stay shapes how the whole trip feels.",
    services: ['Helicopter flights', 'Zambezi sunset cruise', 'Private chef hire', 'Guided Falls tour'],
    ctaLabel: 'Plan a couples trip',
    ctaHref: '/experiences?type=couples',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    alt: 'Couple watching a sunset over water',
  },
  {
    Icon: Users,
    label: 'Families',
    headline: "Give everyone enough room — including patience.",
    description:
      "Separate rooms. A kitchen so you are not eating out three times a day. Space for the children to move around. And a team on hand to help you plan activities that work for every age in the group.",
    services: ['Airport transfers', 'Game drives', 'Private chef hire', 'Guided Falls tour'],
    ctaLabel: 'Plan a family trip',
    ctaHref: '/experiences?type=families',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    alt: 'Family on a safari game drive in Africa',
  },
  {
    Icon: Mountain,
    label: 'Adventure Seekers',
    headline: "You did not come all this way for a view from the fence.",
    description:
      "White-water rafting on the Zambezi. A bungee jump off the bridge at 111 metres. Gorge swings. Helicopter flights over the Falls. We connect you with the operators who run these safely.",
    services: ['White-water rafting', 'Bungee jumping', 'Helicopter flights'],
    ctaLabel: 'Plan an adventure trip',
    ctaHref: '/experiences?type=adventure',
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80',
    alt: 'Adventurers white-water rafting through a gorge',
  },
  {
    Icon: Briefcase,
    label: 'Work & Leisure Travellers',
    headline: "Dependable. Comfortable. Out of the way of nothing.",
    description:
      "Reliable Wi-Fi. A desk if you need one. A kitchen so you are not dependent on restaurant hours. And when the laptop closes, one of the world's great waterfalls is there waiting.",
    services: ['Airport transfers', 'Guided Falls tour', 'Zambezi sunset cruise'],
    ctaLabel: 'Enquire about your stay',
    ctaHref: '/contact',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    alt: 'Person working on a laptop in a comfortable room',
  },
];

export default function WhoIsItFor() {
  return (
    <section
      id="who-is-it-for"
      className="bg-[#FAF6EE] py-20 lg:py-28"
      aria-label="Who is Mzilikazi Apartments for"
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
            We are not trying to be the right choice for everyone. These are the
            guests who find that Mzilikazi works well for them.
          </p>
        </div>

        {/* Cards — 2-column grid for better copy space */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {segments.map(({ Icon, label, headline, description, services, ctaLabel, ctaHref, image, alt }) => (
            <div
              key={label}
              className="bg-white border border-[#E2D9C8] rounded-lg overflow-hidden flex flex-col hover:border-[#C8922A]/50 transition-colors group"
            >
              {/* Image */}
              <div className="relative aspect-[16/7] overflow-hidden">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-7 flex flex-col gap-5">
              {/* Icon + label */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#FAF6EE] rounded-lg w-fit border border-[#E2D9C8]">
                  <Icon size={20} className="text-[#C8922A]" aria-hidden="true" />
                </div>
                <h3 className="font-dm font-semibold text-[#0B1B2B] text-lg">
                  {label}
                </h3>
              </div>

              {/* Emotional headline */}
              <p className="font-playfair text-base font-medium italic text-[#0B1B2B] leading-snug">
                &ldquo;{headline}&rdquo;
              </p>

              {/* Body copy */}
              <p className="font-inter text-sm text-[#4A5568] leading-relaxed flex-1">
                {description}
              </p>

              {/* Services relevant to this segment */}
              <div className="pt-4 border-t border-[#E2D9C8]">
                <p className="font-dm text-[10px] font-semibold uppercase tracking-widest text-[#4A5568]/60 mb-2.5">
                  We can help arrange
                </p>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <span
                      key={s}
                      className="font-dm text-xs text-[#C8922A] bg-[#FAF6EE] border border-[#E2D9C8] rounded px-2.5 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-1.5 font-dm text-sm font-semibold text-[#C8922A] hover:text-[#0B1B2B] transition-colors"
              >
                {ctaLabel}
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
