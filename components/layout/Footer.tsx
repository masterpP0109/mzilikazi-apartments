import Link from 'next/link';
import Image from 'next/image';
import {
  SITE_NAME,
  SITE_TAGLINE,
  BRAND_PROMISE,
  CONTACT_EMAIL,
  CONTACT_WHATSAPP,
  CONTACT_ADDRESS,
} from '@/lib/constants';

const stayLinks = [
  { label: 'Rooms & Suites', href: '/apartments' },
  { label: 'Families & Groups', href: '/family-group-accommodation-victoria-falls' },
  { label: 'Corporate & Conference Stays', href: '/corporate-stays-victoria-falls' },
  { label: 'FAQ', href: '/faq' },
];

const experienceLinks = [
  { label: 'Chobe Day Safari (Botswana)', href: '/experiences/chobe-day-trip' },
  { label: 'Village & Cultural Visit', href: '/experiences/village-cultural-visit' },
  { label: 'Guided Victoria Falls Tour', href: '/experiences/victoria-falls-tour' },
  { label: 'All Curated Experiences', href: '/experiences' },
  { label: 'Victoria Falls Guide', href: '/victoria-falls' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1B2B] text-[#FAF6EE]/70 font-inter border-t border-[#132338]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-3 group">
              <Image
                src="/logo.png"
                alt={SITE_NAME + ' logo'}
                width={44}
                height={44}
                className="object-contain"
                unoptimized
              />
              <span className="font-playfair text-xl font-semibold text-[#FAF6EE] group-hover:text-[#C8922A] transition-colors">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-sm font-dm text-[#D4A84B] mb-2 font-medium">
              {SITE_TAGLINE}
            </p>
            <p className="text-xs leading-relaxed text-[#FAF6EE]/60 mb-4">
              {BRAND_PROMISE} Comfortable accommodation, local trip planning, and responsive support.
            </p>
            <p className="text-xs text-[#FAF6EE]/40 leading-relaxed">
              {CONTACT_ADDRESS}
            </p>
          </div>

          {/* Stay Links */}
          <div>
            <h3 className="font-dm font-semibold text-[#FAF6EE] text-xs uppercase tracking-wider mb-4 text-[#D4A84B]">
              Accommodation
            </h3>
            <ul className="space-y-2.5">
              {stayLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#FAF6EE]/60 hover:text-[#C8922A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience Links */}
          <div>
            <h3 className="font-dm font-semibold text-[#FAF6EE] text-xs uppercase tracking-wider mb-4 text-[#D4A84B]">
              Experiences &amp; Safaris
            </h3>
            <ul className="space-y-2.5">
              {experienceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#FAF6EE]/60 hover:text-[#C8922A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Booking */}
          <div>
            <h3 className="font-dm font-semibold text-[#FAF6EE] text-xs uppercase tracking-wider mb-4 text-[#D4A84B]">
              Direct Reservations
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-[#FAF6EE]/80 hover:text-[#C8922A] transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>Make an Enquiry / Direct Quote</span>
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[#FAF6EE]/60 hover:text-[#C8922A] transition-colors text-xs"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT_WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline transition-colors text-xs flex items-center gap-1"
                >
                  <span>Priority WhatsApp: {CONTACT_WHATSAPP}</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="inline-block px-3 py-1.5 bg-[#132338] border border-[#0B1B2B] rounded text-[11px] text-[#FAF6EE]/70">
                  ⚡ Always-on Digital Concierge Available
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#132338] flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6EE]/40 gap-4">
          <p>
            &copy; {currentYear} {SITE_NAME}. All rights reserved. Victoria Falls, Zimbabwe.
          </p>
          <div className="flex gap-6">
            <Link href="/apartments" className="hover:text-[#C8922A] transition-colors">
              Rooms &amp; Suites
            </Link>
            <Link href="/corporate-stays-victoria-falls" className="hover:text-[#C8922A] transition-colors">
              Corporate
            </Link>
            <Link href="/faq" className="hover:text-[#C8922A] transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-[#C8922A] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
