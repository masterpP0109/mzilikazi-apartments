import type { NavLink } from "@/types";
export const SITE_NAME = "Mzilikazi Guest Lodge";
export const SITE_LOGO = {
  src: "/mzilikazi%20imgs/mzilikazi-logo.webp",
  width: 400,
  height: 300,
};
export const SITE_TAGLINE =
  "Come for the Falls. Stay somewhere worth coming home to.";
export const BRAND_PROMISE = "Victoria Falls outside. Home when you return.";
export const BRAND_SUBTITLE =
  "A comfortable base for your Victoria Falls stay.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mzilikazi-apartments.vercel.app";
// Only supply these environment variables once client-confirmed.
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || null;
export const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE || null;
export const CONTACT_WHATSAPP =
  process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || null;
export const CONTACT_ADDRESS = null;
export const CHECK_IN_TIME = "2 PM";
export const CHECK_OUT_TIME = "11 AM";
export const DISTANCE_TO_FALLS = null;
export const FOUNDING_YEAR = null;
export function whatsappUrl(message = "") {
  const digits = CONTACT_WHATSAPP?.replace(/[^0-9]/g, "");
  return digits && /^[1-9]\d{7,14}$/.test(digits) && digits !== "263770000000"
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : null;
}
export const NAV_LINKS: NavLink[] = [
  { label: "Stay", href: "/apartments" },
  { label: "Experience", href: "/experiences" },
  { label: "Victoria Falls", href: "/victoria-falls" },
  { label: "Plan", href: "/plan" },
  { label: "Our Story", href: "/our-story" },
];
export const FAQ_ITEMS = [
  {
    question: "How do I check availability?",
    answer:
      "Send your arrival and departure dates, guest count and any preferences using the enquiry form. Availability and rates need to be confirmed before you book.",
  },
  {
    question: "Can I ask about a family or group stay?",
    answer:
      "Yes. Children are welcome when accompanied by an adult. Each apartment sleeps up to four people. Include the number of adults and children, any sleeping-arrangement preferences and your dates so the enquiry can cover your whole group.",
  },
  {
    question: "What are the check-in and check-out times?",
    answer: "Check-in is at 2 PM and check-out is at 11 AM.",
  },
  {
    question: "Where can I find current rates and policies?",
    answer:
      "Each apartment is US$130 per night and sleeps up to four people in two bedrooms. We accept Mastercard, EcoCash and cash. Ask about payment terms, cancellation conditions and arrival arrangements when booking.",
  },
  {
    question: "Can I include questions about activities?",
    answer:
      "You can add your interests and planning questions to your enquiry. Ask for current options, prices and inclusions; activities are not included or reserved by submitting this form.",
  },
];
export const BRAND_PILLARS: {
  code: string;
  title: string;
  subtitle: string;
  description: string;
}[] = [];
export const TRUST_PILLARS: {
  icon: string;
  title: string;
  description: string;
}[] = [];
export const DIRECT_BOOKING_BENEFITS: { title: string; description: string }[] =
  [];
export const OFFER_TILES: {
  icon: string;
  title: string;
  description: string;
}[] = [];
export const LOCAL_SERVICES: {
  id: string;
  icon: string;
  category: string;
  isSignature: boolean;
  title: string;
  tagline: string;
  body: string;
  benefit: string;
  icon_bg: string;
  pageHref?: string;
  ctaLabel: string;
  ctaHref: string;
}[] = [];
export const SERVICE_CATEGORIES = [{ id: "all", label: "All experiences" }];
