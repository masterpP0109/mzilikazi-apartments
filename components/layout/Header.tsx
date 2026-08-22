'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#0B1B2B]/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label={SITE_NAME}>
            <Image
              src="/logo.png"
              alt={SITE_NAME + ' logo'}
              width={48}
              height={48}
              className="object-contain drop-shadow-sm"
              priority
            />
            <span className="font-playfair text-xl font-semibold text-[#FAF6EE] group-hover:text-[#C8922A] transition-colors">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-dm text-sm text-[#FAF6EE]/80 hover:text-[#C8922A] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 px-5 py-2.5 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded hover:bg-[#D4A84B] transition-colors"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#FAF6EE] hover:text-[#C8922A] transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden bg-[#0B1B2B] border-t border-[#132338] transition-all duration-200 overflow-hidden',
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!isMenuOpen}
      >
        <nav className="px-4 py-4 flex flex-col gap-3" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-dm text-base text-[#FAF6EE]/80 hover:text-[#C8922A] transition-colors py-2 border-b border-[#132338] last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 px-5 py-3 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded text-center hover:bg-[#D4A84B] transition-colors"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
