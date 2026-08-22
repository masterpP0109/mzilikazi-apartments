'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import OchreLine from '@/components/ui/OchreLine';
import { FAQ_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  const id = `faq-answer-${index}`;
  const headingId = `faq-heading-${index}`;

  return (
    <div className="border-b border-[#E2D9C8] last:border-0">
      <h3 id={headingId}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={id}
          className="flex w-full items-center justify-between py-5 text-left gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8922A] rounded"
        >
          <span className="font-dm font-semibold text-[#0B1B2B] text-base group-hover:text-[#C8922A] transition-colors">
            {question}
          </span>
          <ChevronDown
            size={18}
            className={cn(
              'text-[#C8922A] shrink-0 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={id}
        role="region"
        aria-labelledby={headingId}
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
        )}
      >
        <p className="font-inter text-sm text-[#4A5568] leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="bg-[#FAF6EE] py-20 lg:py-28"
      aria-label="Frequently asked questions"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionEyebrow className="mb-4">FAQ</SectionEyebrow>
          <OchreLine className="mx-auto mb-6" />
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#0B1B2B] leading-tight">
            Common questions answered.
          </h2>
        </div>

        {/* Accordion */}
        <div
          className="bg-white border border-[#E2D9C8] rounded-lg px-6"
          role="list"
          aria-label="FAQ accordion"
        >
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              index={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
