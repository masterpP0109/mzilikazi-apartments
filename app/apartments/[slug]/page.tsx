import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check, Users, BedDouble, Sparkles } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import EnquiryForm from '@/components/forms/EnquiryForm';

interface SuiteDetails {
  name: string;
  tagline: string;
  capacity: string;
  bedrooms: string;
  beds: string;
  image: string;
  imageAlt: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  amenities: string[];
}

const apartmentData: Record<string, SuiteDetails> = {
  'zambezi-suite': {
    name: 'The Zambezi Executive Suite',
    tagline: 'Two bedrooms, private terrace, full modern kitchen, and dedicated workspace.',
    capacity: '4 – 5',
    bedrooms: '2',
    beds: '1 King Bed + 2 Twin Beds (can be configured as 2 Kings)',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85',
    imageAlt: 'The Zambezi Executive Suite living room and balcony',
    shortDescription:
      'Our premier 2-bedroom executive apartment combining expansive living areas, quiet sleeping quarters, high-speed connectivity, and full self-catering convenience.',
    longDescription:
      'Whether you are visiting Victoria Falls for high-level summits, corporate missions, or an unforgettable holiday with family, the Zambezi Suite provides uncompromised privacy and comfort. The open-plan lounge flows into a dining area and a fully appointed kitchen with full refrigeration, gas/electric stove, microwave, and coffee station. Solar-backed power guarantees your lighting, internet, and work devices remain fully operational around the clock.',
    highlights: [
      'Master bedroom with King bed & premium en-suite bathroom',
      'Second spacious bedroom with flexible twin bedding',
      'Dedicated work desk with high-speed Wi-Fi and universal charging',
      'Full kitchen with cookware, tableware, and large refrigerator',
      'Private patio seating overlooking lush garden greenery',
      'Option to arrange in-apartment private chef dinners',
    ],
    amenities: [
      'Fully equipped kitchen with refrigerator & stove',
      'High-speed Wi-Fi (Solar battery backed)',
      'Split-system air conditioning in all rooms',
      'Daily housekeeping service',
      'Fresh luxury cotton linens & bath towels',
      'Complimentary tea & coffee amenities',
      'Secure on-site gated parking',
      'Digital Concierge & tour booking assistance',
    ],
  },
  'family-suite': {
    name: 'The Mosi-oa-Tunya Family Suite',
    tagline: 'Two bedrooms, generous family lounge, full kitchen, and peaceful garden access.',
    capacity: '4 – 6',
    bedrooms: '2',
    beds: '1 King Bed + 2 Single Beds + Comfortable Sleeper Couch',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&q=85',
    imageAlt: 'The Mosi-oa-Tunya Family Suite interior with warm tones',
    shortDescription:
      'Designed specifically for families and small groups who want the comfort of staying together under one secure roof with ample space to relax.',
    longDescription:
      'Travelling as a family in Victoria Falls shouldn’t mean feeling cramped in separate hotel rooms. The Mosi-oa-Tunya Family Suite gives parents and children their own private bedrooms, a large central lounge for relaxing after adventurous days, and a full kitchen to prepare meals on your own timetable. Baby cots and highchairs can be provided upon request.',
    highlights: [
      'Separate master bedroom and dedicated children’s/second bedroom',
      'Full kitchen for home-cooked meals, snacks, and chilled drinks',
      'Spacious living room with sofa seating and dining table',
      'Child-safe enclosed garden setting with secure fencing',
      'Close coordination for child-friendly safaris and river cruises',
      'Private chef hire available for family celebration dinners',
    ],
    amenities: [
      'Full family kitchen with stovetop, oven & microwave',
      'Large family-sized refrigerator & freezer',
      'High-speed Wi-Fi & Smart TV capabilities',
      'Air conditioning throughout',
      'Baby cot and extra linen on request',
      'Solar power backup system',
      'Gated secure parking on compound',
      'Airport transfer coordination with child seats',
    ],
  },
  'batoka-suite': {
    name: 'The Batoka Garden Suite',
    tagline: 'One-bedroom sanctuary with King bed, equipped kitchen, and lush garden outlook.',
    capacity: '2',
    bedrooms: '1',
    beds: '1 Plush King Bed',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=85',
    imageAlt: 'The Batoka Garden Suite with King bed and garden view',
    shortDescription:
      'A quiet, beautifully appointed one-bedroom retreat for couples, honeymooners, or solo travellers seeking tranquility and independence in Victoria Falls.',
    longDescription:
      'The Batoka Garden Suite is crafted for travelers who appreciate thoughtful comfort and privacy. Enjoy slow, sunlit mornings making your own espresso before heading out to the rainforest viewpoints, and return to an air-conditioned haven surrounded by birdlife and garden serenity.',
    highlights: [
      'Plush King-size bed with hypoallergenic pillows and premium linens',
      'Equipped kitchen with cooktop, microwave, kettle, and fridge',
      'Cozy dining nook and comfortable seating area',
      'Quiet workspace with reliable Wi-Fi',
      'Private bathroom with walk-in hot shower',
      'Outdoor patio with garden views',
    ],
    amenities: [
      'Equipped kitchenette / kitchen',
      'High-speed Wi-Fi (solar backed)',
      'Air conditioning & ceiling fan',
      'Fresh luxury linens & towels',
      'Work desk & seating',
      'Tea & coffee making station',
      'Daily housekeeping',
      'Secure off-street parking',
    ],
  },
};

// Aliases for legacy URLs
apartmentData['apartment-one'] = apartmentData['zambezi-suite'];
apartmentData['apartment-two'] = apartmentData['family-suite'];
apartmentData['apartment-three'] = apartmentData['batoka-suite'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const apt = apartmentData[slug];
  if (!apt) return { title: 'Suite Not Found' };
  return {
    title: `${apt.name} | Mzilikazi Guest Lodge`,
    description: `${apt.name} at Mzilikazi Guest Lodge, Victoria Falls. ${apt.tagline}`,
  };
}

export default async function ApartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const apt = apartmentData[slug];
  if (!apt) notFound();

  return (
    <div className="pt-20 bg-[#FAF6EE] min-h-screen">
      {/* Hero */}
      <section className="bg-[#0B1B2B] py-16 lg:py-20 text-[#FAF6EE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow theme="light" className="mb-4">
            Suite Details
          </SectionEyebrow>
          <OchreLine className="mb-6" />
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {apt.name}
          </h1>
          <p className="font-inter text-[#D4A84B] text-base sm:text-lg mb-6">
            {apt.tagline}
          </p>

          <div className="flex flex-wrap gap-6 text-sm font-dm text-[#FAF6EE]/80">
            <span className="flex items-center gap-2">
              <Users size={16} className="text-[#C8922A]" /> Sleeps {apt.capacity}
            </span>
            <span className="flex items-center gap-2">
              <BedDouble size={16} className="text-[#C8922A]" /> {apt.bedrooms} Bedroom(s)
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#C8922A]" /> {apt.beds}
            </span>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-16">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-[#E2D9C8]">
          <Image
            src={apt.image}
            alt={apt.imageAlt}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Main Content & Enquiry Grid */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Suite Details & Amenities */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <h2 className="font-playfair text-2xl font-bold text-[#0B1B2B] mb-4">
                  About this suite
                </h2>
                <p className="font-inter text-base text-[#4A5568] leading-relaxed mb-4">
                  {apt.shortDescription}
                </p>
                <p className="font-inter text-base text-[#4A5568] leading-relaxed">
                  {apt.longDescription}
                </p>
              </div>

              {/* Highlights */}
              <div className="p-6 bg-white border border-[#E2D9C8] rounded-xl">
                <h3 className="font-dm font-bold text-[#0B1B2B] text-base mb-4">
                  Suite Highlights
                </h3>
                <ul className="space-y-3">
                  {apt.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-inter text-[#4A5568]">
                      <Check size={16} className="text-[#C8922A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-playfair text-xl font-bold text-[#0B1B2B] mb-4">
                  Included Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {apt.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="p-3 bg-white border border-[#E2D9C8] rounded-lg text-xs font-inter text-[#4A5568] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8922A]" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Reservation Enquiry Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="bg-white border-2 border-[#C8922A]/50 rounded-2xl p-8 shadow-xl">
                <span className="text-[11px] font-dm font-bold uppercase tracking-wider text-[#C8922A] block mb-1">
                  Direct Reservation
                </span>
                <h3 className="font-playfair text-2xl font-bold text-[#0B1B2B] mb-2">
                  Reserve {apt.name}
                </h3>
                <p className="font-inter text-xs text-[#4A5568] mb-6">
                  Best direct rate guaranteed. Our team will verify dates and send a full confirmation within 24 hours.
                </p>
                <EnquiryForm defaultPreference={apt.name} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
