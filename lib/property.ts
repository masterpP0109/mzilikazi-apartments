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
export const publishedAccommodations = accommodations.filter(
  (a) => a.confirmed && a.name,
);
export const propertyMedia: {
  hero: PropertyMedia | null;
  story: PropertyMedia | null;
  pause: PropertyMedia | null;
  destination: PropertyMedia | null;
} = {
  hero: null,
  story: null,
  pause: null,
  destination: null,
};
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
export const experiences = [
  {
    slug: "victoria-falls-tour",
    category: "The Falls",
    title: "Meet the Falls.",
    description:
      "Make room for the rainforest, the viewpoints and the sound of the water.",
    detail:
      "A visit to the Falls can be the starting point for your time here. Share your interests and ask about guiding options, access and current conditions before you make plans.",
    duration: null as string | null,
    travellerTypes: [] as string[],
    categories: ["Iconic", "Family"],
    practicalNote: "Ask about current access, guiding options and conditions.",
    enabled: true,
    confirmed: false,
    providerConfirmed: false,
    media: null as PropertyMedia | null,
  },
  {
    slug: "chobe-day-trip",
    category: "Wildlife",
    title: "A day in Chobe.",
    description:
      "Consider a wildlife day in Botswana as part of your Victoria Falls visit.",
    detail:
      "If Chobe is on your wish list, mention it in your enquiry. Ask for current operator options, border requirements, timings and inclusions before committing to a trip.",
    duration: null as string | null,
    travellerTypes: [] as string[],
    categories: ["Wildlife"],
    practicalNote:
      "Confirm operator arrangements, border requirements and the day’s timings.",
    enabled: true,
    confirmed: false,
    providerConfirmed: false,
    media: null as PropertyMedia | null,
  },
  {
    slug: "village-cultural-visit",
    category: "Culture",
    title: "Beyond the postcard.",
    description:
      "Leave space to learn about the people and places around Victoria Falls.",
    detail:
      "Ask about respectful ways to explore local culture. Any visit should be arranged with the agreement of the host community, with clear information about what is included.",
    duration: null as string | null,
    travellerTypes: [] as string[],
    categories: ["Culture"],
    practicalNote:
      "Ask how the visit is agreed with the host community and what is included.",
    enabled: true,
    confirmed: false,
    providerConfirmed: false,
    media: null as PropertyMedia | null,
  },
];

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
