// Sanity-specific types matching the schema definitions
export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
      aspectRatio: number;
    };
  };
}

export interface SanityImageWithAsset {
  alt?: string;
  caption?: string;
  asset: SanityImageAsset;
}

export interface SanityApartment {
  _id: string;
  slug: { current: string };
  name: string;
  tagline: string;
  guestProfile: string;
  capacity: number;
  bedrooms: number;
  beds: number;
  amenities: string[];
  gallery: SanityImageWithAsset[];
  shortDescription: string;
  longDescription?: string;
  highlights: string[];
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SanityTestimonial {
  _id: string;
  quote: string;
  guestName: string;
  guestOrigin?: string;
  platform?: string;
  verified: boolean;
  rating?: number;
  apartmentStayed?: string;
  date?: string;
}

export interface SanityFAQ {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

export interface SanityExperience {
  _id: string;
  title: string;
  description: string;
  category?: string;
  image?: SanityImageWithAsset;
}

export interface SanitySiteSettings {
  siteName: string;
  tagline: string;
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  checkIn?: string;
  checkOut?: string;
  heroHeadline?: string;
  heroSubheading?: string;
}
