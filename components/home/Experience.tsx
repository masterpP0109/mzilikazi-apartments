import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';

// The four destination pillars — the emotional case for coming to Victoria Falls at all.
const tiles = [
  {
    title: 'Victoria Falls',
    description:
      'Mosi-oa-Tunya — The Smoke That Thunders. One of the Seven Natural Wonders of the World. The spray, the sound, the sheer scale of it. Something that has to be seen to be understood.',
    image: 'https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=800&q=80',
    alt: 'Victoria Falls waterfall mist and spray',
    category: 'Sightseeing',
    href: '/victoria-falls',
  },
  {
    title: 'Adventure on the Zambezi',
    description:
      "White-water rafting, bungee jumping off the bridge, gorge swings, helicopter flights. Victoria Falls is one of the world's best adventure destinations — and we can help you access all of it.",
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80',
    alt: 'White-water rafting on a fast river gorge',
    category: 'Adventure',
    href: '/experiences#whitewater-rafting',
  },
  {
    title: 'Wildlife & Safaris',
    description:
      'Chobe, Hwange and Zambezi National Park are all within reach. Game drives, river safaris and walking tours. The wildlife here is as much a reason to visit as the waterfall itself.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    alt: 'Elephants on an African safari at sunset',
    category: 'Wildlife',
    href: '/experiences#game-drives',
  },
  {
    title: 'The Town & Local Culture',
    description:
      "Victoria Falls town has craft markets, good restaurants, the Boma dinner experience and genuine Zimbabwean hospitality. There's more here than one waterfall — and we know what's worth your time.",
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80',
    alt: 'Colourful African craft market stalls',
    category: 'Culture',
    href: '/experiences#cultural-experiences',
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-[#FAF6EE] py-20 lg:py-28"
      aria-label="Victoria Falls destination and experiences"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — two-column editorial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-14 items-end">
          <div>
            <SectionEyebrow className="mb-4">The Destination</SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#0B1B2B] leading-tight">
              Victoria Falls is the experience.{' '}
              <em className="italic font-normal text-[#C8922A]">
                Mzilikazi is your base for it.
              </em>
            </h2>
          </div>
          <div>
            <p className="font-inter text-[#4A5568] text-base leading-relaxed">
              You are coming for one of the greatest natural wonders in the
              world. The destination does not need to be sold — if you are
              reading this, you already want to go. What we offer is a
              comfortable place to stay, and a team who knows how to help
              you get the most out of every day you are here.
            </p>
            <Link
              href="/experiences"
              className="inline-flex items-center gap-2 mt-5 font-dm text-sm font-semibold text-[#C8922A] hover:text-[#0B1B2B] transition-colors"
            >
              See all activities &amp; services
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className="bg-white rounded-lg overflow-hidden border border-[#E2D9C8] flex flex-col group hover:border-[#C8922A]/50 hover:shadow-md transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <span className="font-dm text-xs font-semibold uppercase tracking-wider text-[#C8922A] mb-2">
                  {tile.category}
                </span>
                <h3 className="font-dm font-semibold text-[#0B1B2B] text-base mb-2 group-hover:text-[#C8922A] transition-colors">
                  {tile.title}
                </h3>
                <p className="font-inter text-xs text-[#4A5568] leading-relaxed flex-1">
                  {tile.description}
                </p>
                <div className="mt-4 flex items-center gap-1 font-dm text-xs font-semibold text-[#C8922A]">
                  Learn more <ArrowRight size={11} aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust bridge — connects destination to the property */}
        <div className="mt-12 p-6 bg-[#0B1B2B] rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <ShieldCheck
            size={22}
            className="text-[#C8922A] shrink-0"
            aria-hidden="true"
          />
          <div className="flex-1">
            <p className="font-dm font-semibold text-[#FAF6EE] text-sm mb-1">
              We arrange more than just accommodation.
            </p>
            <p className="font-inter text-xs text-[#FAF6EE]/50 leading-relaxed">
              Airport transfers, guided Falls tours, rafting, bungee jumping,
              helicopter flights, game drives and sunset cruises — all through
              operators we have personally vetted.{' '}
              {/* [PLACEHOLDER — confirm which services are actively arranged vs recommended] */}
            </p>
          </div>
          <Link
            href="/experiences"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
          >
            Explore All <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
