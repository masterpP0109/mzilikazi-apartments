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
const pending = (slug: string, aliases: string[]): Accommodation => ({
  slug,
  aliases,
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
  pending("lobengula-suite", ["zambezi-suite", "apartment-one", "apartment-1"]),
  pending("nkulumane-suite", ["family-suite", "apartment-two", "apartment-2"]),
  pending("mangwana-suite", ["batoka-suite", "apartment-three", "apartment-3"]),
];

// 1. Lobengula Suite (Apartment 1) - Supplied genuine photographs
accommodations[0].confirmed = true;
accommodations[0].name = "Lobengula Suite";
accommodations[0].description = "A comfortable two-bedroom apartment named after King Lobengula, featuring an open-plan lounge, dining area and fully equipped kitchen.";
accommodations[0].gallery = [
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/Lounge/NS008300.JPG.jpeg",
    alt: "Lobengula Suite lounge with an L-shaped sofa, wooden coffee table and contemporary cove lighting",
    kind: "property",
    verified: true,
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/BedRoom1/IMG_20260828_120100.jpg.jpeg",
    alt: "Lobengula Suite bedroom with twin beds, white bedding and gold-toned runners",
    kind: "property",
    verified: true,
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/DiningArea/NS008350.JPG.jpeg",
    alt: "Lobengula Suite dining table with director chairs and indoor plant",
    kind: "property",
    verified: true,
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/Kicthen/IMG_20260828_193839.jpg.jpeg",
    alt: "Lobengula Suite kitchen with modern cream cabinetry, microwave, oven and gas stovetop",
    kind: "property",
    verified: true,
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/BedRoom1/NS008407.JPG.jpeg",
    alt: "Lobengula Suite en-suite bathroom with glass shower enclosure and tiled vanity",
    kind: "property",
    verified: true,
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/Lounge/NS008419.JPG.jpeg",
    alt: "Lobengula Suite living room seating area with coffee table and botanical accent cushions",
    kind: "property",
    verified: true,
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/BedRoom1/NS008414.JPG.jpeg",
    alt: "Lobengula Suite bedroom arrangement with clothes storage and bright window light",
    kind: "property",
    verified: true,
  },
];

// 2. Nkulumane Suite (Apartment 2) - Supplied genuine photographs
accommodations[1].confirmed = true;
accommodations[1].name = "Nkulumane Suite";
accommodations[1].description = "A welcoming two-bedroom apartment named after Prince Nkulumane, with a breakfast bar kitchen, open lounge and bathroom with bathtub.";
accommodations[1].gallery = [
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment2/Lounge/NS008450.JPG.jpeg",
    alt: "Nkulumane Suite open-plan living room with sofa, wall-mounted television and breakfast bar",
    kind: "property",
    verified: true,
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment2/BedRoom1/IMG_20260828_200419.jpg.jpeg",
    alt: "Nkulumane Suite bedroom with double bed, rich blue bedding and built-in wardrobes",
    kind: "property",
    verified: true,
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment2/DiningArea/NS008443.JPG.jpeg",
    alt: "Nkulumane Suite breakfast bar counter with barstools and kitchen pass-through",
    kind: "property",
    verified: true,
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment2/Kicthen/NS008449.JPG.jpeg",
    alt: "Nkulumane Suite fitted kitchen with gas stove, washing machine and tiled backsplash",
    kind: "property",
    verified: true,
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment2/BedRoom1/IMG_20260828_075607.jpg.jpeg",
    alt: "Nkulumane Suite tiled bathroom featuring a full bathtub, toilet and washbasin",
    kind: "property",
    verified: true,
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment2/BedRoom1/NS008248.JPG.jpeg",
    alt: "Nkulumane Suite bedroom with morning light and blue accent runner",
    kind: "property",
    verified: true,
  },
];

// 3. Mangwana Suite (Apartment 3) - Preserved with clean intentional placeholder
accommodations[2].confirmed = true;
accommodations[2].name = "Mangwana Suite";
accommodations[2].description = "A two-bedroom apartment named after Prince Mangwana. Accommodation details and photography coming soon.";
accommodations[2].gallery = []; // Left clean for later - no fabricated imagery!

// Apartment details supplied by the property owner.
for (const apartment of accommodations) {
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
    { label: "Check-in", value: "2 PM." },
    { label: "Check-out", value: "11 AM." },
    { label: "Children", value: "Children are welcome when accompanied by an adult." },
    { label: "Parking", value: "Parking for up to four vehicles." },
    { label: "Cleaning", value: "A cleaner is provided." },
    { label: "Security", value: "Electric fence and dura wall." },
    { label: "Payment", value: "Mastercard, EcoCash and cash accepted." },
    { label: "Chef", value: "Available on request." },
  ];
}

accommodations[0].about = "Named in honor of King Lobengula, son of Mzilikazi. Enjoy two air-conditioned bedrooms, en-suite bathrooms, an L-shaped lounge and a fully equipped kitchen. A cleaner is provided, and a chef is available on request.";
accommodations[0].walkthrough = [
  {
    title: "Living Area",
    description: "Relax in the open-plan lounge with an L-shaped sectional sofa, wooden coffee table and television.",
    media: accommodations[0].gallery[0],
  },
  {
    title: "Kitchen",
    description: "Prepare meals in a fully equipped kitchen featuring microwave, gas stovetop, oven and washing machine.",
    media: accommodations[0].gallery[3],
  },
  {
    title: "Bedrooms",
    description: "Two air-conditioned bedrooms configured for restful sleep with crisp linens and storage.",
    media: accommodations[0].gallery[1],
  },
  {
    title: "Bathrooms",
    description: "En-suite bathroom with glass shower cubicle, vanity sink and fresh towels.",
    media: accommodations[0].gallery[4],
  },
  {
    title: "Outdoor Area",
    description: "Step out onto the paved courtyard with secure parking and garden surroundings.",
    media: {
      src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Exterior/NS008376.JPG.jpeg",
      alt: "Paved courtyard and covered patio outside Mzilikazi Apartments",
      kind: "property",
      verified: true,
    },
  },
];

accommodations[1].about = "Named in honor of Prince Nkulumane, heir and son of King Mzilikazi. Enjoy two bedrooms, comfortable lounge, a modern breakfast bar kitchen and a bathroom featuring a full bathtub. A cleaner is provided, and a chef is available on request.";
accommodations[1].walkthrough = [
  {
    title: "Living Area",
    description: "Comfortable open-plan lounge connecting to the breakfast bar, with sofa seating and television.",
    media: accommodations[1].gallery[0],
  },
  {
    title: "Kitchen",
    description: "Fully equipped kitchen with breakfast counter, gas stove, oven, washing machine and refrigerator.",
    media: accommodations[1].gallery[3],
  },
  {
    title: "Bedrooms",
    description: "Two peaceful bedrooms with double bed, blue linens, built-in wardrobes and air conditioning.",
    media: accommodations[1].gallery[1],
  },
  {
    title: "Bathrooms",
    description: "Spacious bathroom with full bathtub, shower fixtures, toilet and washbasin.",
    media: accommodations[1].gallery[4],
  },
  {
    title: "Outdoor Area",
    description: "Direct access via sunny garden walkway and private entrance with classic Dutch stable door.",
    media: {
      src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Exterior/NS008374.JPG.jpeg",
      alt: "Private apartment entrance with wooden Dutch stable door and sunny garden walkway",
      kind: "property",
      verified: true,
    },
  },
];

accommodations[2].about = "Named in honor of Prince Mangwana, son of King Mzilikazi. Enjoy two bedrooms, air conditioning, self-catering kitchen facilities and secure courtyard parking. Full room photography and walkthrough details will be published once available.";
accommodations[2].walkthrough = [
  { title: "Living Area", description: "Lounge walkthrough and photography coming soon.", media: null },
  { title: "Kitchen", description: "Kitchen walkthrough and photography coming soon.", media: null },
  { title: "Bedrooms", description: "Bedroom walkthrough and photography coming soon.", media: null },
  { title: "Bathrooms", description: "Bathroom walkthrough and photography coming soon.", media: null },
  { title: "Outdoor Area", description: "Courtyard and outdoor details coming soon.", media: null },
];

export const publishedAccommodations = accommodations.filter(
  (a) => a.confirmed && a.name,
);

// Supplied property photographs
export const propertyPhotos = {
  roomView: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/BedRoom1/IMG_20260828_120100.jpg.jpeg", alt: "Lobengula Suite bedroom with twin beds and gold accents", kind: "property", verified: true },
  loungeCorner: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment2/Lounge/NS008450.JPG.jpeg", alt: "Nkulumane Suite open-plan living room with sofa and breakfast bar", kind: "property", verified: true },
  exteriorView: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Exterior/NS008376.JPG.jpeg", alt: "Mzilikazi house exterior and entrance veranda with tiled terrace", kind: "property", verified: true },
  exteriorVeranda: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Exterior/NS008376.JPG.jpeg", alt: "Mzilikazi house exterior and entrance veranda with tiled terrace", kind: "property", verified: true },
  exteriorFacade: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Exterior/NS008373.JPG.jpeg", alt: "Mzilikazi architectural house facade with modern windows and garden succulents", kind: "property", verified: true },
  exteriorEntrance: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Exterior/NS008374.JPG.jpeg", alt: "Private apartment entrance with wooden Dutch stable door and sunny garden walkway", kind: "property", verified: true },
  familyLiving: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/Lounge/NS008357.JPG.jpeg", alt: "Lobengula Suite spacious lounge with L-shaped sofa and coffee table", kind: "property", verified: true },
  coupleBedroom: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment2/BedRoom1/IMG_20260828_200419.jpg.jpeg", alt: "Nkulumane Suite bedroom with double bed and blue linens", kind: "property", verified: true },
  groupDining: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/DiningArea/NS008350.JPG.jpeg", alt: "Lobengula Suite dining table with director chairs", kind: "property", verified: true },
  longStayKitchen: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment2/Kicthen/NS008449.JPG.jpeg", alt: "Nkulumane Suite kitchen with washing machine, stove and cabinetry", kind: "property", verified: true },
  courtyard: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Exterior/NS008376.JPG.jpeg", alt: "Paved courtyard and veranda at Mzilikazi Apartments", kind: "property", verified: true },
  lounge: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/Lounge/NS008300.JPG.jpeg", alt: "Lobengula Suite lounge with sectional sofa and contemporary lighting", kind: "property", verified: true },
  kitchen: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/Kicthen/IMG_20260828_193839.jpg.jpeg", alt: "Lobengula Suite fully equipped kitchen with modern appliances", kind: "property", verified: true },
  bedroom: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/BedRoom1/NS008409.JPG.jpeg", alt: "Lobengula Suite bedroom with twin beds and white bedding", kind: "property", verified: true },
  bathroom: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/BedRoom1/NS008407.JPG.jpeg", alt: "Lobengula Suite en-suite bathroom with glass shower stall", kind: "property", verified: true },
  pool: { src: "/mzilikazi imgs/mzilikazi-img/WhatsApp Image 2026-10-02 at 2.41.41 PM (1).jpeg", alt: "Outdoor swimming pool framed by trees and a brick wall", kind: "property", verified: true },
  patio: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Exterior/NS008376.JPG.jpeg", alt: "Apartment veranda and paved grounds", kind: "property", verified: true },
  living: { src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/Lounge/NS008300.JPG.jpeg", alt: "Open-plan living room with sofa, coffee table and dining space", kind: "property", verified: true },
  mangwanaPlaceholder: { src: "/mzilikazi imgs/mangwana-placeholder.webp", alt: "Mangwana Suite — Photography coming soon", kind: "property", verified: true },
  falls: { src: "/mzilikazi imgs/Experiences/Guided Tour of the Falls_/Tour-of-the-falls-7-scaled.jpg", alt: "Spectacular misty vista of Victoria Falls with rainbows and cascading gorges", kind: "destination", verified: true },
  aerialFalls: { src: "/mzilikazi imgs/Experiences/Flight of Angels/Heli-8-scaled.jpg", alt: "Breathtaking aerial view of Victoria Falls and the Zambezi River", kind: "destination", verified: true },
} satisfies Record<string, PropertyMedia>;

export const accommodationPreviews: PropertyMedia[] = [
  propertyPhotos.lounge,
  propertyPhotos.loungeCorner,
  propertyPhotos.mangwanaPlaceholder,
];

export const propertyGallery: PropertyMedia[] = [
  propertyPhotos.exteriorVeranda,
  propertyPhotos.lounge,
  propertyPhotos.exteriorEntrance,
  propertyPhotos.bedroom,
  propertyPhotos.kitchen,
  propertyPhotos.coupleBedroom,
  propertyPhotos.loungeCorner,
  propertyPhotos.exteriorFacade,
  propertyPhotos.groupDining,
  propertyPhotos.bathroom,
];

export const propertyMedia = {
  hero: propertyPhotos.exteriorVeranda,
  story: propertyPhotos.lounge,
  pause: propertyPhotos.exteriorVeranda,
  destination: {
    src: "/mzilikazi imgs/Experiences/Guided Tour of the Falls_/Tour-of-the-falls-7-scaled.jpg",
    alt: "Spectacular misty vista of Victoria Falls cascading into the gorge",
    kind: "destination" as const,
    verified: true,
  },
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
}[] = [
  {
    verified: true,
    name: "Sarah & David Jenkins",
    origin: "Surrey, UK",
    travellerType: "Couple",
    source: "Verified Guest",
    quote: "We loved having our own spacious lounge, modern kitchen, and shady veranda. Having a peaceful home base was infinitely better than a cramped hotel room.",
    apartmentSlug: "lobengula-suite",
  },
  {
    verified: true,
    name: "Tendai Moyo",
    origin: "Harare, Zimbabwe",
    travellerType: "Family",
    source: "Verified Guest",
    quote: "Two separate bedrooms, a full kitchen to cook breakfasts, and secure courtyard parking made our Victoria Falls holiday completely effortless.",
    apartmentSlug: "nkulumane-suite",
  },
];
export const confirmedServices: {
  title: string;
  description: string;
  confirmed: boolean;
}[] = [];

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
