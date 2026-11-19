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
    dropoff: "Mzilikazi Apartments (Door-to-door)",
    description:
      "Arrange a straightforward arrival from the airport straight to your apartment. Share your flight number in advance so pickup timing can be coordinated around your arrival.",
    highlights: [
      "Scheduled around your flight details shared in advance",
      "Direct door-to-door transfer without multi-hotel stops",
      "Room for suitcases and safari daypacks",
      "Air-conditioned passenger minivan transport",
    ],
    recommendedFor: "All arriving and departing guests, families and groups",
  },
  {
    id: "rainforest-falls",
    title: "Victoria Falls Rainforest Gate",
    badge: "Falls Shuttles",
    duration: "Approx. 5–7 minutes",
    pickup: "Mzilikazi Apartments",
    dropoff: "Victoria Falls National Park Entrance",
    description:
      "Arrange convenient hops between your apartment and the Falls entrance. Skip parking queues and coordinate a return pickup time that suits your visit.",
    highlights: [
      "Drop-off near the park visitor centre entrance",
      "Flexible return pickup times arranged with your driver",
      "Morning or afternoon departures tailored to your plans",
    ],
    recommendedFor: "Morning falls walks, photography tours, and rainforest visits",
  },
  {
    id: "town-dining",
    title: "Town Centre & Evening Dining",
    badge: "Town & Dining",
    duration: "Approx. 3–5 minutes",
    pickup: "Mzilikazi Apartments",
    dropoff: "Town markets, cafés, The Boma, or local venues",
    description:
      "Arrange evening restaurant drops and town runs in advance rather than searching for a ride after dinner.",
    highlights: [
      "Pre-arranged evening drop-offs and return pickups",
      "Access to Victoria Falls craft markets, supermarkets and town",
      "Reliable door-to-door transport back to your apartment",
    ],
    recommendedFor: "Evening dinners, restaurant reservations and town shopping",
  },
  {
    id: "activity-staging",
    title: "Activity & Safari Staging Hubs",
    badge: "Activity Transfers",
    duration: "Approx. 5–15 minutes",
    pickup: "Mzilikazi Apartments",
    dropoff: "Zambezi boat jetties, helipads, and safari meeting points",
    description:
      "Where an activity operator does not include hotel pickup, we can help arrange transport to Zambezi cruise jetties, helipads, or safari meeting points.",
    highlights: [
      "Coordinated around your activity start times",
      "Direct drop-off at activity staging points",
      "Return pickup to your apartment after your outing",
    ],
    recommendedFor: "Sunset cruise guests, helicopter flight passengers, and safari travellers",
  },
  {
    id: "kazungula-chobe",
    title: "Kazungula Border (Botswana / Chobe)",
    badge: "Cross-Border Transfer",
    duration: "Approx. 60–75 minutes",
    pickup: "Mzilikazi Apartments",
    dropoff: "Kazungula Border Post (Botswana)",
    description:
      "Heading to Chobe National Park? Ask us to help arrange a transfer to the Kazungula border post to connect with your Botswana safari operator.",
    highlights: [
      "Drivers familiar with border crossing drop-off points",
      "Comfortable air-conditioned transit",
      "Coordinated timing with your onward safari operator",
    ],
    recommendedFor: "Day-trippers to Chobe National Park and onward Botswana travellers",
  },
  {
    id: "livingstone-bridge",
    title: "Victoria Falls Bridge & Livingstone",
    badge: "Border & Bridge Transfer",
    duration: "Approx. 10–20 minutes",
    pickup: "Mzilikazi Apartments",
    dropoff: "Victoria Falls Bridge / Zambian Border",
    description:
      "Arrange transport to the Victoria Falls Bridge, bridge activity staging areas, or the Zimbabwean border post for onward travel to Livingstone, Zambia.",
    highlights: [
      "Drop-off at the Zimbabwean border post or bridge area",
      "Space for luggage on onward journeys",
      "Coordinated pickup and drop-off timing",
    ],
    recommendedFor: "Bridge adventurers and travellers visiting the Zambian side",
  },
];

export const fleetFeatures = [
  {
    title: "Air-Conditioned Comfort",
    description: "Air-conditioned passenger transport to keep your journey comfortable in warmer weather.",
  },
  {
    title: "Practical Luggage Space",
    description: "Rear cargo capacity suited to standard suitcases, carry-ons, and safari daypacks.",
  },
  {
    title: "Local Drivers & Partners",
    description: "Transfers are coordinated with local drivers who know Victoria Falls routes and pickup points.",
  },
  {
    title: "Door-to-Door Convenience",
    description: "Direct transport between the airport, your apartment, and local destinations.",
  },
];

export const transferFaqs = [
  {
    question: "How do airport pickups work when I land at Victoria Falls (VFA)?",
    answer:
      "Share your flight number and arrival time in your enquiry. Once your transfer is confirmed, pickup and meeting instructions at Victoria Falls Airport (VFA) will be confirmed with you before travel.",
  },
  {
    question: "Can I request return transfers or local trips?",
    answer:
      "Yes. You can request airport arrival and departure transfers together, or ask about local transport for dinners, shopping, and activities.",
  },
  {
    question: "How are transfer rates and payment handled?",
    answer:
      "Transfer availability, exact rates for your route and group size, and accepted payment options (USD cash, EcoCash, or card) are confirmed when our team replies to your enquiry.",
  },
  {
    question: "Can extra luggage or child seating be requested?",
    answer:
      "Yes — please mention any oversized luggage, strollers, or child seating needs in your enquiry so we can confirm suitable arrangements.",
  },
];
