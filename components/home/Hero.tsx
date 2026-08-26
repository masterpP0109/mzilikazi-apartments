'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';
import { BRAND_SUBTITLE } from '@/lib/constants';
import DigitalConciergeModal from '@/components/concierge/DigitalConciergeModal';

export default function Hero() {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  return (
    <>
      <section
        id="hero"
        className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1B2B]"
        aria-label="Hero"
      >
        {/* Background — African lodge / house exterior */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=85"
            alt="Mzilikazi Guest Lodge exterior at dusk"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {/* Dark overlay so text stays readable */}
          <div className="absolute inset-0 bg-[#0B1B2B]/75 backdrop-blur-[1px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132338]/90 border border-[#C8922A]/40 text-[#D4A84B] font-dm text-xs uppercase tracking-widest mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#C8922A] animate-pulse" />
              Victoria Falls, Zimbabwe • The Connected Home Base
            </motion.div>

            {/* H1 */}
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FAF6EE] leading-tight mb-6 tracking-tight">
              We make Victoria Falls{' '}
              <span className="text-[#C8922A] italic font-normal">easier to experience.</span>
            </h1>

            {/* Sub */}
            <p className="font-inter text-lg sm:text-xl text-[#FAF6EE]/80 max-w-3xl mx-auto leading-relaxed mb-10">
              {BRAND_SUBTITLE} Comfortable 2-bedroom self-catering suites, curated safaris and tours, and responsive digital and human support before and throughout your stay.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-base rounded hover:bg-[#D4A84B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8922A] focus-visible:ring-offset-2 shadow-lg"
              >
                Book Direct &amp; Enquire
              </Link>
              <button
                type="button"
                onClick={() => setIsConciergeOpen(true)}
                className="w-full sm:w-auto px-7 py-4 bg-[#132338]/90 border border-[#C8922A]/60 text-[#FAF6EE] font-dm font-semibold text-base rounded hover:bg-[#1f3554] transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles size={18} className="text-[#C8922A]" />
                <span>Plan with Digital Concierge</span>
              </button>
            </div>

            {/* Key trust bullets under hero */}
            <div className="mt-12 pt-8 border-t border-[#FAF6EE]/10 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs font-inter text-[#FAF6EE]/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#C8922A]" /> 2-Bedroom Self-Catering Suites
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#C8922A]" /> Chobe &amp; Falls Tour Coordination
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#C8922A]" /> Reliable Wi-Fi &amp; Solar Backup
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#C8922A]" /> Corporate Invoicing &amp; Transfers
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-[#FAF6EE]/40"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      <DigitalConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
    </>
  );
}
