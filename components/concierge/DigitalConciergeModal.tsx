'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Sparkles,
  MessageSquare,
  Compass,
  CheckCircle2,
  ArrowRight,
  Send,
  HelpCircle,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { CONTACT_WHATSAPP } from '@/lib/constants';

interface DigitalConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSegment?: string;
}

const GUEST_TYPES = [
  { id: 'family', label: 'Family with Children', icon: '👨‍👩‍👧‍👦', desc: 'Space, kitchens, child-friendly activities' },
  { id: 'couple', label: 'Couple / Romance', icon: '✨', desc: 'Privacy, sunset cruise, helicopter flight' },
  { id: 'corporate', label: 'Corporate / Conference', icon: '💼', desc: 'Invoicing, fast Wi-Fi, quiet work space, shuttles' },
  { id: 'group', label: 'Regional / Group of Friends', icon: '👥', desc: 'Shared living, Chobe safari, adventure' },
  { id: 'adventure', label: 'Adventure Seeker', icon: '🧗‍♂️', desc: 'Rafting, bungee, gorge swing, Falls tour' },
];

const SIGNATURE_EXPERIENCES = [
  { id: 'falls-tour', name: 'Guided Tour of Victoria Falls', tag: 'Must See', price: 'Popular' },
  { id: 'chobe-day-trip', name: 'Chobe National Park Day Safari (Botswana)', tag: 'Cross-Border', price: 'Signature' },
  { id: 'village-visit', name: 'Local Village & Cultural Experience', tag: 'Culture', price: 'Authentic' },
  { id: 'sunset-cruise', name: 'Zambezi River Sunset Cruise', tag: 'Leisure', price: 'Unwind' },
  { id: 'airport-pickup', name: 'Airport Pickup & Dropoff', tag: 'Logistics', price: 'Convenient' },
  { id: 'private-chef', name: 'In-Apartment Private Chef Hire', tag: 'Dining', price: 'Special' },
  { id: 'helicopter', name: 'Helicopter Flight (Flight of Angels)', tag: 'Adventure', price: 'Spectacular' },
  { id: 'rafting', name: 'Zambezi White-Water Rafting', tag: 'Adventure', price: 'Adrenaline' },
];

const KNOWLEDGE_BASE: Record<string, string> = {
  visa: "Most visitors can obtain a tourist visa upon arrival in Zimbabwe. If you plan to visit both Zimbabwe and Zambia or take our Chobe day trip to Botswana, the KAZA Univisa ($50 USD) offers great flexibility. Check with your embassy for country-specific entry requirements.",
  currency: "US Dollars (USD) are widely accepted everywhere in Victoria Falls (cash and credit/debit cards). Bring clean, crisp USD notes printed after 2013 for best acceptance in local markets.",
  chobe: "Yes! Our Chobe Day Safari is a seamless full-day cross-border experience to Botswana. We arrange your border transfer, morning river boat safari, buffet lunch, and afternoon 4x4 game drive. A valid passport is required.",
  airport: "Victoria Falls International Airport (VFA) is approximately 20 minutes from Mzilikazi Guest Lodge. We arrange vetted drivers who meet you with a nameplate inside the arrivals hall.",
  wifi: "Yes, we provide high-speed, reliable Wi-Fi throughout the lodge and units, supported by uninterrupted solar power backup.",
  family: "Our 2-bedroom units are ideal for families. They include a private lounge, dining space, and full self-catering kitchen so you can prepare meals or snacks at your own convenience.",
  corporate: "We cater extensively to business and summit delegates with official corporate invoices, VAT receipts, quiet workspaces, high-speed Wi-Fi, and coordinated conference venue transfers.",
};

export default function DigitalConciergeModal({
  isOpen,
  onClose,
  initialSegment,
}: DigitalConciergeModalProps) {
  const [activeTab, setActiveTab] = useState<'planner' | 'qa'>('planner');
  const [step, setStep] = useState(1);
  const [guestType, setGuestType] = useState(initialSegment || 'family');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [guestsCount, setGuestsCount] = useState('2');
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([
    'falls-tour',
    'chobe-day-trip',
    'airport-pickup',
  ]);
  const [needsInvoice, setNeedsInvoice] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Q&A State
  const [questionInput, setQuestionInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: `Hello! I am your Mzilikazi Digital Concierge. I can help you understand our lodge, plan experiences like the Chobe Safari and Falls tours, or answer questions about visiting Victoria Falls. What would you like to know?`,
    },
  ]);

  const toggleExperience = (id: string) => {
    setSelectedExperiences((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAskQuestion = (presetKey?: string) => {
    const query = presetKey ? presetKey : questionInput.trim().toLowerCase();
    if (!query) return;

    const userText = presetKey
      ? presetKey === 'visa' ? 'What are the visa rules for Victoria Falls & Chobe?'
        : presetKey === 'currency' ? 'What currency is used in Victoria Falls?'
        : presetKey === 'chobe' ? 'How does the Chobe Day Trip work?'
        : presetKey === 'corporate' ? 'Can you provide a corporate invoice?'
        : presetKey === 'wifi' ? 'How reliable is the Wi-Fi and power?'
        : presetKey
      : questionInput;

    const newMessages = [...chatMessages, { sender: 'user' as const, text: userText }];

    // Match keywords
    let answer = "Thank you for asking! Our reservation team and local hosts are on hand to assist with every specific detail. You can submit a direct enquiry or message us on WhatsApp anytime for personalized support.";
    if (query.includes('visa') || query.includes('passport') || query.includes('border') || query.includes('kaza')) {
      answer = KNOWLEDGE_BASE.visa;
    } else if (query.includes('currency') || query.includes('money') || query.includes('usd') || query.includes('card') || query.includes('cash') || query.includes('pay')) {
      answer = KNOWLEDGE_BASE.currency;
    } else if (query.includes('chobe') || query.includes('botswana') || query.includes('safari') || query.includes('game drive')) {
      answer = KNOWLEDGE_BASE.chobe;
    } else if (query.includes('airport') || query.includes('transfer') || query.includes('pickup') || query.includes('flight') || query.includes('distance')) {
      answer = KNOWLEDGE_BASE.airport;
    } else if (query.includes('wifi') || query.includes('internet') || query.includes('power') || query.includes('solar') || query.includes('electricity')) {
      answer = KNOWLEDGE_BASE.wifi;
    } else if (query.includes('family') || query.includes('kid') || query.includes('children') || query.includes('bed') || query.includes('kitchen')) {
      answer = KNOWLEDGE_BASE.family;
    } else if (query.includes('corporate') || query.includes('invoice') || query.includes('company') || query.includes('conference') || query.includes('receipt')) {
      answer = KNOWLEDGE_BASE.corporate;
    }

    newMessages.push({ sender: 'bot' as const, text: answer });
    setChatMessages(newMessages);
    setQuestionInput('');
  };

  const getWhatsAppMessage = () => {
    const selectedNames = SIGNATURE_EXPERIENCES.filter((exp) =>
      selectedExperiences.includes(exp.id)
    ).map((exp) => exp.name);

    const message = `Hello Mzilikazi Team,\n\nI used the Digital Concierge on your website to plan my Victoria Falls stay:\n` +
      `• Guest Type: ${GUEST_TYPES.find((g) => g.id === guestType)?.label || guestType}\n` +
      `• Guests: ${guestsCount}\n` +
      `• Dates: ${arrivalDate || 'Flexible'} to ${departureDate || 'Flexible'}\n` +
      `• Experiences of Interest:\n  - ${selectedNames.join('\n  - ') || 'Accommodation only'}\n` +
      (needsInvoice ? `• Corporate Invoicing Requested: Yes\n` : '') +
      (customNotes ? `• Notes: ${customNotes}\n` : '') +
      `\nPlease let me know availability and rate confirmation. Thank you!`;

    return encodeURIComponent(message);
  };

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const selectedNames = SIGNATURE_EXPERIENCES.filter((exp) =>
        selectedExperiences.includes(exp.id)
      ).map((exp) => exp.name);

      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: guestName || 'Website Guest',
          email: guestEmail,
          phone: guestPhone || undefined,
          arrivalDate: arrivalDate || new Date().toISOString().split('T')[0],
          departureDate: departureDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
          guests: parseInt(guestsCount, 10) || 2,
          apartmentPreference: `Digital Concierge: ${guestType}`,
          message: `[DIGITAL CONCIERGE TRIP PLAN]\nType: ${guestType}\nExperiences: ${selectedNames.join(', ')}\nCorporate Invoice: ${needsInvoice ? 'Yes' : 'No'}\nNotes: ${customNotes}`,
        }),
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0B1B2B]/80 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative z-10 w-full max-w-2xl bg-[#0B1B2B] border border-[#C8922A]/40 rounded-xl shadow-2xl overflow-hidden text-[#FAF6EE] max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="concierge-title"
      >
        {/* Header bar */}
        <div className="p-5 sm:p-6 bg-[#132338] border-b border-[#0B1B2B] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C8922A]/20 rounded-lg text-[#C8922A]">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 id="concierge-title" className="font-playfair text-xl font-bold text-[#FAF6EE]">
                Mzilikazi Digital Concierge
              </h2>
              <p className="font-inter text-xs text-[#FAF6EE]/60">
                Plan your stay, coordinate experiences & get instant answers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#FAF6EE]/60 hover:text-[#FAF6EE] hover:bg-[#0B1B2B] rounded-lg transition-colors"
            aria-label="Close concierge"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#132338] bg-[#0B1B2B]">
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex-1 py-3 px-4 font-dm text-xs uppercase tracking-wider font-semibold text-center transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'planner'
                ? 'bg-[#132338] text-[#C8922A] border-b-2 border-[#C8922A]'
                : 'text-[#FAF6EE]/60 hover:text-[#FAF6EE]'
            }`}
          >
            <Compass size={15} />
            Interactive Trip Planner
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={`flex-1 py-3 px-4 font-dm text-xs uppercase tracking-wider font-semibold text-center transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'qa'
                ? 'bg-[#132338] text-[#C8922A] border-b-2 border-[#C8922A]'
                : 'text-[#FAF6EE]/60 hover:text-[#FAF6EE]'
            }`}
          >
            <HelpCircle size={15} />
            Instant Destination Guidance
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#0B1B2B]">
          {activeTab === 'planner' ? (
            <div>
              {isSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-[#C8922A]/20 text-[#C8922A] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-[#FAF6EE]">
                    Trip Plan Received!
                  </h3>
                  <p className="font-inter text-sm text-[#FAF6EE]/70 max-w-md mx-auto leading-relaxed">
                    Thank you! Our local reservations team is reviewing your requested dates and experiences. We will respond within 24 hours with exact availability, room configuration, and rate details.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/${CONTACT_WHATSAPP}?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-[#0B1B2B] font-dm font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <MessageSquare size={16} /> Open in WhatsApp
                    </a>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-[#132338] text-[#FAF6EE] font-dm text-sm rounded-lg hover:bg-[#1f3554] transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Step indicators */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#132338]">
                    {[
                      { num: 1, label: 'Guest Type' },
                      { num: 2, label: 'Dates & Size' },
                      { num: 3, label: 'Experiences' },
                      { num: 4, label: 'Confirm' },
                    ].map((s) => (
                      <div
                        key={s.num}
                        className={`flex items-center gap-2 text-xs font-dm ${
                          step === s.num
                            ? 'text-[#C8922A] font-bold'
                            : step > s.num
                            ? 'text-[#FAF6EE]'
                            : 'text-[#FAF6EE]/30'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                            step === s.num
                              ? 'bg-[#C8922A] text-[#0B1B2B] font-bold'
                              : step > s.num
                              ? 'bg-[#132338] text-[#C8922A]'
                              : 'bg-[#132338] text-[#FAF6EE]/40'
                          }`}
                        >
                          {s.num}
                        </span>
                        <span className="hidden sm:inline">{s.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Step 1: Guest Persona */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                      <p className="font-dm text-xs uppercase tracking-widest text-[#C8922A] mb-1">
                        Step 1 of 4
                      </p>
                      <h3 className="font-playfair text-xl font-bold text-[#FAF6EE] mb-4">
                        Who is travelling to Victoria Falls?
                      </h3>
                      <div className="space-y-3">
                        {GUEST_TYPES.map((g) => (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => {
                              setGuestType(g.id);
                              if (g.id === 'corporate') setNeedsInvoice(true);
                            }}
                            className={`w-full p-3.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                              guestType === g.id
                                ? 'bg-[#132338] border-[#C8922A] shadow-md ring-1 ring-[#C8922A]'
                                : 'bg-[#0B1B2B] border-[#132338] hover:border-[#C8922A]/50 text-[#FAF6EE]/80'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{g.icon}</span>
                              <div>
                                <p className="font-dm font-semibold text-sm text-[#FAF6EE]">
                                  {g.label}
                                </p>
                                <p className="font-inter text-xs text-[#FAF6EE]/60">
                                  {g.desc}
                                </p>
                              </div>
                            </div>
                            {guestType === g.id && (
                              <CheckCircle2 size={18} className="text-[#C8922A] shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="mt-6 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-6 py-3 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded-lg hover:bg-[#D4A84B] transition-colors flex items-center gap-2"
                        >
                          Continue to Dates <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Dates & Group Size */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                      <p className="font-dm text-xs uppercase tracking-widest text-[#C8922A] mb-1">
                        Step 2 of 4
                      </p>
                      <h3 className="font-playfair text-xl font-bold text-[#FAF6EE] mb-4">
                        When are you visiting?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block font-dm text-xs text-[#FAF6EE]/80 mb-1">
                            Estimated Arrival Date
                          </label>
                          <input
                            type="date"
                            value={arrivalDate}
                            onChange={(e) => setArrivalDate(e.target.value)}
                            className="w-full bg-[#132338] border border-[#0B1B2B] rounded-lg px-3.5 py-2.5 text-sm text-[#FAF6EE] focus:outline-none focus:border-[#C8922A]"
                          />
                        </div>
                        <div>
                          <label className="block font-dm text-xs text-[#FAF6EE]/80 mb-1">
                            Estimated Departure Date
                          </label>
                          <input
                            type="date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            className="w-full bg-[#132338] border border-[#0B1B2B] rounded-lg px-3.5 py-2.5 text-sm text-[#FAF6EE] focus:outline-none focus:border-[#C8922A]"
                          />
                        </div>
                      </div>

                      <div className="mb-5">
                        <label className="block font-dm text-xs text-[#FAF6EE]/80 mb-1">
                          Total Number of Guests
                        </label>
                        <select
                          value={guestsCount}
                          onChange={(e) => setGuestsCount(e.target.value)}
                          className="w-full bg-[#132338] border border-[#0B1B2B] rounded-lg px-3.5 py-2.5 text-sm text-[#FAF6EE] focus:outline-none focus:border-[#C8922A]"
                        >
                          <option value="1">1 Guest (Solo / Executive)</option>
                          <option value="2">2 Guests (Couple / Pair)</option>
                          <option value="3">3 Guests (Small Family / Friends)</option>
                          <option value="4">4 Guests (Family Suite Unit)</option>
                          <option value="5">5–6 Guests (Multiple Units / Group)</option>
                          <option value="8">7+ Guests (Delegation / Extended Group)</option>
                        </select>
                      </div>

                      {guestType === 'corporate' && (
                        <div className="p-3 bg-[#132338] rounded-lg border border-[#C8922A]/30 flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-[#C8922A]" />
                            <span className="font-dm text-xs text-[#FAF6EE]">
                              Require Official Company Invoice / VAT Receipt?
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            checked={needsInvoice}
                            onChange={(e) => setNeedsInvoice(e.target.checked)}
                            className="w-4 h-4 accent-[#C8922A]"
                          />
                        </div>
                      )}

                      <div className="mt-6 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-4 py-2.5 text-sm text-[#FAF6EE]/60 hover:text-[#FAF6EE] transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="px-6 py-3 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded-lg hover:bg-[#D4A84B] transition-colors flex items-center gap-2"
                        >
                          Choose Experiences <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Experiences */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                      <p className="font-dm text-xs uppercase tracking-widest text-[#C8922A] mb-1">
                        Step 3 of 4
                      </p>
                      <h3 className="font-playfair text-xl font-bold text-[#FAF6EE] mb-2">
                        Which experiences would you like us to arrange?
                      </h3>
                      <p className="font-inter text-xs text-[#FAF6EE]/60 mb-4">
                        Select any you are interested in. We connect you seamlessly with trusted, vetted operators.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto p-1">
                        {SIGNATURE_EXPERIENCES.map((exp) => {
                          const isSelected = selectedExperiences.includes(exp.id);
                          return (
                            <button
                              key={exp.id}
                              type="button"
                              onClick={() => toggleExperience(exp.id)}
                              className={`p-3 rounded-lg border text-left flex items-start justify-between transition-all ${
                                isSelected
                                  ? 'bg-[#132338] border-[#C8922A] text-[#FAF6EE]'
                                  : 'bg-[#0B1B2B] border-[#132338] text-[#FAF6EE]/60 hover:border-[#FAF6EE]/20'
                              }`}
                            >
                              <div className="pr-2">
                                <span className="inline-block px-1.5 py-0.5 text-[9px] font-dm font-semibold uppercase tracking-wider bg-[#0B1B2B] text-[#C8922A] rounded mb-1">
                                  {exp.tag}
                                </span>
                                <p className="font-dm text-xs font-semibold text-[#FAF6EE] leading-snug">
                                  {exp.name}
                                </p>
                              </div>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                readOnly
                                className="mt-1 w-4 h-4 accent-[#C8922A]"
                              />
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-6 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-4 py-2.5 text-sm text-[#FAF6EE]/60 hover:text-[#FAF6EE] transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(4)}
                          className="px-6 py-3 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded-lg hover:bg-[#D4A84B] transition-colors flex items-center gap-2"
                        >
                          Review &amp; Enquire <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Final review & submission */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                      <p className="font-dm text-xs uppercase tracking-widest text-[#C8922A] mb-1">
                        Step 4 of 4
                      </p>
                      <h3 className="font-playfair text-xl font-bold text-[#FAF6EE] mb-4">
                        Your Tailored Victoria Falls Home Base Plan
                      </h3>

                      {/* Summary Box */}
                      <div className="p-4 bg-[#132338] rounded-lg border border-[#0B1B2B] space-y-2 text-xs mb-5">
                        <div className="flex justify-between border-b border-[#0B1B2B] pb-2">
                          <span className="text-[#FAF6EE]/60">Guest Profile:</span>
                          <span className="font-dm font-semibold text-[#C8922A]">
                            {GUEST_TYPES.find((g) => g.id === guestType)?.label} ({guestsCount} guests)
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-[#0B1B2B] pb-2">
                          <span className="text-[#FAF6EE]/60">Dates:</span>
                          <span className="font-dm font-semibold text-[#FAF6EE]">
                            {arrivalDate || 'Flexible'} → {departureDate || 'Flexible'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#FAF6EE]/60 block mb-1">Selected Experiences:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedExperiences.length > 0 ? (
                              SIGNATURE_EXPERIENCES.filter((exp) =>
                                selectedExperiences.includes(exp.id)
                              ).map((exp) => (
                                <span
                                  key={exp.id}
                                  className="px-2 py-0.5 bg-[#0B1B2B] text-[#C8922A] rounded text-[11px]"
                                >
                                  {exp.name}
                                </span>
                              ))
                            ) : (
                              <span className="text-[#FAF6EE]/40 italic">Accommodation only</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Contact Fields for Direct Submit */}
                      <form onSubmit={handleDirectSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-dm text-xs text-[#FAF6EE]/80 mb-1">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              placeholder="e.g. Sarah Jenkins"
                              className="w-full bg-[#132338] border border-[#0B1B2B] rounded-lg px-3 py-2 text-sm text-[#FAF6EE] focus:outline-none focus:border-[#C8922A]"
                            />
                          </div>
                          <div>
                            <label className="block font-dm text-xs text-[#FAF6EE]/80 mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={guestEmail}
                              onChange={(e) => setGuestEmail(e.target.value)}
                              placeholder="sarah@example.com"
                              className="w-full bg-[#132338] border border-[#0B1B2B] rounded-lg px-3 py-2 text-sm text-[#FAF6EE] focus:outline-none focus:border-[#C8922A]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-dm text-xs text-[#FAF6EE]/80 mb-1">
                            WhatsApp / Phone (optional for quick confirmation)
                          </label>
                          <input
                            type="tel"
                            value={guestPhone}
                            onChange={(e) => setGuestPhone(e.target.value)}
                            placeholder="+263..."
                            className="w-full bg-[#132338] border border-[#0B1B2B] rounded-lg px-3 py-2 text-sm text-[#FAF6EE] focus:outline-none focus:border-[#C8922A]"
                          />
                        </div>

                        <div>
                          <label className="block font-dm text-xs text-[#FAF6EE]/80 mb-1">
                            Additional notes or special requests (flight times, children ages, dietary)
                          </label>
                          <textarea
                            rows={2}
                            value={customNotes}
                            onChange={(e) => setCustomNotes(e.target.value)}
                            placeholder="Any specific requests..."
                            className="w-full bg-[#132338] border border-[#0B1B2B] rounded-lg px-3 py-2 text-sm text-[#FAF6EE] focus:outline-none focus:border-[#C8922A]"
                          />
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-3 px-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-sm rounded-lg hover:bg-[#D4A84B] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            <Send size={16} />
                            {isSubmitting ? 'Submitting...' : 'Send Enquiry to Lodge'}
                          </button>
                          <a
                            href={`https://wa.me/263770000000?text=${getWhatsAppMessage()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-4 bg-[#25D366] text-[#0B1B2B] font-dm font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                          >
                            <MessageSquare size={16} /> Priority WhatsApp
                          </a>
                        </div>
                      </form>

                      <div className="mt-4 text-center">
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="text-xs text-[#FAF6EE]/50 hover:text-[#FAF6EE] transition-colors"
                        >
                          ← Change selected experiences
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          ) : (
            /* Tab 2: Destination Knowledge Q&A */
            <div className="flex flex-col h-full min-h-[380px]">
              {/* Preset prompt pills */}
              <div className="mb-4">
                <p className="font-dm text-xs text-[#FAF6EE]/60 mb-2">Common Quick Questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { key: 'chobe', label: 'Chobe Day Safari 🐘' },
                    { key: 'visa', label: 'Visas & KAZA Univisa 🛂' },
                    { key: 'currency', label: 'Currency (USD) 💵' },
                    { key: 'airport', label: 'Airport Transfers ✈️' },
                    { key: 'corporate', label: 'Corporate Invoicing 💼' },
                    { key: 'wifi', label: 'Wi-Fi & Solar Power ⚡' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleAskQuestion(item.key)}
                      className="px-2.5 py-1 bg-[#132338] border border-[#0B1B2B] hover:border-[#C8922A] text-xs text-[#FAF6EE] rounded-full transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat history */}
              <div className="flex-1 space-y-3 overflow-y-auto p-3 bg-[#132338]/60 rounded-lg border border-[#0B1B2B] max-h-72 mb-4">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-[#C8922A] text-[#0B1B2B] flex items-center justify-center text-xs shrink-0 mt-0.5">
                        <Sparkles size={12} />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg text-xs leading-relaxed max-w-[85%] ${
                        msg.sender === 'user'
                          ? 'bg-[#C8922A] text-[#0B1B2B] font-dm'
                          : 'bg-[#0B1B2B] text-[#FAF6EE] border border-[#132338]'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAskQuestion();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  placeholder="Ask anything about visiting Victoria Falls or Mzilikazi..."
                  className="flex-1 bg-[#132338] border border-[#0B1B2B] rounded-lg px-3.5 py-2.5 text-xs text-[#FAF6EE] focus:outline-none focus:border-[#C8922A]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#C8922A] text-[#0B1B2B] rounded-lg text-xs font-dm font-semibold hover:bg-[#D4A84B] transition-colors flex items-center gap-1.5"
                >
                  <Send size={14} /> Ask
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="px-6 py-3 bg-[#132338] border-t border-[#0B1B2B] flex items-center justify-between text-[11px] text-[#FAF6EE]/50">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[#C8922A]" />
            <span>Guaranteed human review by Victoria Falls local hosts</span>
          </div>
          <span>Direct Bookings &amp; Priority Assistance</span>
        </div>
      </motion.div>
    </div>
  );
}
