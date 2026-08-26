'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sparkles } from 'lucide-react';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import DigitalConciergeModal from '@/components/concierge/DigitalConciergeModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-[#0B1B2B]/95 backdrop-blur-sm shadow-lg'
            : 'bg-[#0B1B2B]/85 md:bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label={SITE_NAME}>
              <Image
                src="/logo.png"
                alt={SITE_NAME + ' logo'}
                width={44}
                height={44}
                className="object-contain drop-shadow-sm"
                priority
              />
              <div className="flex flex-col">
                <span className="font-playfair text-lg sm:text-xl font-semibold text-[#FAF6EE] group-hover:text-[#C8922A] transition-colors leading-tight">
                  {SITE_NAME}
                </span>
                <span className="text-[10px] font-dm text-[#D4A84B] tracking-wider uppercase hidden sm:block">
                  Victoria Falls
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-dm text-xs xl:text-sm text-[#FAF6EE]/80 hover:text-[#C8922A] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Action buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsConciergeOpen(true)}
                className="px-3.5 py-2 bg-[#132338] text-[#D4A84B] border border-[#C8922A]/40 font-dm font-semibold text-xs rounded hover:bg-[#1f3554] transition-colors flex items-center gap-1.5"
              >
                <Sparkles size={14} className="text-[#C8922A]" />
                <span>Trip Planner</span>
              </button>
              <Link
                href="/contact"
                className="px-4 py-2 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-xs xl:text-sm rounded hover:bg-[#D4A84B] transition-colors whitespace-nowrap"
              >
                Book Direct
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsConciergeOpen(true)}
                className="p-2 text-[#D4A84B] bg-[#132338] rounded border border-[#C8922A]/30"
                aria-label="Open Trip Planner"
              >
                <Sparkles size={18} />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-[#FAF6EE] hover:text-[#C8922A] transition-colors"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={cn(
            'lg:hidden bg-[#0B1B2B] border-t border-[#132338] transition-all duration-200 overflow-hidden',
            isMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
          )}
          aria-hidden={!isMenuOpen}
        >
          <nav className="px-4 py-4 flex flex-col gap-2" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-dm text-sm text-[#FAF6EE]/80 hover:text-[#C8922A] transition-colors py-2 border-b border-[#132338] last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsConciergeOpen(true);
                }}
                className="w-full py-2.5 bg-[#132338] text-[#D4A84B] border border-[#C8922A]/40 font-dm font-semibold text-xs rounded text-center flex items-center justify-center gap-2"
              >
                <Sparkles size={15} /> Open Digital Concierge
              </button>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-2.5 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-xs rounded text-center hover:bg-[#D4A84B] transition-colors"
              >
                Book Direct / Enquire
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Digital Concierge Modal */}
      <DigitalConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
    </>
  );
}
