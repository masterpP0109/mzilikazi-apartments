'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MobileBookingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (approx 60vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
      aria-hidden={!isVisible}
    >
      <div className="bg-[#0B1B2B]/95 backdrop-blur-md border-t border-[#132338] px-4 py-2.5 flex items-center gap-2.5 shadow-2xl">
        <a
          href="https://wa.me/263770000000?text=Hello%20Mzilikazi%20Team%2C%20I%20would%20like%20to%20enquire%20about%20availability%20at%20Mzilikazi%20Guest%20Lodge."
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-[#25D366] text-[#0B1B2B] rounded-lg shrink-0 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare size={18} />
        </a>
        <Link
          href="/contact"
          className="flex-1 text-center py-3 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded-lg hover:bg-[#D4A84B] transition-colors flex items-center justify-center gap-2"
        >
          <Calendar size={16} />
          <span>Book Direct / Enquire</span>
        </Link>
      </div>
    </div>
  );
}
