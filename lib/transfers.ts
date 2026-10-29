import type { PropertyMedia } from "./property";

export interface TransferRoute {
  id: string;
  title: string;
  badge: string;
  duration: string;
  pickup: string;
  dropoff: string;
  description: string;
  highlights: string[];
  recommendedFor: string;
}

export const transferMedia = {
  fleetExterior: {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi transefers/WhatsApp Image 2026-10-18 at 17.36.05 (1).jpeg",
    alt: "Air-conditioned Nissan Serena passenger minivan for Victoria Falls airport and local transfers",
    kind: "property" as const,
    verified: true,
  },
  fleetInterior: {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi transefers/minivan-interior-cabin.jpg",
    alt: "Air-conditioned minivan passenger cabin with comfortable seating, fold-down refreshment trays and ample legroom",
    kind: "property" as const,
    verified: true,
  },
  fleetLuggage: {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi transefers/WhatsApp Image 2026-10-18 at 17.36.04 (2).jpeg",
    alt: "Spacious luggage compartment accommodating suitcases, daypacks and travel gear",
    kind: "property" as const,
    verified: true,
  },
  fleetFront: {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi transefers/WhatsApp Image 2026-10-18 at 17.36.03.jpeg",
    alt: "Licensed Alegria passenger taxi vehicle ready for guest transfers",
    kind: "property" as const,
    verified: true,
  },
  fleetProfile: {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi transefers/WhatsApp Image 2026-10-18 at 17.36.05 (3).jpeg",
    alt: "Modern white passenger transfer vehicle on Victoria Falls tour",
    kind: "property" as const,
    verified: true,
  },
} satisfies Record<string, PropertyMedia>;

export const transferRoutes: TransferRoute[] = [
  {
    id: "vfa-airport",
    title: "Victoria Falls Airport (VFA) Pickups",
    badge: "Direct Airport Transfer",
    duration: "Approx. 20 minutes",
    pickup: "Victoria Falls International Airport (VFA) Arrivals",
    dropoff: "Mzilikazi Guest Lodge (Door-to-door)",
    description:
      "A seamless arrival experience. Your dedicated driver meets you inside the arrivals terminal holding a personalised name board, assists with your luggage, and drives you directly to your apartment in air-conditioned comfort.",
    highlights: [
      "Flight arrival monitoring for early or delayed landings",
      "Direct door-to-door transfer without multi-hotel stops",
      "Spacious boot for suitcases, golf bags and safari gear",
      "Air-conditioned passenger minivan with comfortable seating",
    ],
    recommendedFor: "All arriving and departing guests, families and groups",
  },
  {
    id: "rainforest-falls",
    title: "Victoria Falls Rainforest Gate",
    badge: "Falls Shuttles",
    duration: "Approx. 5–7 minutes",
    pickup: "Mzilikazi Guest Lodge",
    dropoff: "Victoria Falls National Park Entrance",
    description:
      "Quick, easy hops between your apartment and the world wonder. Avoid parking delays and town traffic. We drop you right at the visitor entrance and arrange a scheduled pickup when you are ready to return.",
    highlights: [
      "Direct drop-off at the park visitor centre entrance",
      "Flexible return pickup times arranged directly with your driver",
      "Morning or afternoon departures tailored to your itinerary",
    ],
    recommendedFor: "Morning falls walks, photography tours, and rain-forest visits",
  },
  {
    id: "town-dining",
    title: "Town Centre & Evening Dining",
    badge: "Town & Dining",
    duration: "Approx. 3–5 minutes",
    pickup: "Mzilikazi Guest Lodge",
    dropoff: "Town markets, cafés, The Boma, or local venues",
    description:
      "Enjoy evening dinners, shopping, and town excursions with dedicated transport. Never worry about finding taxis at night or navigating dark roads after a feast at The Boma or cocktails overlooking the gorge.",
    highlights: [
      "Punctual dinner drop-offs and late-evening return pickups",
      "Access to Victoria Falls craft markets, supermarkets and banks",
      "Reliable safe transport after dark for total peace of mind",
    ],
    recommendedFor: "Evening dinners, restaurant reservations and town shopping",
  },
  {
    id: "activity-staging",
    title: "Activity & Safari Staging Hubs",
    badge: "Activity Transfers",
    duration: "Approx. 5–15 minutes",
    pickup: "Mzilikazi Guest Lodge",
    dropoff: "Zambezi boat jetties, helipads, and safari meeting points",
    description:
      "Arrive on time and relaxed for your scheduled Victoria Falls experiences. We provide direct transfers to Zambezi River sunset cruise jetties, helicopter launch pads, canopy tours, and game drive pick-up points.",
    highlights: [
      "Coordinated with your booked activity start times",
      "Drop-off directly at operator staging docks and private gates",
      "Seamless return to your apartment right after the experience",
    ],
    recommendedFor: "Sunset cruise guests, helicopter flight passengers, and safari travellers",
  },
  {
    id: "kazungula-chobe",
    title: "Kazungula Border (Botswana / Chobe)",
    badge: "Cross-Border Transfer",
    duration: "Approx. 60–75 minutes",
    pickup: "Mzilikazi Guest Lodge",
    dropoff: "Kazungula Border Post (Botswana)",
    description:
      "Heading to Chobe National Park for a full-day wildlife safari or multi-day lodge stay? We provide dependable cross-border transfer services to the Kazungula border post to connect with Botswana operators.",
    highlights: [
      "Experienced drivers familiar with border formalities and immigration",
      "Comfortable long-distance transit with chilled water and air-con",
      "Smooth connection with your Botswana safari guide or transfer",
    ],
    recommendedFor: "Day-trippers to Chobe National Park and onward Botswana travellers",
  },
  {
    id: "livingstone-bridge",
    title: "Victoria Falls Bridge & Livingstone",
    badge: "Border & Bridge Transfer",
    duration: "Approx. 10–20 minutes",
    pickup: "Mzilikazi Guest Lodge",
    dropoff: "Victoria Falls Bridge / Zambian Border",
    description:
      "Convenient connection to the historic Victoria Falls Bridge, bridge bungee and slide staging areas, or onward transit across the border to Livingstone, Zambia.",
    highlights: [
      "Direct drop-off at the Zimbabwean border post or bridge viewing platform",
      "Luggage transfer options for dual-country itineraries",
      "Assistance with crossing information and timing",
    ],
    recommendedFor: "Bridge adventurers and travellers visiting the Zambian side",
  },
];

export const fleetFeatures = [
  {
    title: "Air-Conditioned Comfort",
    description: "Stay cool even during midday heat with front and rear dual-zone air conditioning throughout the cabin.",
  },
  {
    title: "Generous Luggage Capacity",
    description: "Deep rear cargo space easily accommodates up to four to six full-size suitcases, carry-ons, and safari daypacks.",
  },
  {
    title: "Licensed & Vetted Drivers",
    description: "Professional, licensed local drivers with comprehensive passenger liability insurance and deep local knowledge.",
  },
  {
    title: "Door-to-Door Convenience",
    description: "Direct transport from the airport arrivals hall or apartment door straight to your destination with zero detours.",
  },
];

export const transferFaqs = [
  {
    question: "How do airport pickups work when I land at Victoria Falls (VFA)?",
    answer:
      "Your driver monitors your flight status for early arrivals or delays. They will be waiting inside the arrivals hall holding a personalised name board with your name. They assist with your luggage and escort you straight to the vehicle.",
  },
  {
    question: "Can I book return transfers or multi-day town transport?",
    answer:
      "Yes. You can reserve airport arrival and departure transfers together, or arrange custom daily shuttles for dinners, shopping, and activities. We can tailor transport to your itinerary.",
  },
  {
    question: "What payment methods are accepted for transfers?",
    answer:
      "Payments can be made in US Dollars cash, EcoCash, or international card (Mastercard/Visa). Transfer costs can also be included in your comprehensive stay enquiry.",
  },
  {
    question: "Are child seats or extra luggage accommodated?",
    answer:
      "Yes, please specify when booking if you require booster/child seats or have oversized items like camera cases or golf bags so we can configure seating accordingly.",
  },
];
