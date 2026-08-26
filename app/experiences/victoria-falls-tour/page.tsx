import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ShieldCheck,
  Droplets,
  Eye,
  Camera,
} from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import EnquiryForm from '@/components/forms/EnquiryForm';

export const metadata: Metadata = {
  title: 'Guided Tour of Victoria Falls | Mosi-oa-Tunya | Mzilikazi Guest Lodge',
  description:
    'Experience a comprehensive guided walking tour of Victoria Falls (Mosi-oa-Tunya) with certified local Zimbabwean guides. Viewpoints, rainforest flora, geology, and history.',
  keywords: [
    'guided tour Victoria Falls Zimbabwe',
    'Victoria Falls national park tour',
    'Mosi-oa-Tunya guided walk',
    'Victoria Falls viewpoints tour',
    'Victoria Falls guide rainforest',
  ],
};

const viewpoints = [
  {
    name: "David Livingstone Statue & Devil's Cataract",
    desc: 'The historic starting point overlooking the lowest point of the Falls where the Zambezi rushes with immense force.',
  },
  {
    name: 'The Main Falls',
    desc: 'The widest and most spectacular unbroken sheet of falling water, generating the famous thunderous roar and ascending spray cloud.',
  },
  {
    name: 'Rainbow Falls',
    desc: 'The highest point of the Falls (108 metres). On sunny mornings and afternoons, vibrant double rainbows arch across the gorge.',
  },
  {
    name: 'Danger Point & The Boiling Pot',
    desc: 'Looking down into the deep, turbulent canyon where the Zambezi River is compressed into the narrow Batoka Gorge below.',
  },
];

export default function VictoriaFallsTourPage() {
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
            Signature Destination Anchor
          </SectionEyebrow>
          <OchreLine className="mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mb-6">
            Guided Tour of Victoria Falls.{' '}
            <em className="italic font-normal text-[#D4A84B]">
              See more. Understand more.
            </em>
          </h1>
          <p className="font-inter text-[#FAF6EE]/75 text-lg max-w-2xl leading-relaxed mb-8">
            A guided tour of Victoria Falls is genuinely different to walking in alone. The right guide takes you to the viewpoints you would otherwise miss, explains the geology and seasons, and shares the living folklore of Mosi-oa-Tunya.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#tour-enquiry"
              className="px-8 py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
            >
              Book a Guided Tour
            </a>
            <span className="text-xs font-dm text-[#FAF6EE]/60 px-4 py-2 bg-[#132338] rounded border border-[#0B1B2B]">
              Duration: 2 to 2.5 Hours (Morning or Afternoon)
            </span>
          </div>
        </div>
      </section>

      {/* Hero Visual */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-20">
        <div className="relative aspect-[16/8] sm:aspect-[21/9] rounded-lg overflow-hidden shadow-2xl border border-[#E2D9C8]">
          <Image
            src="https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=1600&q=85"
            alt="Victoria Falls dramatic water curtain and rainbows"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between text-[#FAF6EE] gap-2">
            <div>
              <p className="font-playfair text-xl font-bold">Mosi-oa-Tunya: The Smoke That Thunders</p>
              <p className="font-inter text-xs text-[#FAF6EE]/80">16 viewpoint walking trail through the lush rainforest</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C8922A] text-[#0B1B2B] font-dm text-xs font-semibold rounded">
              <ShieldCheck size={14} /> Certified National Parks Guide
            </span>
          </div>
        </div>
      </div>

      {/* Why Take a Guided Tour */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionEyebrow className="mb-4">Why Take a Guide</SectionEyebrow>
            <OchreLine className="mx-auto mb-6" />
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#0B1B2B]">
              The Story Behind the Spectacle
            </h2>
            <p className="font-inter text-[#4A5568] text-base mt-4 leading-relaxed">
              Anyone can look at a waterfall. A great local guide brings the landscape alive with deep knowledge of the Zambezi River, seasonal flood shifts, and regional history.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E2D9C8] rounded-xl p-7 flex flex-col gap-3">
              <div className="p-3 bg-[#FAF6EE] rounded-lg text-[#C8922A] w-fit">
                <Eye size={22} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-[#0B1B2B]">
                All 16 National Park Viewpoints
              </h3>
              <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
                Walk the entire Zimbabwean trail system. From the serene western cataract to the spray-drenched cliffs of Danger Point, never miss a photo angle or scenic bend.
              </p>
            </div>

            <div className="bg-white border border-[#E2D9C8] rounded-xl p-7 flex flex-col gap-3">
              <div className="p-3 bg-[#FAF6EE] rounded-lg text-[#C8922A] w-fit">
                <Droplets size={22} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-[#0B1B2B]">
                The Unique Rainforest Flora
              </h3>
              <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
                Discover how the eternal mist creates a micro-climate supporting rare ferns, wild palms, ebony, and mahogany trees found nowhere else in the dry surrounding scrubland.
              </p>
            </div>

            <div className="bg-white border border-[#E2D9C8] rounded-xl p-7 flex flex-col gap-3">
              <div className="p-3 bg-[#FAF6EE] rounded-lg text-[#C8922A] w-fit">
                <Camera size={22} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-[#0B1B2B]">
                Rainbow Timing &amp; Photo Guidance
              </h3>
              <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
                Guides know exactly where sunlight hits the spray for optimal rainbow photography and will keep your camera equipment dry between viewpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Viewpoints Highlight */}
      <section className="bg-[#F0E8D6] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow className="mb-4">Key Trail Highlights</SectionEyebrow>
            <OchreLine className="mx-auto mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#0B1B2B]">
              Iconic Viewpoints You’ll Visit
            </h2>
          </div>

          <div className="space-y-4">
            {viewpoints.map((vp) => (
              <div
                key={vp.name}
                className="bg-white border border-[#E2D9C8] rounded-xl p-6 flex flex-col sm:flex-row gap-4 justify-between"
              >
                <div>
                  <h3 className="font-dm font-bold text-base text-[#0B1B2B] mb-1">
                    {vp.name}
                  </h3>
                  <p className="font-inter text-xs text-[#4A5568] leading-relaxed">
                    {vp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="tour-enquiry" className="bg-[#0B1B2B] py-20 text-[#FAF6EE]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionEyebrow theme="light" className="mb-4">Guided Tour Booking</SectionEyebrow>
            <OchreLine className="mx-auto mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#FAF6EE]">
              Book Your Guided Victoria Falls Tour
            </h2>
            <p className="font-inter text-[#FAF6EE]/70 text-base mt-3">
              We arrange morning or afternoon departures with lodge pickup. Tell us your dates and party size.
            </p>
          </div>

          <div className="bg-white text-[#0B1B2B] border border-[#E2D9C8] rounded-xl p-8 shadow-xl">
            <EnquiryForm defaultPreference="Guided Tour of Victoria Falls" />
          </div>
        </div>
      </section>
    </div>
  );
}
