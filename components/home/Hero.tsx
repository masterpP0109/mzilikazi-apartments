'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1B2B]"
      aria-label="Hero"
    >
      {/* Background — African lodge / house exterior */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=85"
          alt="Luxury African lodge exterior at dusk"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-[#0B1B2B]/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <Image
              src="/logo.png"
              alt="Mzilikazi Rooms logo"
              width={160}
              height={160}
              className="object-contain drop-shadow-[0_0_40px_rgba(200,146,42,0.35)]"
              priority
            />
          </motion.div>

          {/* Eyebrow */}
          <p className="font-dm text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A84B] mb-6">
            Victoria Falls, Zimbabwe
          </p>

          {/* H1 */}
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FAF6EE] leading-tight mb-6">
            Come for the Falls.{' '}
            <span className="text-[#C8922A]">Stay somewhere worth coming home to.</span>
          </h1>

          {/* Sub */}
          <p className="font-inter text-lg sm:text-xl text-[#FAF6EE]/80 max-w-2xl mx-auto leading-relaxed mb-10">
            Experience Victoria Falls at your own pace — with the space to settle in, comfort to return to, and a team ready to help make your visit easier.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-base rounded hover:bg-[#D4A84B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8922A] focus-visible:ring-offset-2"
            >
              Book Your Stay
            </Link>
            <Link
              href="/apartments"
              className="px-8 py-4 bg-transparent border-2 border-[#FAF6EE] text-[#FAF6EE] font-dm font-semibold text-base rounded hover:bg-[#FAF6EE] hover:text-[#0B1B2B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6EE] focus-visible:ring-offset-2"
            >
              Explore the Rooms
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#FAF6EE]/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
