import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  UtensilsCrossed,
  Home,
  Check,
  ShieldCheck,
  ArrowRight,
  Wifi,
  Car,
  Baby,
} from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Family & Group Self-Catering Accommodation | Victoria Falls, Zimbabwe',
  description:
    'Spacious 2-bedroom family self-catering suites and group apartments in Victoria Falls. Full kitchens, private lounges, secure parking, reliable Wi-Fi, and family-friendly safari planning.',
  keywords: [
    'family accommodation Victoria Falls',
    'group accommodation Victoria Falls',
    'self-catering family apartments Victoria Falls Zimbabwe',
    'Victoria Falls suites with kitchen',
    'large family lodge Victoria Falls',
  ],
};

const familyAdvantages = [
  {
    icon: Home,
    title: 'One Shared Home — Not Split Hotel Rooms',
    description:
      'Keep the whole family together in a dedicated 2-bedroom apartment with a private living room and dining area, rather than paying for multiple disconnected hotel rooms.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Full Kitchen & Flexible Meals',
    description:
      'Prepare breakfast on your kids’ schedule, keep fresh fruits and snacks in the fridge, or hire a private in-apartment chef for a celebratory family dinner.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe, Gated & Peaceful Compound',
    description:
      'Secure perimeter, private parking, and a peaceful garden atmosphere where children can safely relax after a busy day at the Falls.',
  },
  {
    icon: Wifi,
    title: 'High-Speed Wi-Fi & Solar Backup',
    description:
      'Streaming movies, staying connected with relatives, or planning the next day’s itinerary with seamless power and internet.',
  },
  {
    icon: Car,
    title: 'Family Airport & Safari Transfers',
    description:
      'We coordinate spacious vehicle pickups from Victoria Falls Airport (VFA) with child seats and seamless door-to-door safari transfers.',
  },
  {
    icon: Baby,
    title: 'Child Friendly on Request',
    description:
      'Baby cots, extra linen, flexible bedding arrangements, and child-safe tour recommendations provided by our local team.',
  },
];

const familyExperiences = [
  {
    title: 'Victoria Falls Guided Tour',
    tag: 'All Ages',
    desc: 'Paved paths and guided viewpoints safe for children, with educational stories of Mosi-oa-Tunya.',
    href: '/experiences/victoria-falls-tour',
  },
  {
    title: 'Chobe River Boat Safari',
    tag: 'Wildlife Highlight',
    desc: 'Gentle river boat cruising in Botswana with elephants and hippos coming right up to the water’s edge.',
    href: '/experiences/chobe-day-trip',
  },
  {
    title: 'Village & Cultural Visit',
    tag: 'Inspiring Culture',
    desc: 'A warm, interactive cultural encounter introducing children to traditional Zimbabwean village life and crafts.',
    href: '/experiences/village-cultural-visit',
  },
  {
    title: 'In-Apartment Private Chef Dinner',
    tag: 'Relaxing Evening',
    desc: 'A local chef cooks in your kitchen while the kids play, avoiding restaurant wait times.',
    href: '/contact?service=private-chef',
  },
];

export default function FamilyGroupAccommodationPage() {
  return (
    <div className="pt-20 bg-[#FAF6EE] min-h-screen">
      {/* Hero */}
      <section className="bg-[#0B1B2B] py-20 lg:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 75% 35%, rgba(200,146,42,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionEyebrow theme="light" className="mb-4">
            Families &amp; Groups
          </SectionEyebrow>
          <OchreLine className="mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6EE] leading-tight max-w-3xl mb-6">
            Give everyone enough space —{' '}
            <em className="italic font-normal text-[#D4A84B]">
              and make the whole trip easier.
            </em>
          </h1>
          <p className="font-inter text-[#FAF6EE]/70 text-lg max-w-2xl leading-relaxed mb-8">
            Why pay hotel rates multiplied across 3 or 4 separate rooms? {SITE_NAME} offers spacious 2-bedroom self-catering apartments with private lounges, full kitchens, and family safari coordination in Victoria Falls.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#family-enquiry"
              className="px-8 py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
            >
              Check Family Suite Availability
            </a>
            <Link
              href="/apartments"
              className="px-6 py-4 bg-[#132338] text-[#FAF6EE] border border-[#0B1B2B] font-dm text-sm rounded hover:border-[#C8922A] transition-colors"
            >
              Explore Apartment Layouts
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Visual */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-20">
        <div className="relative aspect-[16/8] sm:aspect-[21/9] rounded-lg overflow-hidden shadow-2xl border border-[#E2D9C8]">
          <Image
            src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1600&q=85"
            alt="Family enjoying an African safari adventure together"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between text-[#FAF6EE] gap-2">
            <div>
              <p className="font-playfair text-xl font-bold">2-Bedroom Suites • Sleeps Up to 4–6 Guests</p>
              <p className="font-inter text-xs text-[#FAF6EE]/80">Full kitchen, private lounge, dining area and garden access</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C8922A] text-[#0B1B2B] font-dm text-xs font-semibold rounded">
              <Users size={14} /> Family &amp; Group Favourite
            </span>
          </div>
        </div>
      </div>

      {/* Hotel vs Mzilikazi Comparison */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionEyebrow className="mb-4">The Smart Family Choice</SectionEyebrow>
            <OchreLine className="mx-auto mb-6" />
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#0B1B2B] leading-tight">
              Compare the Real Cost &amp; Experience
            </h2>
            <p className="font-inter text-[#4A5568] text-base mt-4 leading-relaxed">
              When travelling with children or extended relatives, standard hotel rooms quickly multiply in cost and split your group across separate hallways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional Hotel */}
            <div className="bg-white border border-[#E2D9C8] rounded-xl p-8 flex flex-col justify-between opacity-85">
              <div>
                <span className="font-dm text-xs font-semibold uppercase tracking-wider text-[#4A5568] block mb-2">
                  Standard Victoria Falls Hotels
                </span>
                <h3 className="font-playfair text-xl font-bold text-[#0B1B2B] mb-4">
                  Multiple Disconnected Hotel Rooms
                </h3>
                <ul className="space-y-3 text-sm text-[#4A5568] font-inter">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>Costs multiply: Room rate × number of family rooms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>No kitchen — forced restaurant dining 3 times a day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>No shared private living space to gather or decompress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>Kids in separate hotel rooms with separate keys</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[#E2D9C8] text-xs text-[#4A5568]/60">
                High per-person multiplier + expensive dining costs
              </div>
            </div>

            {/* Mzilikazi Connected Home Base */}
            <div className="bg-[#0B1B2B] text-[#FAF6EE] border-2 border-[#C8922A] rounded-xl p-8 flex flex-col justify-between shadow-xl relative">
              <div className="absolute -top-3.5 right-6 px-3 py-1 bg-[#C8922A] text-[#0B1B2B] font-dm text-[11px] font-bold uppercase tracking-wider rounded-full">
                Best Family Value
              </div>
              <div>
                <span className="font-dm text-xs font-semibold uppercase tracking-wider text-[#D4A84B] block mb-2">
                  Mzilikazi Guest Lodge
                </span>
                <h3 className="font-playfair text-xl font-bold text-[#FAF6EE] mb-4">
                  One Dedicated 2-Bedroom Home Base
                </h3>
                <ul className="space-y-3 text-sm text-[#FAF6EE]/80 font-inter">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-[#C8922A] shrink-0 mt-0.5" />
                    <span>One comprehensive unit rate for up to 4–6 guests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-[#C8922A] shrink-0 mt-0.5" />
                    <span>Full kitchen for snacks, breakfasts, and private chef nights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-[#C8922A] shrink-0 mt-0.5" />
                    <span>Private lounge and dining table for games and family time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-[#C8922A] shrink-0 mt-0.5" />
                    <span>Peace of mind with everyone under one secure roof</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[#132338] text-xs text-[#D4A84B] font-dm">
                ✓ Significant savings for families &amp; small groups
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Capabilities Grid */}
      <section className="bg-[#F0E8D6] py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <SectionEyebrow className="mb-4">Designed for Ease</SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#0B1B2B]">
              Every detail considered for your family.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {familyAdvantages.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-[#E2D9C8] rounded-lg p-6 flex flex-col gap-3"
                >
                  <div className="p-2.5 bg-[#FAF6EE] rounded-lg border border-[#E2D9C8] w-fit text-[#C8922A]">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-dm font-semibold text-[#0B1B2B] text-base">
                    {item.title}
                  </h3>
                  <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recommended Family Activities */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <SectionEyebrow className="mb-4">Curated for All Ages</SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#0B1B2B]">
              Experiences children and adults love equally.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {familyExperiences.map((exp) => (
              <div
                key={exp.title}
                className="bg-white border border-[#E2D9C8] rounded-lg p-6 flex flex-col justify-between hover:border-[#C8922A] transition-colors"
              >
                <div>
                  <span className="inline-block px-2 py-0.5 text-[10px] font-dm font-semibold uppercase tracking-wider bg-[#FAF6EE] text-[#C8922A] rounded mb-2 border border-[#E2D9C8]">
                    {exp.tag}
                  </span>
                  <h3 className="font-dm font-semibold text-[#0B1B2B] text-base mb-2">
                    {exp.title}
                  </h3>
                  <p className="font-inter text-xs text-[#4A5568] leading-relaxed mb-4">
                    {exp.desc}
                  </p>
                </div>
                <Link
                  href={exp.href}
                  className="inline-flex items-center gap-1.5 font-dm text-xs font-semibold text-[#C8922A] hover:text-[#0B1B2B] transition-colors"
                >
                  Learn more <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="family-enquiry" className="bg-[#0B1B2B] py-20 text-[#FAF6EE]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionEyebrow theme="light" className="mb-4">Family &amp; Group Booking</SectionEyebrow>
            <OchreLine className="mx-auto mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#FAF6EE]">
              Let’s Plan Your Family Victoria Falls Stay
            </h2>
            <p className="font-inter text-[#FAF6EE]/70 text-base mt-3">
              Tell us your dates and party size (including children ages if applicable). We will recommend the ideal unit configuration.
            </p>
          </div>

          <div className="bg-white text-[#0B1B2B] border border-[#E2D9C8] rounded-xl p-8 shadow-xl">
            <EnquiryForm defaultPreference="Family / Group 2-Bedroom Suite" />
          </div>
        </div>
      </section>
    </div>
  );
}
