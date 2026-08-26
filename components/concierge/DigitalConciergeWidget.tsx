'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import DigitalConciergeModal from './DigitalConciergeModal';

export default function DigitalConciergeWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Pill (Bottom right) */}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#0B1B2B] text-[#FAF6EE] border border-[#C8922A] rounded-full shadow-2xl hover:bg-[#132338] transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8922A]"
          aria-label="Open Digital Concierge and Trip Planner"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8922A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C8922A]"></span>
          </span>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#C8922A] group-hover:rotate-12 transition-transform" />
            <span className="font-dm text-xs font-semibold tracking-wide">
              Digital Concierge &amp; Planner
            </span>
          </div>
        </button>
      </div>

      {/* Modal */}
      <DigitalConciergeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
