import { Star } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';

/**
 * PLACEHOLDER NOTICE: All testimonials below are structural placeholders only.
 * DO NOT publish without replacing with verified, real guest reviews.
 * [PLACEHOLDER — confirm all testimonials with client before launch]
 */
const testimonials = [
  {
    quote: '[PLACEHOLDER — replace with verified guest review before publishing]',
    guestName: '[PLACEHOLDER — confirm with client]',
    guestOrigin: '[PLACEHOLDER — confirm with client]',
    platform: 'Google',
    rating: 5,
    apartmentStayed: '[PLACEHOLDER — confirm with client]',
  },
  {
    quote: '[PLACEHOLDER — replace with verified guest review before publishing]',
    guestName: '[PLACEHOLDER — confirm with client]',
    guestOrigin: '[PLACEHOLDER — confirm with client]',
    platform: 'Booking.com',
    rating: 5,
    apartmentStayed: '[PLACEHOLDER — confirm with client]',
  },
  {
    quote: '[PLACEHOLDER — replace with verified guest review before publishing]',
    guestName: '[PLACEHOLDER — confirm with client]',
    guestOrigin: '[PLACEHOLDER — confirm with client]',
    platform: 'Direct',
    rating: 5,
    apartmentStayed: '[PLACEHOLDER — confirm with client]',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
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
      aria-label="Guest reviews"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <SectionEyebrow className="mb-4">Guest Reviews</SectionEyebrow>
          <OchreLine className="mx-auto mb-6" />
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#0B1B2B] leading-tight">
            Don't just take our word for it.
          </h2>
          <p className="font-inter text-sm text-[#C8922A] mt-3">
            {/* [PLACEHOLDER — confirm aggregate rating with client] */}
            [PLACEHOLDER — confirm aggregate rating and review count with client]
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="bg-white rounded-lg p-6 border border-[#E2D9C8] flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <StarRating rating={t.rating} />
                <span className="font-dm text-xs text-[#4A5568]">{t.platform}</span>
              </div>
              <p className="font-inter text-sm text-[#4A5568] leading-relaxed italic flex-1">
                "{t.quote}"
              </p>
              <footer>
                <cite className="not-italic">
                  <span className="font-dm font-semibold text-[#0B1B2B] text-sm block">
                    {t.guestName}
                  </span>
                  <span className="font-inter text-xs text-[#4A5568]">
                    {t.guestOrigin} · {t.apartmentStayed}
                  </span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Verified note */}
        <p className="text-center font-inter text-xs text-[#4A5568] mt-8">
          Only verified guest reviews are published. [PLACEHOLDER — confirm review source and verification method with client]
        </p>
      </div>
    </section>
  );
}
