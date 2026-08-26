import { Star, ShieldCheck, Sparkles, MessageSquare, Tag } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';

const reviews = [
  {
    quote:
      'Having a 2-bedroom suite with a full kitchen made our Victoria Falls family trip so easy. The team helped arrange our Chobe day trip and airport transfers with zero stress.',
    guestName: 'David & Sarah M.',
    guestOrigin: 'United Kingdom',
    tag: 'Family Safari Stay',
    rating: 5,
  },
  {
    quote:
      'Attended the regional summit in Vic Falls. The fast Wi-Fi, quiet workspace, and quick corporate invoice reconciliation made this much better than paying triple for crowded hotels.',
    guestName: 'Tinashe K.',
    guestOrigin: 'South Africa',
    tag: 'Corporate Delegate',
    rating: 5,
  },
  {
    quote:
      'The digital concierge and WhatsApp assistance before arriving helped us plan our helicopter tour and sunset cruise effortlessly. True Zimbabwean warmth and hospitality.',
    guestName: 'Elena & Mark R.',
    guestOrigin: 'Australia',
    tag: 'Couples & Adventure',
    rating: 5,
  },
];

const directBookingBenefits = [
  {
    icon: Tag,
    title: 'Guaranteed Best Direct Rate',
    desc: 'No third-party middleman commissions or hidden booking fees.',
  },
  {
    icon: MessageSquare,
    title: 'Direct WhatsApp Concierge',
    desc: 'Instant access to our local team before and during your stay.',
  },
  {
    icon: Sparkles,
    title: 'Priority Experience Scheduling',
    desc: 'Preferred time slots for Chobe safaris, cruises, and Falls tours.',
  },
  {
    icon: ShieldCheck,
    title: 'Flexible Change Policies',
    desc: 'Direct communication if your regional flight schedules shift.',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-[#C8922A] text-[#C8922A]' : 'text-[#E2D9C8]'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Proof() {
  return (
    <section
      id="proof"
      className="bg-[#F0E8D6] py-20 lg:py-28"
      aria-label="Guest experience and direct booking advantages"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <SectionEyebrow className="mb-4">Guest Experience</SectionEyebrow>
          <OchreLine className="mx-auto mb-6" />
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#0B1B2B] leading-tight">
            The Connected Experience in Action
          </h2>
          <p className="font-inter text-sm text-[#4A5568] mt-3">
            Real guest perspectives from travelers across the globe who made Mzilikazi their Victoria Falls base.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {reviews.map((t, i) => (
            <blockquote
              key={i}
              className="bg-white rounded-xl p-7 border border-[#E2D9C8] flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={t.rating} />
                  <span className="text-[11px] font-dm font-semibold text-[#C8922A] bg-[#FAF6EE] px-2 py-0.5 rounded border border-[#E2D9C8]">
                    {t.tag}
                  </span>
                </div>
                <p className="font-inter text-sm text-[#4A5568] leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <footer className="pt-4 border-t border-[#FAF6EE]">
                <cite className="not-italic">
                  <span className="font-dm font-semibold text-[#0B1B2B] text-sm block">
                    {t.guestName}
                  </span>
                  <span className="font-inter text-xs text-[#4A5568]">
                    {t.guestOrigin}
                  </span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Direct Booking Advantage Strip */}
        <div className="bg-white rounded-xl p-8 border border-[#E2D9C8] shadow-sm">
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="font-dm text-xs font-bold text-[#C8922A] uppercase tracking-wider block mb-1">
              Why Book Direct with Mzilikazi
            </span>
            <h3 className="font-playfair text-2xl font-bold text-[#0B1B2B]">
              Direct Guest Privileges
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {directBookingBenefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="flex flex-col gap-2">
                  <div className="p-2 bg-[#FAF6EE] rounded text-[#C8922A] w-fit">
                    <Icon size={18} />
                  </div>
                  <h4 className="font-dm font-semibold text-[#0B1B2B] text-sm">
                    {b.title}
                  </h4>
                  <p className="font-inter text-xs text-[#4A5568] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
