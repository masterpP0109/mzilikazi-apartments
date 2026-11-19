import type { NavLink } from "@/types";
export const SITE_NAME = "Mzilikazi Apartments";
export const SITE_LOGO = {
  src: "/mzilikazi%20imgs/mzilikazi-img/logo/mzilikazi-logo-transparent.webp",
  width: 1000,
  height: 960,
};
export const SITE_OG_IMAGE = {
  src: "/og-image.png",
  width: 1200,
  height: 630,
};
export const SITE_TAGLINE =
  "Come for the Falls. Stay somewhere worth coming home to.";
export const BRAND_PROMISE = "Victoria Falls outside. Home when you return.";
export const BRAND_SUBTITLE =
  "A comfortable, spacious home base in Victoria Falls — with local hospitality and everything you need for a relaxed stay.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mzilikaziapartments.com";
// Only supply these environment variables once client-confirmed.
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@mzilikaziapartments.com";
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
  { label: "Home", href: "/" },
  { label: "Apartments", href: "/apartments" },
  { label: "Experiences", href: "/experiences" },
  { label: "Transfers", href: "/transfers" },
  { label: "About Us", href: "/our-story" },
  { label: "Contact", href: "/contact" },
];
export const FAQ_ITEMS = [
  {
    question: "How do I check availability and book?",
    answer:
      "Send your arrival and departure dates, guest count, and apartment preference using the enquiry form. Our team will confirm availability, current rates, and booking terms before you confirm your stay.",
  },
  {
    question: "Can I book for a family or group?",
    answer:
      "Yes. Children are welcome when accompanied by an adult, and each two-bedroom apartment accommodates up to four guests. Share the number of adults and children and any sleeping preferences in your enquiry.",
  },
  {
    question: "What are the check-in and check-out times?",
    answer: "Check-in is from 2 PM and check-out is by 11 AM.",
  },
  {
    question: "What is included in the rate and how can I pay?",
    answer:
      "Each two-bedroom apartment is US$130 per night for up to four guests, including Wi-Fi, air conditioning, a fully equipped kitchen, washing machine, and a cleaner provided for your stay. We accept Mastercard, EcoCash, and cash.",
  },
  {
    question: "Can you help arrange airport transfers and activities?",
    answer:
      "Yes. You can add airport transfer requests or local experience interests to your enquiry or trip plan, and our team will share current options and pricing separately.",
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
