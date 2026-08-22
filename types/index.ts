// ─── Shared TypeScript types ───────────────────────────────────────────────────

// ── Apartment ──────────────────────────────────────────────────────────────────
export interface Apartment {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  guestProfile: string;
  capacity: number;
  bedrooms: number;
  beds: number;
  amenities: string[];
  gallery: SanityImage[];
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  /** [PLACEHOLDER — confirm with client] */
  pricePerNight?: number;
  currency?: string;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

// ── Testimonial ────────────────────────────────────────────────────────────────
export interface Testimonial {
  _id: string;
  quote: string;
  guestName: string;
  /** [PLACEHOLDER — confirm with client] */
  guestOrigin?: string;
  /** e.g. "Google", "Booking.com", "Airbnb", "Direct" */
  platform?: string;
  verified: boolean;
  /** 1–5 [PLACEHOLDER — confirm with client] */
  rating?: number;
  apartmentStayed?: string;
  date?: string;
}

// ── FAQ ────────────────────────────────────────────────────────────────────────
export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

// ── Experience tile ────────────────────────────────────────────────────────────
export interface ExperienceTile {
  _id: string;
  title: string;
  description: string;
  image?: SanityImage;
  category?: string;
}

// ── Site settings ──────────────────────────────────────────────────────────────
export interface SiteSettings {
  siteName: string;
  tagline: string;
  /** [PLACEHOLDER — confirm with client] */
  address?: string;
  /** [PLACEHOLDER — confirm with client] */
  phone?: string;
  /** [PLACEHOLDER — confirm with client] */
  email?: string;
  /** [PLACEHOLDER — confirm with client] */
  whatsapp?: string;
  /** [PLACEHOLDER — confirm with client] */
  checkIn?: string;
  /** [PLACEHOLDER — confirm with client] */
  checkOut?: string;
  heroHeadline?: string;
  heroSubheading?: string;
}

// ── Sanity image ───────────────────────────────────────────────────────────────
export interface SanityImage {
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

// ── Enquiry form ───────────────────────────────────────────────────────────────
export interface EnquiryFormData {
  name: string;
  email: string;
  phone?: string;
  arrivalDate: string;
  departureDate: string;
  guests: number;
  message?: string;
  apartmentPreference?: string;
}

// ── Nav link ───────────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ── Guest segment ──────────────────────────────────────────────────────────────
export interface GuestSegment {
  icon: string;
  label: string;
  description: string;
}
