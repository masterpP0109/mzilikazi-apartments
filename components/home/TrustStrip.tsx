import {
  UtensilsCrossed,
  MapPin,
  Home,
  HeartHandshake,
  ShieldCheck,
  Compass,
  Sparkles,
  CheckCircle,
  PhoneCall,
} from 'lucide-react';
import { TRUST_PILLARS } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  UtensilsCrossed,
  MapPin,
  Home,
  HeartHandshake,
  ShieldCheck,
  Compass,
  Sparkles,
  CheckCircle,
  PhoneCall,
};

export default function TrustStrip() {
  return (
    <section
      id="trust"
      className="bg-[#0B1B2B] py-16 lg:py-20 border-b border-[#132338]"
      aria-label="Why stay with Mzilikazi"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {TRUST_PILLARS.map((pillar) => {
            const Icon = iconMap[pillar.icon] ?? Compass;
            return (
              <div
                key={pillar.title}
                className="flex flex-col items-start gap-3 p-5 rounded-lg bg-[#132338]/60 border border-[#132338] hover:border-[#C8922A]/40 transition-colors"
              >
                <div className="p-2.5 rounded bg-[#0B1B2B] border border-[#C8922A]/30" aria-hidden="true">
                  <Icon size={20} className="text-[#C8922A]" />
                </div>
                <h3 className="font-dm font-semibold text-[#FAF6EE] text-base">
                  {pillar.title}
                </h3>
                <p className="font-inter text-xs sm:text-sm text-[#FAF6EE]/70 leading-relaxed">
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
