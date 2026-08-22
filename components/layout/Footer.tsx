import Link from 'next/link';
import Image from 'next/image';
import { SITE_NAME, SITE_TAGLINE, CONTACT_EMAIL, CONTACT_WHATSAPP, CONTACT_ADDRESS } from '@/lib/constants';

// Internal routes use Next.js <Link>. External/protocol hrefs (mailto:, https://, tel:)
// must use a plain <a> — Next.js App Router's <Link> only accepts internal paths.
const stayLinks = [
  { label: 'Rooms', href: '/apartments' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Victoria Falls', href: '/victoria-falls' },
  { label: 'FAQ', href: '/faq' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Only render contact hrefs when the placeholder has been replaced with a real value
  const emailReady = CONTACT_EMAIL && !CONTACT_EMAIL.startsWith('[');
  const whatsappReady = CONTACT_WHATSAPP && !CONTACT_WHATSAPP.startsWith('[');

  return (
    <footer className="bg-[#0B1B2B] text-[#FAF6EE]/70 font-inter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-3 group">
              <Image
                src="/logo.png"
                alt={SITE_NAME + ' logo'}
                width={40}
                height={40}
                className="object-contain"
                unoptimized
              />
              <span className="font-playfair text-xl font-semibold text-[#FAF6EE] group-hover:text-[#C8922A] transition-colors">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#FAF6EE]/60 mb-4">
              {SITE_TAGLINE}
            </p>
            <p className="text-xs text-[#FAF6EE]/40 leading-relaxed">
              {/* [PLACEHOLDER — confirm address with client] */}
              {CONTACT_ADDRESS}
            </p>
          </div>

          {/* Stay links — internal, safe to use <Link> */}
          <div>
            <h3 className="font-dm font-semibold text-[#FAF6EE] text-sm uppercase tracking-wider mb-4">
              Stay
            </h3>
            <ul className="space-y-2">
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

          {/* Contact links — external protocols, use plain <a> */}
          <div>
            <h3 className="font-dm font-semibold text-[#FAF6EE] text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[#FAF6EE]/60 hover:text-[#C8922A] transition-colors"
                >
                  Make an Enquiry
                </Link>
              </li>
              <li>
                {emailReady ? (
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm text-[#FAF6EE]/60 hover:text-[#C8922A] transition-colors"
                  >
                    Email: {CONTACT_EMAIL}
                  </a>
                ) : (
                  <span className="text-sm text-[#FAF6EE]/30 italic">
                    {/* [PLACEHOLDER — replace CONTACT_EMAIL in lib/constants.ts] */}
                    Email: TBC
                  </span>
                )}
              </li>
              <li>
                {whatsappReady ? (
                  <a
                    href={`https://wa.me/${CONTACT_WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#FAF6EE]/60 hover:text-[#C8922A] transition-colors"
                  >
                    WhatsApp: {CONTACT_WHATSAPP}
                  </a>
                ) : (
                  <span className="text-sm text-[#FAF6EE]/30 italic">
                    {/* [PLACEHOLDER — replace CONTACT_WHATSAPP in lib/constants.ts] */}
                    WhatsApp: TBC
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#132338] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#FAF6EE]/40">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/faq" className="text-xs text-[#FAF6EE]/40 hover:text-[#C8922A] transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-xs text-[#FAF6EE]/40 hover:text-[#C8922A] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
