import { Check } from 'lucide-react';
import Image from 'next/image';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';

const bullets = [
  {
    text: 'Fully equipped kitchen — cook on your own schedule, or hire a private chef to cook in your apartment',
    // The kitchen is the differentiator: self-catering freedom AND private dining option
    highlight: true,
  },
  { text: 'Generous living space, not just a room', highlight: false },
  { text: 'Separate sleeping and lounging areas for families', highlight: false },
  { text: 'Air-conditioned comfort after a day in the heat', highlight: false },
  { text: 'Reliable Wi-Fi to stay connected when you need to', highlight: false },
  { text: 'A team that knows the destination and can help plan your days', highlight: false },
];

export default function TheStay() {
  return (
    <section
      id="the-stay"
      className="bg-[#FAF6EE] py-20 lg:py-28"
      aria-label="About the stay"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <SectionEyebrow className="mb-4">The Stay</SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#0B1B2B] leading-tight mb-6">
              A place to slow down after the adventure.
            </h2>
            <p className="font-inter text-[#4A5568] text-base leading-relaxed mb-8">
              Victoria Falls is big, loud, and breathtaking. After a day spent on the edge of one of the world&apos;s greatest natural wonders, you deserve somewhere with real space to rest — not just a bed in a room.
            </p>
            <ul className="space-y-3">
              {bullets.map((bullet) => (
                <li key={bullet.text} className="flex items-start gap-3">
                  <Check
                    size={16}
                    className="text-[#C8922A] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className={`font-inter text-sm leading-relaxed ${bullet.highlight ? 'text-[#0B1B2B] font-medium' : 'text-[#4A5568]'}`}>
                    {bullet.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Chef hire callout — premium differentiator */}
            <div className="mt-8 p-5 bg-[#0B1B2B] rounded-lg border-l-4 border-[#C8922A]">
              <p className="font-dm font-semibold text-[#FAF6EE] text-sm mb-1">
                Rather not cook tonight?
              </p>
              <p className="font-inter text-xs text-[#FAF6EE]/60 leading-relaxed">
                Ask us to arrange a private chef. They come to your apartment, cook
                in your kitchen, and you enjoy a proper meal without leaving.
                Perfect for a special occasion — or simply a night off.
                {/* [PLACEHOLDER — confirm chef hire availability with client] */}
              </p>
            </div>
          </div>

          {/* Image + accent card */}
          <div className="relative">
            <div className="relative aspect-[3/2] rounded-lg overflow-hidden w-full">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80"
                alt="Kitchen and living area inside a Mzilikazi room"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            {/* Ochre accent card */}
            <div
              className="absolute -bottom-6 -left-6 bg-[#C8922A] text-[#0B1B2B] p-5 rounded shadow-lg max-w-[200px]"
              aria-label="Space to settle in"
            >
              <p className="font-playfair text-2xl font-bold leading-none mb-1">
                {/* [PLACEHOLDER — confirm with client: add apartment count or key stat] */}
                Space
              </p>
              <p className="font-dm text-xs font-semibold uppercase tracking-wider">
                to settle in
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
