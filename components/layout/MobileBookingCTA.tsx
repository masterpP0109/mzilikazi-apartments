'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function MobileBookingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (approx 80vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
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
      <div className="bg-[#0B1B2B]/95 backdrop-blur-sm border-t border-[#132338] px-4 py-3">
        <Link
          href="/contact"
          className="block w-full text-center py-3.5 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-base rounded hover:bg-[#D4A84B] transition-colors"
        >
          Book Your Stay
        </Link>
      </div>
    </div>
  );
}
