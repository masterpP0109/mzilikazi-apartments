import { UtensilsCrossed, MapPin, Home, HeartHandshake } from 'lucide-react';
import { TRUST_PILLARS } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  UtensilsCrossed,
  MapPin,
  Home,
  HeartHandshake,
};

export default function TrustStrip() {
  return (
    <section
      id="trust"
      className="bg-[#0B1B2B] py-16 lg:py-20"
      aria-label="Why stay with Mzilikazi"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {TRUST_PILLARS.map((pillar) => {
            const Icon = iconMap[pillar.icon] ?? Home;
            return (
              <div key={pillar.title} className="flex flex-col items-start gap-3">
                <div className="p-2 rounded bg-[#132338]" aria-hidden="true">
                  <Icon size={22} className="text-[#C8922A]" />
                </div>
                <h3 className="font-dm font-semibold text-[#FAF6EE] text-base">
                  {pillar.title}
                </h3>
                <p className="font-inter text-sm text-[#FAF6EE]/60 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
