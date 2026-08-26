import { UtensilsCrossed, Wifi, Waves, Car, Thermometer, ShieldCheck } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import { OFFER_TILES } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  UtensilsCrossed,
  Wifi,
  Waves,
  Car,
  Thermometer,
  ShieldCheck,
};

export default function Offer() {
  return (
    <section
      id="offer"
      className="bg-[#0B1B2B] py-20 lg:py-28"
      aria-label="What's included in your stay"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionEyebrow theme="light" className="mb-4">What&apos;s Included</SectionEyebrow>
          <OchreLine className="mx-auto mb-6" />
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#FAF6EE] leading-tight">
            Your Victoria Falls stay, made simple.
          </h2>
          <p className="font-inter text-[#FAF6EE]/60 text-base mt-4">
            Everything you need is included. Nothing unnecessary is charged.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFER_TILES.map((tile) => {
            const Icon = iconMap[tile.icon] ?? ShieldCheck;
            return (
              <div
                key={tile.title}
                className="bg-[#132338] rounded-lg p-6 border border-[#0B1B2B] flex gap-4"
              >
                <div className="shrink-0 mt-0.5">
                  <Icon size={20} className="text-[#C8922A]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-dm font-semibold text-[#FAF6EE] text-sm mb-1">
                    {tile.title}
                  </h3>
                  <p className="font-inter text-xs text-[#FAF6EE]/50 leading-relaxed">
                    {tile.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
