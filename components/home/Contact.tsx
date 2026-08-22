import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { Mail, MessageSquare, Clock } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_WHATSAPP, CHECK_IN_TIME, CHECK_OUT_TIME } from '@/lib/constants';

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#FAF6EE] py-20 lg:py-28"
      aria-label="Contact and enquiry"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: copy + trust */}
          <div>
            <SectionEyebrow className="mb-4">Get in Touch</SectionEyebrow>
            <OchreLine className="mb-6" />
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#0B1B2B] leading-tight mb-4">
              Ready to plan your stay?
            </h2>
            <p className="font-inter text-[#4A5568] text-base leading-relaxed mb-8">
              Send us an enquiry and we'll come back to you within 24 hours with availability and next steps. No commitment required.
            </p>

            {/* What happens next */}
            <div className="bg-white border border-[#E2D9C8] rounded-lg p-6 mb-8">
              <h3 className="font-dm font-semibold text-[#0B1B2B] text-sm uppercase tracking-wider mb-4">
                What happens after you enquire
              </h3>
              <ol className="space-y-3">
                {[
                  'We receive your enquiry and check availability.',
                  'We respond within 24 hours with availability and rates.',
                  'You confirm your dates and we guide you through the booking.',
                  'You receive a confirmation and all the arrival details you need.',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 font-inter text-sm text-[#4A5568]">
                    <span className="font-dm font-bold text-[#C8922A] shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 font-inter text-sm text-[#4A5568] hover:text-[#C8922A] transition-colors"
              >
                <Mail size={15} className="text-[#C8922A]" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={`https://wa.me/${CONTACT_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-inter text-sm text-[#4A5568] hover:text-[#C8922A] transition-colors"
              >
                <MessageSquare size={15} className="text-[#C8922A]" aria-hidden="true" />
                WhatsApp: {CONTACT_WHATSAPP}
              </a>
              <div className="flex items-center gap-3 font-inter text-sm text-[#4A5568]">
                <Clock size={15} className="text-[#C8922A]" aria-hidden="true" />
                Check-in {CHECK_IN_TIME} · Check-out {CHECK_OUT_TIME}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
