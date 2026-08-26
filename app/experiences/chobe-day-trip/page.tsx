import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Footprints,
  Car,
  ShieldCheck,
  Check,
  FileCheck,
  Camera,
  Anchor,
} from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import EnquiryForm from '@/components/forms/EnquiryForm';

export const metadata: Metadata = {
  title: 'Chobe Day Trip from Victoria Falls (Botswana Safari) | Mzilikazi Guest Lodge',
  description:
    'Full-day cross-border safari to Chobe National Park in Botswana from Victoria Falls. Includes Kazungula border transfers, Chobe River boat cruise, buffet lunch, and 4x4 game drive.',
  keywords: [
    'Chobe day trip from Victoria Falls',
    'Chobe National Park safari Botswana',
    'Chobe river boat cruise',
    'Victoria Falls to Botswana day tour',
    'Chobe day safari transfers',
  ],
};

const itinerarySchedule = [
  {
    time: '07:00 – 07:30',
    title: 'Morning Pickup from Mzilikazi',
    desc: 'Your transfer driver collects you directly from Mzilikazi Guest Lodge for the comfortable 1-hour drive through the teak forests to the Kazungula border.',
  },
  {
    time: '08:30 – 09:00',
    title: 'Botswana Border Crossing (Kazungula)',
    desc: 'Assisted border processing from Zimbabwe into Botswana. Meet your professional Botswana safari guide and transfer to the river jetty.',
  },
  {
    time: '09:30 – 12:30',
    title: 'Chobe River Boat Safari',
    desc: 'A magnificent 3-hour river safari along the Chobe River. Get up close to massive herds of elephants swimming and drinking, hippos, crocodiles, and prolific waterbirds.',
  },
  {
    time: '12:30 – 13:30',
    title: 'Buffet Lunch at Riverside Lodge',
    desc: 'Enjoy a delicious hot and cold buffet lunch at a luxury riverfront safari lodge with drinks available.',
  },
  {
    time: '13:30 – 16:30',
    title: '4x4 Open-Vehicle Game Drive in Chobe NP',
    desc: 'Board custom open 4x4 safari vehicles for an extensive game drive through Chobe National Park. Track lions, leopards, buffalos, giraffes, and sable antelopes.',
  },
  {
    time: '16:30 – 18:00',
    title: 'Return Border Crossing & Lodge Dropoff',
    desc: 'Transfer back across the Kazungula border and return directly to Mzilikazi Guest Lodge in Victoria Falls in time for an evening rest.',
  },
];

const inclusions = [
  'Return road transfers from Mzilikazi Guest Lodge to Kazungula Border',
  '3-Hour morning Chobe River boat cruise',
  'Delicious buffet lunch at a luxury riverside lodge',
  '3-Hour afternoon 4x4 open safari vehicle game drive',
  'Chobe National Park entrance and conservation fees',
  'Professional, licensed Botswana safari guide & tracker',
  'Bottled water on game drive and boat cruise',
];

export default function ChobeDayTripPage() {
  return (
    <div className="pt-20 bg-[#FAF6EE] min-h-screen">
      {/* Hero */}
      <section className="bg-[#0B1B2B] py-20 lg:py-28 relative overflow-hidden text-[#FAF6EE]">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 75% 35%, rgba(200,146,42,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionEyebrow theme="light" className="mb-4">
            Signature Cross-Border Experience
          </SectionEyebrow>
          <OchreLine className="mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mb-6">
            Chobe National Park Day Safari.{' '}
            <em className="italic font-normal text-[#D4A84B]">
              Cross into Botswana’s elephant kingdom.
            </em>
          </h1>
          <p className="font-inter text-[#FAF6EE]/75 text-lg max-w-2xl leading-relaxed mb-8">
            Add a second country and one of Africa’s richest wildlife spectacles to your Victoria Falls trip in a single seamless day. From river boat cruising amongst swimming elephants to tracking lions in open 4x4s.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#chobe-enquiry"
              className="px-8 py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
            >
              Add Chobe to Your Stay Plan
            </a>
            <span className="text-xs font-dm text-[#FAF6EE]/60 px-4 py-2 bg-[#132338] rounded border border-[#0B1B2B]">
              Duration: Full Day (Approx. 07:00 – 18:00)
            </span>
          </div>
        </div>
      </section>

      {/* Hero Visual */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-20">
        <div className="relative aspect-[16/8] sm:aspect-[21/9] rounded-lg overflow-hidden shadow-2xl border border-[#E2D9C8]">
          <Image
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&q=85"
            alt="Elephants drinking along the Chobe riverbanks in Botswana"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between text-[#FAF6EE] gap-2">
            <div>
              <p className="font-playfair text-xl font-bold">Victoria Falls → Botswana → Victoria Falls</p>
              <p className="font-inter text-xs text-[#FAF6EE]/80">River boat safari + 4x4 open vehicle land game drive</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C8922A] text-[#0B1B2B] font-dm text-xs font-semibold rounded">
              <ShieldCheck size={14} /> Full Package Coordinated by Mzilikazi
            </span>
          </div>
        </div>
      </div>

      {/* Key Highlights */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E2D9C8] rounded-xl p-7 flex flex-col gap-3">
              <div className="p-3 bg-[#FAF6EE] rounded-lg text-[#C8922A] w-fit">
                <Anchor size={22} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-[#0B1B2B]">
                3-Hour Chobe River Boat Cruise
              </h3>
              <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
                Boat cruising along the Chobe River brings you astonishingly close to wildlife without disturbing them. Watch elephant families submerge, buffalos graze on grassy islands, and crocodiles sunbathe.
              </p>
            </div>

            <div className="bg-white border border-[#E2D9C8] rounded-xl p-7 flex flex-col gap-3">
              <div className="p-3 bg-[#FAF6EE] rounded-lg text-[#C8922A] w-fit">
                <Footprints size={22} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-[#0B1B2B]">
                3-Hour Open 4x4 Game Drive
              </h3>
              <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
                Venture deep into the national park in open-sided safari vehicles. Chobe is famed for lion prides, leopards, wild dogs, giraffes, zebras, and vast antelope herds.
              </p>
            </div>

            <div className="bg-white border border-[#E2D9C8] rounded-xl p-7 flex flex-col gap-3">
              <div className="p-3 bg-[#FAF6EE] rounded-lg text-[#C8922A] w-fit">
                <Car size={22} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-[#0B1B2B]">
                Door-to-Door Border Logistics
              </h3>
              <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
                No worrying about road navigation or border transfers. We arrange trusted operators who escort you through immigration at Kazungula and bring you safely back to your lodge doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Timeline */}
      <section className="bg-[#0B1B2B] py-20 text-[#FAF6EE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionEyebrow theme="light" className="mb-4">Day Itinerary</SectionEyebrow>
            <OchreLine className="mx-auto mb-6" />
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#FAF6EE]">
              How Your Chobe Day Unfolds
            </h2>
            <p className="font-inter text-sm text-[#FAF6EE]/70 mt-3">
              An unhurried, perfectly balanced combination of river and land safari.
            </p>
          </div>

          <div className="space-y-6">
            {itinerarySchedule.map((item) => (
              <div
                key={item.title}
                className="flex flex-col sm:flex-row gap-4 p-6 bg-[#132338] border border-[#0B1B2B] rounded-xl relative"
              >
                <div className="sm:w-44 shrink-0">
                  <span className="inline-block px-2.5 py-1 bg-[#0B1B2B] text-[#C8922A] font-dm text-xs font-bold rounded">
                    {item.time}
                  </span>
                </div>
                <div>
                  <h3 className="font-dm font-bold text-base text-[#FAF6EE] mb-1">
                    {item.title}
                  </h3>
                  <p className="font-inter text-sm text-[#FAF6EE]/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Travel & Passport Info */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionEyebrow className="mb-4">Important Information</SectionEyebrow>
              <OchreLine className="mb-6" />
              <h2 className="font-playfair text-3xl font-bold text-[#0B1B2B] mb-6">
                Passports, Visas &amp; What to Bring
              </h2>
              <div className="space-y-4 font-inter text-sm text-[#4A5568] leading-relaxed">
                <div className="p-4 bg-white border border-[#E2D9C8] rounded-lg">
                  <h4 className="font-dm font-bold text-[#0B1B2B] mb-1 flex items-center gap-2">
                    <FileCheck size={16} className="text-[#C8922A]" /> Valid Passport Required
                  </h4>
                  <p className="text-xs text-[#4A5568]">
                    Because Chobe is located across the border in Botswana, all guests (including children) must carry a valid physical passport with at least 6 months validity remaining.
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#E2D9C8] rounded-lg">
                  <h4 className="font-dm font-bold text-[#0B1B2B] mb-1 flex items-center gap-2">
                    <Check size={16} className="text-[#C8922A]" /> Visas &amp; Univisa
                  </h4>
                  <p className="text-xs text-[#4A5568]">
                    Many nationalities receive a visa on arrival for Botswana. If travelling on a Zimbabwe KAZA Univisa, you can exit to Botswana and re-enter Zimbabwe freely within the validity period. (Check with your home consulate for country-specific regulations).
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#E2D9C8] rounded-lg">
                  <h4 className="font-dm font-bold text-[#0B1B2B] mb-1 flex items-center gap-2">
                    <Camera size={16} className="text-[#C8922A]" /> What to Pack
                  </h4>
                  <p className="text-xs text-[#4A5568]">
                    Hat, sunscreen, sunglasses, comfortable safari attire (neutral colours recommended), light fleece/jacket for morning breeze on the river, and camera/binoculars.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2D9C8] rounded-xl p-8">
              <h3 className="font-playfair text-2xl font-bold text-[#0B1B2B] mb-4">
                What&apos;s Included in the Chobe Safari
              </h3>
              <ul className="space-y-3 mb-6">
                {inclusions.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-sm font-inter text-[#4A5568]">
                    <Check size={16} className="text-[#C8922A] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-[#E2D9C8] flex flex-col gap-3">
                <a
                  href="#chobe-enquiry"
                  className="w-full text-center py-3.5 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
                >
                  Enquire &amp; Reserve Chobe Safari
                </a>
                <Link
                  href="/experiences"
                  className="text-center font-dm text-xs text-[#4A5568] hover:text-[#0B1B2B] transition-colors"
                >
                  ← Back to Experience Directory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="chobe-enquiry" className="bg-[#0B1B2B] py-20 text-[#FAF6EE]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionEyebrow theme="light" className="mb-4">Reserve Your Safari</SectionEyebrow>
            <OchreLine className="mx-auto mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#FAF6EE]">
              Book Your Chobe Day Safari with Mzilikazi
            </h2>
            <p className="font-inter text-[#FAF6EE]/70 text-base mt-3">
              Combine your accommodation with this bucket-list safari. Let us know your preferred dates and guest count.
            </p>
          </div>

          <div className="bg-white text-[#0B1B2B] border border-[#E2D9C8] rounded-xl p-8 shadow-xl">
            <EnquiryForm defaultPreference="Chobe Day Safari (Botswana)" />
          </div>
        </div>
      </section>
    </div>
  );
}
