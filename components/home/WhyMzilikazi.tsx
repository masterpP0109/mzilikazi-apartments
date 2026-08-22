import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';

const points = [
  {
    number: '01',
    title: 'A real home base — not just a room.',
    description:
      'Hotels give you a room. We give you a full kitchen, private bedrooms, and a lounge to spread out in — whether you are here for two nights or two weeks.',
  },
  {
    number: '02',
    title: 'The falls are the experience. We are the base.',
    description:
      'Victoria Falls does not need competition from the place you sleep. Mzilikazi Rooms is designed to support your experience of the destination, not overshadow it.',
  },
  {
    number: '03',
    title: 'Familiar comfort in an unfamiliar place.',
    description:
      "Travelling internationally involves enough unknowns. Your accommodation shouldn't be one of them. We aim for consistency, cleanliness and honest communication — every stay.",
  },
  {
    number: '04',
    title: 'A team that knows the destination.',
    description:
      "We're not a booking algorithm. We're a local team. Ask us what's worth seeing, what to avoid, where to eat, how to get there. That's part of what you get when you stay here.",
  },
];

export default function WhyMzilikazi() {
  return (
    <section
      id="why-mzilikazi"
      className="bg-[#0B1B2B] py-20 lg:py-28"
      aria-label="Why choose Mzilikazi Rooms"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Sticky heading */}
          <div className="lg:sticky lg:top-24 self-start">
            <SectionEyebrow theme="light" className="mb-4">
              The Difference
            </SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#FAF6EE] leading-tight">
              What makes this the right choice.
            </h2>
          </div>

          {/* Points */}
          <div className="lg:col-span-2 space-y-10">
            {points.map((point) => (
              <div
                key={point.number}
                className="flex gap-6 pb-10 border-b border-[#132338] last:border-0 last:pb-0"
              >
                <span
                  className="font-playfair text-4xl font-bold text-[#C8922A]/30 shrink-0 leading-none w-12"
                  aria-hidden="true"
                >
                  {point.number}
                </span>
                <div>
                  <h3 className="font-dm font-semibold text-[#FAF6EE] text-lg mb-2">
                    {point.title}
                  </h3>
                  <p className="font-inter text-sm text-[#FAF6EE]/60 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
