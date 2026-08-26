import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Wifi,
  FileText,
  Clock,
  Car,
  ShieldCheck,
  Check,
  Sunset,
  Phone,
  Building,
} from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Corporate & Conference Accommodation | Victoria Falls, Zimbabwe',
  description:
    'Corporate lodging, executive apartments and conference group accommodation in Victoria Falls. Fast Wi-Fi, solar power backup, VAT invoicing, and venue transfers for business delegates.',
  keywords: [
    'Victoria Falls conference accommodation',
    'corporate accommodation Victoria Falls',
    'business travel Victoria Falls Zimbabwe',
    'executive apartments Victoria Falls',
    'Victoria Falls summit lodging',
  ],
};

const corporateFeatures = [
  {
    icon: FileText,
    title: 'Official Corporate Invoicing',
    description:
      'Itemized pro-forma and final VAT tax invoices for seamless finance department reconciliation and corporate reimbursement.',
  },
  {
    icon: Wifi,
    title: 'Reliable Wi-Fi & Solar Power',
    description:
      'High-speed internet throughout the property paired with robust solar backup ensures video conferences and work calls are never disrupted.',
  },
  {
    icon: Car,
    title: 'Airport & Venue Transfers',
    description:
      'Punctual, dedicated driver coordination for airport pickups (VFA) and shuttles to major Victoria Falls conference centres and hotels.',
  },
  {
    icon: Clock,
    title: 'Flexible Early Schedules',
    description:
      'Tailored check-in/out and early departure breakfast coordination so you make your morning summit keynotes on time.',
  },
  {
    icon: Building,
    title: 'Quiet Work & Rest Spaces',
    description:
      'Separate bedrooms and private living areas with work desks, away from loud hotel corridors and lobby congestion.',
  },
  {
    icon: Sunset,
    title: 'Executive Evening Experiences',
    description:
      'Unwind after long summit sessions with a curated Zambezi sunset cruise or a guided Victoria Falls viewing organized by our concierge.',
  },
];

const upcomingEvents = [
  'Zimbabwe TNF Global Summit (1,500–2,000 Delegates)',
  'UN Tourism Africa & Regional Summits',
  'ZNCC (Zimbabwe National Chamber of Commerce) Annual Congress',
  'SADC & Pan-African Intergovernmental Conferences',
  'Corporate Executive Retreats & NGO Field Missions',
];

export default function CorporateStaysPage() {
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
            Corporate &amp; MICE Stays
          </SectionEyebrow>
          <OchreLine className="mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6EE] leading-tight max-w-3xl mb-6">
            Stay for the conference.{' '}
            <em className="italic font-normal text-[#D4A84B]">
              Experience Victoria Falls while you’re here.
            </em>
          </h1>
          <p className="font-inter text-[#FAF6EE]/70 text-lg max-w-2xl leading-relaxed mb-8">
            Business travel demands certainty, speed, and clean administration. {SITE_NAME} provides comfortable, self-catering executive suites with high-speed connectivity, quiet workspaces, official invoicing, and seamless transfer logistics.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#corporate-enquiry"
              className="px-8 py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
            >
              Request Corporate Quote / Invoice
            </a>
            <a
              href="https://wa.me/263770000000?text=Hello%20Mzilikazi%20Team%2C%20I%20am%20enquiring%20about%20corporate%2Fconference%20accommodation."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-[#132338] text-[#FAF6EE] border border-[#0B1B2B] font-dm text-sm rounded hover:border-[#C8922A] transition-colors inline-flex items-center gap-2"
            >
              <Phone size={15} className="text-[#C8922A]" /> Priority Corporate WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-20">
        <div className="relative aspect-[16/8] sm:aspect-[21/9] rounded-lg overflow-hidden shadow-2xl border border-[#E2D9C8]">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=85"
            alt="Modern, quiet executive workspace and apartment"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between text-[#FAF6EE] gap-2">
            <div>
              <p className="font-playfair text-xl font-bold">Executive Comfort &amp; High-Speed Connectivity</p>
              <p className="font-inter text-xs text-[#FAF6EE]/80">Designed for international and regional business delegates</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C8922A] text-[#0B1B2B] font-dm text-xs font-semibold rounded">
              <ShieldCheck size={14} /> Solar Powered &amp; Connected
            </span>
          </div>
        </div>
      </div>

      {/* Corporate Capabilities Grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <SectionEyebrow className="mb-4">Business Readiness</SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#0B1B2B] leading-tight">
              What corporate travellers need — without the friction.
            </h2>
            <p className="font-inter text-[#4A5568] text-base mt-4 leading-relaxed">
              We know corporate guests aren’t looking for flowery promises. You need reliable Wi-Fi, comfortable rest, proper paperwork, and reliable transfers so you can focus on your agenda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corporateFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-white border border-[#E2D9C8] rounded-lg p-7 flex flex-col gap-3 hover:border-[#C8922A] transition-colors"
                >
                  <div className="p-2.5 bg-[#FAF6EE] rounded-lg border border-[#E2D9C8] w-fit text-[#C8922A]">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-dm font-semibold text-[#0B1B2B] text-lg">
                    {feat.title}
                  </h3>
                  <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conference Hub Context & Group Logistics */}
      <section className="bg-[#0B1B2B] py-20 text-[#FAF6EE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionEyebrow theme="light" className="mb-4">Victoria Falls MICE Hub</SectionEyebrow>
              <OchreLine className="mb-6" />
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#FAF6EE] leading-tight mb-6">
                Attending a summit or bringing a delegation?
              </h2>
              <p className="font-inter text-[#FAF6EE]/70 text-base leading-relaxed mb-6">
                Victoria Falls is rapidly emerging as a premier African conference destination. When hundreds or thousands of delegates arrive simultaneously, traditional hotels fill up quickly and skyrocket their rates.
              </p>
              <p className="font-inter text-[#FAF6EE]/70 text-base leading-relaxed mb-6">
                Mzilikazi provides companies, ministries, NGOs, and professional bodies with cost-effective multi-bedroom units where teams can stay together comfortably, prepare team meals or hire a private chef, and enjoy dedicated shuttles.
              </p>
              <div className="p-4 bg-[#132338] rounded-lg border border-[#0B1B2B]">
                <p className="font-dm text-xs font-semibold uppercase tracking-wider text-[#C8922A] mb-2">
                  Key Conferences &amp; Summits Served
                </p>
                <ul className="space-y-2">
                  {upcomingEvents.map((event) => (
                    <li key={event} className="flex items-center gap-2 text-xs font-inter text-[#FAF6EE]/80">
                      <Check size={13} className="text-[#C8922A] shrink-0" />
                      <span>{event}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-[#132338] border border-[#C8922A]/30 rounded-xl p-8 space-y-6">
              <h3 className="font-playfair text-2xl font-bold text-[#FAF6EE]">
                Corporate Booking Checklist
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    title: 'Group Room Blocks',
                    desc: 'Reserve multiple units for executive delegations with single master billing.',
                  },
                  {
                    title: 'Airport Meet & Greet',
                    desc: 'Coordinated arrivals for delegates flying in on separate regional flights.',
                  },
                  {
                    title: 'Evening Sunset Decompression',
                    desc: 'Treat your executives or partners to a private Zambezi cruise after the summit.',
                  },
                  {
                    title: 'Transparent Payment Terms',
                    desc: 'Bank wire transfers, major credit cards, and formal pro-forma invoicing supported.',
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <Check size={16} className="text-[#C8922A] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-dm font-semibold text-sm text-[#FAF6EE]">{item.title}</h4>
                      <p className="font-inter text-xs text-[#FAF6EE]/60">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-[#0B1B2B]">
                <a
                  href="#corporate-enquiry"
                  className="block w-full text-center py-3 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
                >
                  Send Corporate Requirements
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Enquiry Form Section */}
      <section id="corporate-enquiry" className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionEyebrow className="mb-4">Corporate Reservation Desk</SectionEyebrow>
            <OchreLine className="mx-auto mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-[#0B1B2B]">
              Request Corporate Rates &amp; Invoicing
            </h2>
            <p className="font-inter text-[#4A5568] text-base mt-3">
              Let us know your dates, delegation size, and transport requirements. We reply with a detailed proposal within 24 hours.
            </p>
          </div>

          <div className="bg-white border border-[#E2D9C8] rounded-xl p-8 shadow-sm">
            <EnquiryForm defaultPreference="Corporate / Conference Stay" />
          </div>
        </div>
      </section>
    </div>
  );
}
