// Public data only. Populate nullable fields after client verification (CONTENT_GAPS.md).
export interface PropertyMedia {
  src: string;
  alt: string;
  kind: "property" | "destination" | "development";
  verified: boolean;
  position?: string;
}
export interface Accommodation {
  slug: string;
  aliases: string[];
  confirmed: boolean;
  name: string | null;
  description: string | null;
  about: string | null;
  guests: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  facilities: {
    kitchen: boolean | null;
    lounge: boolean | null;
    wifi: boolean | null;
    airConditioning: boolean | null;
    parking: boolean | null;
    outdoor: string | null;
  };
  included: string[];
  walkthrough: {
    title: string;
    description: string | null;
    media: PropertyMedia | null;
  }[];
  sleeping: string[];
  amenities: string[];
  kitchen: string[];
  idealFor: string[];
  rate: string | null;
  policies: { label: string; value: string }[];
  gallery: PropertyMedia[];
}
const pending = (slug: string, alias: string): Accommodation => ({
  slug,
  aliases: [alias],
  confirmed: false,
  name: null,
  description: null,
  about: null,
  guests: null,
  bedrooms: null,
  bathrooms: null,
  facilities: {
    kitchen: null,
    lounge: null,
    wifi: null,
    airConditioning: null,
    parking: null,
    outdoor: null,
  },
  included: [],
  walkthrough: [
    "Living Area",
    "Kitchen",
    "Bedrooms",
    "Bathrooms",
    "Outdoor Area",
  ].map((title) => ({ title, description: null, media: null })),
  sleeping: [],
  amenities: [],
  kitchen: [],
  idealFor: [],
  rate: null,
  policies: [],
  gallery: [],
});
export const accommodations: Accommodation[] = [
  pending("zambezi-suite", "apartment-one"),
  pending("family-suite", "apartment-two"),
  pending("batoka-suite", "apartment-three"),
];

// Use supplied public images as sample content so the site shows real
// photography while editorial content is being collected.
accommodations[0].confirmed = true;
accommodations[0].name = "Zambezi Suite";
accommodations[0].description = "A comfortable two-bedroom suite with garden views.";
accommodations[0].gallery = [];

accommodations[1].confirmed = true;
accommodations[1].name = "Family Suite";
accommodations[1].description = "Spacious family layout with two bedrooms and a shared lounge.";
accommodations[1].gallery = [];

accommodations[2].confirmed = true;
accommodations[2].name = "Batoka Suite";
accommodations[2].description = "Bright suite with private outdoor space.";
accommodations[2].gallery = [];
// Apartment details supplied by the property owner.
for (const apartment of accommodations) {
  apartment.description = "A two-bedroom apartment for up to four guests, with a lounge, dining area and fully equipped kitchen.";
  apartment.about = "Enjoy two bedrooms, en-suite bathrooms and air conditioning, with space to relax in the lounge and share meals in the dining area. A cleaner is provided, and a chef is available on request.";
  apartment.guests = 4;
  apartment.bedrooms = 2;
  apartment.facilities.kitchen = true;
  apartment.facilities.lounge = true;
  apartment.facilities.wifi = true;
  apartment.facilities.airConditioning = true;
  apartment.facilities.parking = true;
  apartment.sleeping = ["Two bedrooms", "Sleeps up to four people per apartment", "En-suite bathrooms"];
  apartment.amenities = ["Lounge", "Dining area", "Wi-Fi", "Air conditioning", "En-suite bathrooms", "Washing machine", "Parking for up to four vehicles", "Chef available on request"];
  apartment.kitchen = ["Fully equipped kitchen", "Microwave"];
  apartment.included = ["Cleaner provided", "Wi-Fi", "Air conditioning", "Fully equipped kitchen", "Washing machine"];
  apartment.idealFor = ["Families", "Groups of up to four", "Self-catering stays"];
  apartment.rate = "US$130 per apartment per night.";
  apartment.policies = [
    { label: "Parking", value: "Parking for up to four vehicles." },
    { label: "Cleaning", value: "A cleaner is provided." },
    { label: "Security", value: "Electric fence and dura wall." },
    { label: "Payment", value: "Mastercard, EcoCash and cash accepted." },
    { label: "Chef", value: "Available on request." },
  ];
}
export const publishedAccommodations = accommodations.filter(
  (a) => a.confirmed && a.name,
);
// Supplied property photographs; individual suite assignments remain unconfirmed.
export const propertyPhotos = {
  roomView: { src: "/mzilikazi imgs/mzilikazi-img/bedroom/WhatsApp Image 2026-10-02 at 2.41.31 PM (2).jpeg", alt: "Bedroom with an exposed brick wall, white bedding and a window", kind: "property", verified: true },
  loungeCorner: { src: "/mzilikazi imgs/mzilikazi-img/lounge-sitting-room/WhatsApp Image 2026-10-02 at 2.41.38 PM.jpeg", alt: "Green sofa beside the patio doors in an apartment lounge", kind: "property", verified: true },
  exteriorView: { src: "/mzilikazi imgs/mzilikazi-img/WhatsApp Image 2026-10-02 at 2.41.43 PM.jpeg", alt: "Apartment entrance and paved courtyard beneath trees", kind: "property", verified: true },
  familyLiving: { src: "/mzilikazi imgs/mzilikazi-img/lounge-sitting-room/WhatsApp Image 2026-10-02 at 2.41.37 PM (3).jpeg", alt: "Open-plan living area with a sofa, coffee table and dining table", kind: "property", verified: true },
  coupleBedroom: { src: "/mzilikazi imgs/mzilikazi-img/bedroom/WhatsApp Image 2026-10-02 at 2.41.33 PM (1).jpeg", alt: "Bedroom with white bedding, green cushions and a garden-facing window", kind: "property", verified: true },
  groupDining: { src: "/mzilikazi imgs/mzilikazi-img/lounge-sitting-room/WhatsApp Image 2026-10-02 at 2.41.36 PM (2).jpeg", alt: "Dining table beside the apartment kitchen", kind: "property", verified: true },
  longStayKitchen: { src: "/mzilikazi imgs/mzilikazi-img/WhatsApp Image 2026-10-02 at 2.41.30 PM (1).jpeg", alt: "Kitchen counter with a dining area and brick feature wall", kind: "property", verified: true },
  courtyard: { src: "/mzilikazi imgs/mzilikazi-img/hero/WhatsApp Image 2026-10-02 at 2.41.38 PM (1).jpeg", alt: "Covered patio beside an apartment and lawn", kind: "property", verified: true },
  lounge: { src: "/mzilikazi imgs/mzilikazi-img/WhatsApp Image 2026-10-02 at 2.41.28 PM.jpeg", alt: "Green sofa and coffee table in an open-plan lounge", kind: "property", verified: true },
  kitchen: { src: "/mzilikazi imgs/mzilikazi-img/tvroom/WhatsApp Image 2026-10-02 at 2.41.29 PM (3).jpeg", alt: "Kitchen, dining table and living area", kind: "property", verified: true },
  bedroom: { src: "/mzilikazi imgs/mzilikazi-img/bedroom/WhatsApp Image 2026-10-02 at 2.41.31 PM (1).jpeg", alt: "Bedroom with white bedding and an exposed brick wall", kind: "property", verified: true },
  bathroom: { src: "/mzilikazi imgs/mzilikazi-img/WhatsApp Image 2026-10-02 at 2.41.33 PM.jpeg", alt: "Bathroom with glass shower, basin and toilet", kind: "property", verified: true },
  pool: { src: "/mzilikazi imgs/mzilikazi-img/WhatsApp Image 2026-10-02 at 2.41.41 PM (1).jpeg", alt: "Outdoor swimming pool framed by trees and a brick wall", kind: "property", verified: true },
  patio: { src: "/mzilikazi imgs/mzilikazi-img/lounge-sitting-room/WhatsApp Image 2026-10-02 at 2.41.42 PM (1).jpeg", alt: "Apartment patio opening onto a lawn", kind: "property", verified: true },
  living: { src: "/mzilikazi imgs/mzilikazi-img/tvroom/WhatsApp Image 2026-10-02 at 2.41.30 PM (2).jpeg", alt: "Living room with sofa, television and dining table", kind: "property", verified: true }
} satisfies Record<string, PropertyMedia>;
export const accommodationPreviews = [propertyPhotos.roomView, propertyPhotos.loungeCorner, propertyPhotos.exteriorView];
export const propertyGallery = [propertyPhotos.bedroom, propertyPhotos.kitchen, propertyPhotos.bathroom, propertyPhotos.living, propertyPhotos.patio];
export const propertyMedia = { hero: propertyPhotos.courtyard, story: propertyPhotos.lounge, pause: propertyPhotos.pool, destination: null as PropertyMedia | null };
export const isPublicMedia = (
  media: PropertyMedia | null | undefined,
): media is PropertyMedia =>
  Boolean(
    media?.verified && media.kind !== "development" && media.src && media.alt,
  );
export const reviews: {
  verified: boolean;
  quote: string;
  name: string;
  source?: string;
  travellerType?: string;
  origin?: string;
  stayLength?: string;
  apartmentSlug?: string;
  image?: PropertyMedia | null;
}[] = [];
export const confirmedServices: {
  title: string;
  description: string;
  confirmed: boolean;
}[] = [];
export { experiences } from "./experience-content";

export const propertyLocation: {
  address: string | null;
  mapEmbedUrl: string | null;
  mapUrl: string | null;
  nearby: { name: string; travelTime: string | null; note: string | null }[];
} = {
  address: null,
  mapEmbedUrl: null,
  mapUrl: null,
  nearby: [
    "Victoria Falls Rainforest",
    "Town Centre",
    "Victoria Falls Airport",
    "Supermarket",
    "Restaurants",
    "Activity pickup areas",
  ].map((name) => ({ name, travelTime: null, note: null })),
};
export const localTeam: {
  name: string;
  role: string;
  bio: string;
  media: PropertyMedia | null;
  verified: boolean;
}[] = [];
