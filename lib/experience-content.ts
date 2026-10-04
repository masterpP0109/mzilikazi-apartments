import type { PropertyMedia } from './property';
import { experienceGuides, type ExperienceGuide } from './experience-guides.ts';
export interface Experience {
  guide: ExperienceGuide | null;
  slug: string; title: string; category: string; categories: string[];
  description: string; detail: string; expect: string[]; enjoy: string;
  plan: string; check: string[]; practicalNote: string;
  faqs: [string, string][]; media: PropertyMedia | null; sources: string[];
  featured: boolean; duration: string | null; travellerTypes: string[];
  enabled: boolean; confirmed: boolean; providerConfirmed: boolean;
  inclusions: string[]; exclusions: string[];
  startingPrice: number | null; priceUnit: string; priceContext: string | null;
  priceSource: { project: string; referenceSlug: string; checkedOn: string } | null;
  gallery: PropertyMedia[]; highlights: string[]; location: string | null;
  bestTime: string | null; recommendedFor: string; importantInformation: string[];
  bookingNotes: string[]; relatedExperienceSlugs: string[];
}
const photo = (folder: string, file: string, alt: string): PropertyMedia => ({
  src: `/mzilikazi imgs/Experiences/${folder}/${file}`, alt, kind: 'destination', verified: true,
});
const base = { featured: true, duration: null, travellerTypes: [], enabled: true, confirmed: false, providerConfirmed: false, inclusions: [], exclusions: [] };
const bridgeSource = 'https://www.shearwatervictoriafalls.com/experience/victoria-falls-bridge-adventures/';
// General educational guidance; no Mzilikazi operator/package relationship is confirmed.
// Supplied activity photos visually reviewed on 2026-10-02. Paths preserve original case.
const experienceEntries = [
  {
    ...base, slug: 'victoria-falls-tour', title: 'Victoria Falls Guided Tour', category: 'Nature', categories: ['Iconic', 'Nature', 'Family'],
    description: 'Walk through the rainforest to viewpoints overlooking Victoria Falls, with time to look, listen and learn.',
    detail: 'A guided walking visit brings the Falls into focus through its viewpoints, rainforest and the stories behind the landscape.',
    expect: [], enjoy: '', plan: '', check: [], practicalNote: '', faqs: [],
    media: photo('Guided Tour of the Falls_', 'Tour-of-the-Falls-1-scaled.jpg', 'Guide pointing towards Victoria Falls beside a visitor at a viewpoint'),
    sources: ['https://www.shearwatervictoriafalls.com/experience/tours-hikes/', 'https://www.victoriafalls-guide.net/victoria-falls-rainforest.html'],
  },
  {
    ...base, slug: 'sunset-cruise', title: 'Zambezi Sunset Cruise', category: 'Relaxation', categories: ['Relaxed', 'Nature'],
    description: 'Take a slower moment on the Zambezi River as the light changes towards sunset.',
    detail: 'A sunset cruise is a river outing with a relaxed pace, views of the banks and time to enjoy the evening light.',
    expect: [], enjoy: '', plan: '', check: [], practicalNote: '', faqs: [],
    media: photo('Standard Cruise_', '3.jpg', 'Cruise boat on the Zambezi River beneath an orange sunset'),
    sources: ['https://www.shearwatervictoriafalls.com/experience/river-cruise/'],
  },
  {
    ...base, slug: 'boma-dinner', title: 'The Boma Dinner', category: 'Dining & culture', categories: ['Dining', 'Culture'],
    description: 'An evening of food, dance and drumming at The Boma Dinner & Drum Show.',
    detail: 'The Boma combines a dining experience with live entertainment and interactive drumming. It is an evening outing rather than a quiet restaurant meal.',
    expect: [], enjoy: '', plan: '', check: [], practicalNote: '', faqs: [],
    media: photo('Boma Dinner_', 'IMG_0366.PNG', 'Dancers performing in colourful clothing at The Boma'),
    sources: ['https://victoria-falls-safari-collection.com/en-US/wine-and-dine/the-boma-dinner-drum-show'],
  },
  {
    ...base, slug: 'game-drive', title: 'Game Drive', category: 'Wildlife', categories: ['Wildlife', 'Nature'],
    description: 'Explore the bush from a safari vehicle with a guide, looking for wildlife and learning about its habitat.',
    detail: 'A game drive is a guided wildlife-viewing outing by vehicle. The focus is on observation and the landscape, with animal encounters depending on conditions.',
    expect: [], enjoy: '', plan: '', check: [], practicalNote: '', faqs: [],
    media: photo('Game Drive', 'Game-Drive-2-scaled.jpg', 'Open safari vehicle on a track beside a buffalo in the bush'),
    sources: ['https://www.shearwatervictoriafalls.com/experience/victoria-falls-safari/'],
  },
  {
    ...base, slug: 'chobe-day-trip', title: 'Chobe Day Trip', category: 'Wildlife', categories: ['Wildlife', 'Nature'],
    description: 'Consider a wildlife excursion across the border into Botswana, with time to explore the Chobe area.',
    detail: 'A Chobe day trip from Victoria Falls is a cross-border excursion into Botswana. Plan the travel and documentation as carefully as the wildlife activities.',
    expect: [], enjoy: '', plan: '', check: [], practicalNote: '', faqs: [],
    media: photo('Chobe Day Trip_', 'Chobe-9.jpg', 'Elephant walking near a safari vehicle in the Chobe landscape'),
    sources: ['https://www.shearwatervictoriafalls.com/experience/chobe-day-trip-2/'],
  },
  {
    ...base, slug: 'bungee-jump', title: 'Bungee Jump', category: 'Adventure', categories: ['Adventure', 'Iconic'],
    description: 'A cord-assisted jump from the Victoria Falls Bridge above the Zambezi gorge.',
    detail: 'Bungee jumping involves a jump secured by a bungee cord, followed by a rebound. The Victoria Falls Bridge is a recognised setting for this activity.',
    expect: [], enjoy: '', plan: '', check: [], practicalNote: '', faqs: [],
    media: photo('Bungee Jump_', '3 (1).jpg', 'Bungee participant jumping from the Victoria Falls Bridge platform above the gorge'),
    sources: [bridgeSource],
  },
  {
    ...base, slug: 'zip-line', title: 'Zip Line', category: 'Adventure', categories: ['Adventure'],
    description: 'Travel along a suspended cable in a harness, taking in a different view of the gorge.',
    detail: 'A zip line carries a harnessed rider along a cable. Unlike bungee jumping, you travel along the line rather than jump on an elastic cord.',
    expect: [], enjoy: '', plan: '', check: [], practicalNote: '', faqs: [],
    media: photo('Zip Line_', '8.jpg', 'Harnessed zip line rider travelling along a cable with Victoria Falls Bridge behind'),
    sources: [bridgeSource],
  },
  {
    ...base, featured: false, slug: 'village-cultural-visit', title: 'Beyond the postcard.', category: 'Culture', categories: ['Culture'],
    description: 'Leave space to learn about the people and places around Victoria Falls.',
    detail: 'A host-led cultural visit offers time to listen and learn about local life. Visits need the agreement of the host community, a defined meeting place and clear arrangements for transport and participation.',
    expect: ['Discuss the proposed visit and host arrangements before choosing.', 'Follow the host’s guidance about participation and photography.'],
    enjoy: 'For visitors interested in learning through respectful conversation and listening.',
    plan: 'The booking proposal identifies the host community, visit location, timing and whether return transport is included. There is no single itinerary promised for every community visit.',
    check: ['Confirm the host’s agreement and what is included.', 'Ask permission before taking photographs.', 'Check timing, transport and any appropriate visitor guidance.'],
    practicalNote: 'Visits follow the host community’s agreed timing and visitor guidance.',
    faqs: [['Can I take photographs?', 'Obtain the hosts’ permission before photographing people or their homes and respect their preferences.'], ['What is included?', 'The visit proposal sets out host arrangements, transport and any fees before you commit. Food, performances and souvenirs are not assumed to be part of every visit.']],
    media: null, sources: [],
  },
];

// Prices read from the user-referenced Outbound project on 2026-10-02.
// Zip-line reference describes a different ride; its amount is deliberately unassigned.
const experiencePresentation = {
  "victoria-falls-tour": {
    "startingPrice": 55,
    "referenceSlug": "guided-tour-falls",
    "priceContext": null,
    "gallery": [
      {
        "src": "/mzilikazi imgs/Experiences/Guided Tour of the Falls_/Tour-of-the-falls-7-scaled.jpg",
        "alt": "Victoria Falls framed by green rainforest vegetation",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Guided Tour of the Falls_/Tour-of-the-falls-11-scaled.jpg",
        "alt": "Visitors walking beside the Falls at a viewpoint",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Guided Tour of the Falls_/7-3.jpg",
        "alt": "Dense green trees and foliage in the Victoria Falls rainforest",
        "kind": "destination",
        "verified": true
      }
    ],
    "highlights": [
      "Rainforest scenery",
      "Waterfall viewpoints",
      "Guide insights"
    ],
    "location": "Zimbabwe-side rainforest and waterfall viewpoints",
    "bestTime": "Ask about water levels and conditions for your dates",
    "recommendedFor": "Scenery, photography and learning about the Falls",
    "relatedExperienceSlugs": [
      "sunset-cruise",
      "chobe-day-trip",
      "boma-dinner"
    ]
  },
  "sunset-cruise": {
    "startingPrice": 85,
    "referenceSlug": "upper-zambezi-sunset-cruise",
    "priceContext": "Luxury sunset cruise option",
    "gallery": [
      {
        "src": "/mzilikazi imgs/Experiences/Standard Cruise_/Standard-2-scaled.jpg",
        "alt": "River cruise boat beside the wooded Zambezi riverbank",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Standard Cruise_/Standard-6-scaled.jpg",
        "alt": "Hippos near a grassy riverbank",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Standard Cruise_/Standard-7.jpg",
        "alt": "Elephants in the river near the bank",
        "kind": "destination",
        "verified": true
      }
    ],
    "highlights": [
      "Evening light on the river",
      "Riverbank scenery",
      "A relaxed pace"
    ],
    "location": "Upper Zambezi River, above Victoria Falls",
    "bestTime": "Around sunset; confirm boarding time",
    "recommendedFor": "River scenery and a relaxed outing",
    "relatedExperienceSlugs": [
      "victoria-falls-tour",
      "game-drive",
      "boma-dinner"
    ]
  },
  "boma-dinner": {
    "startingPrice": 55,
    "referenceSlug": "boma-dinner-show",
    "priceContext": null,
    "gallery": [
      {
        "src": "/mzilikazi imgs/Experiences/Boma Dinner_/IMG_0364.JPG",
        "alt": "Performers at The Boma entrance",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Boma Dinner_/IMG_0368.PNG",
        "alt": "Desserts arranged for dinner service at The Boma",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Boma Dinner_/IMG_0369.PNG",
        "alt": "Buffet dishes and salads at The Boma",
        "kind": "destination",
        "verified": true
      }
    ],
    "highlights": [
      "Dining and local dishes",
      "Dance and live music",
      "Interactive drumming"
    ],
    "location": "The Boma, Victoria Falls",
    "bestTime": "Evening; confirm the reservation time",
    "recommendedFor": "Dining, music and a lively shared evening",
    "relatedExperienceSlugs": [
      "sunset-cruise",
      "village-cultural-visit",
      "victoria-falls-tour"
    ]
  },
  "game-drive": {
    "startingPrice": 75,
    "referenceSlug": "game-drive-zambezi",
    "priceContext": "Zambezi National Park game-drive option",
    "gallery": [
      {
        "src": "/mzilikazi imgs/Experiences/Game Drive/Game-Drive-5-scaled.jpg",
        "alt": "Safari vehicle travelling along a track through green bush",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Game Drive/6-4.jpg",
        "alt": "Antelope beside a bush track",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Game Drive/Game-drive-10-1-scaled.jpg",
        "alt": "Close view of a zebra in the bush",
        "kind": "destination",
        "verified": true
      }
    ],
    "highlights": [
      "Guided wildlife observation",
      "Bush landscapes",
      "Photography opportunities"
    ],
    "location": "Local Zambezi National Park option; other reserves vary",
    "bestTime": "Morning or afternoon options; confirm departure",
    "recommendedFor": "Wildlife observation from a safari vehicle",
    "relatedExperienceSlugs": [
      "chobe-day-trip",
      "sunset-cruise",
      "victoria-falls-tour"
    ]
  },
  "chobe-day-trip": {
    "startingPrice": 185,
    "referenceSlug": "chobe-day-safari",
    "priceContext": null,
    "gallery": [
      {
        "src": "/mzilikazi imgs/Experiences/Chobe Day Trip_/Chobe-1-1-scaled.jpg",
        "alt": "Safari boat on the Chobe River in evening light",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Chobe Day Trip_/Chobe-4-scaled.jpg",
        "alt": "Safari vehicle beside a crocodile near a tree",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Chobe Day Trip_/Small-chobezi-boat-1.jpg",
        "alt": "Covered safari boat on the Chobe River",
        "kind": "destination",
        "verified": true
      }
    ],
    "highlights": [
      "Botswana landscapes",
      "River and land viewing options",
      "Wildlife habitat"
    ],
    "location": "Chobe National Park and Chobe River, Botswana",
    "bestTime": "Reserve the day; confirm pickup and return times",
    "recommendedFor": "A wildlife-focused cross-border outing",
    "relatedExperienceSlugs": [
      "game-drive",
      "sunset-cruise",
      "victoria-falls-tour"
    ]
  },
  "bungee-jump": {
    "startingPrice": 160,
    "referenceSlug": "bungee-jump",
    "priceContext": null,
    "gallery": [
      {
        "src": "/mzilikazi imgs/Experiences/Bungee Jump_/Bungee-8.jpg",
        "alt": "Victoria Falls Bridge above the gorge with a bungee cord below",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Bungee Jump_/Bungee-1-scaled.jpg",
        "alt": "Bungee jumper extended above the river",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Bungee Jump_/1-1.jpg",
        "alt": "Harnessed participant on the bridge platform before a jump",
        "kind": "destination",
        "verified": true
      }
    ],
    "highlights": [
      "Bridge and gorge setting",
      "Operator briefing",
      "Cord-assisted jump"
    ],
    "location": "Victoria Falls Bridge over the Zambezi gorge",
    "bestTime": "Confirm the appointment and weather arrangements",
    "recommendedFor": "Adventure travellers who meet operator requirements",
    "relatedExperienceSlugs": [
      "zip-line",
      "victoria-falls-tour",
      "sunset-cruise"
    ]
  },
  "zip-line": {
    "startingPrice": null,
    "referenceSlug": null,
    "priceContext": null,
    "gallery": [
      {
        "src": "/mzilikazi imgs/Experiences/Zip Line_/5-1.jpg",
        "alt": "Harnessed rider suspended from a zip line cable near the bridge",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Zip Line_/Bridge-Slide-1-scaled.jpg",
        "alt": "Zip line rider above the green gorge near Victoria Falls Bridge",
        "kind": "destination",
        "verified": true
      },
      {
        "src": "/mzilikazi imgs/Experiences/Zip Line_/Bridge-slide-8.jpg",
        "alt": "Zip line ride with the bridge and gorge in view",
        "kind": "destination",
        "verified": true
      }
    ],
    "highlights": [
      "Harnessed cable ride",
      "Views over the gorge",
      "Operator safety briefing"
    ],
    "location": "Pictured option: Victoria Falls Bridge Slide",
    "bestTime": "Confirm the appointment and weather arrangements",
    "recommendedFor": "Guests interested in a cable ride who meet operator requirements",
    "relatedExperienceSlugs": [
      "bungee-jump",
      "victoria-falls-tour",
      "game-drive"
    ]
  },
  "village-cultural-visit": {
    "startingPrice": 45,
    "referenceSlug": "local-village-tour",
    "priceContext": null,
    "gallery": [],
    "highlights": [
      "Listening and conversation",
      "Learning about local life",
      "Host-led arrangements"
    ],
    "location": "Host community and visit location to be confirmed",
    "bestTime": "Agree timing with the host and organiser",
    "recommendedFor": "Respectful learning about local culture",
    "relatedExperienceSlugs": [
      "boma-dinner",
      "victoria-falls-tour",
      "sunset-cruise"
    ]
  }
};
export const experiences: Experience[] = experienceEntries.map(entry => {
  const presentation = experiencePresentation[entry.slug as keyof typeof experiencePresentation];
  const guide = experienceGuides[entry.slug] ?? null;
  return {
    ...entry, ...presentation,
    guide,
    ...(guide ? {
      duration: guide.duration, expect: guide.overview, plan: guide.pickupInformation,
      check: guide.beforeYouGo, enjoy: guide.goodFor.join(' · '),
      practicalNote: guide.operatingTimes, inclusions: guide.usuallyIncluded,
      exclusions: guide.possibleAdditionalCosts, sources: guide.sources,
    } : {}),
    faqs: entry.faqs as [string, string][],
    media: entry.media,
    gallery: [...(entry.media ? [entry.media] : []), ...presentation.gallery] as PropertyMedia[],
    priceUnit: 'per person',
    priceSource: presentation.referenceSlug ? {project: 'Outbound Holiday', referenceSlug: presentation.referenceSlug, checkedOn: '2026-10-02'} : null,
    importantInformation: guide?.beforeYouGo ?? [entry.practicalNote],
    bookingNotes: guide?.bookingNotes ?? ['Activities are confirmed separately from your accommodation booking.'],
  };
});
export const experiencePriceLabel = (experience: Experience) => experience.startingPrice == null
  ? 'Indicative price not yet verified'
  : `From US$${experience.startingPrice} ${experience.priceUnit}`;
export const experiencePricingNote = 'Prices shown are indicative and may vary depending on operator, season, availability, nationality or residency, park fees and package selected. The complete current price is confirmed before your booking is finalised.';
export const experienceEnquiryMessage = (title: string) => {
  const experience = experiences.find(e => e.title === title);
  return experience?.startingPrice != null
    ? `Hi, I’m interested in ${title}. I saw the starting price on the Mzilikazi website and would like to confirm the current price and availability.`
    : `Hi, I’m interested in ${title} during my stay at Mzilikazi. Please share the current price, availability and what is included.`;
};
export const experienceEnquiryHref = (experience: Experience) =>
  '/contact?' + new URLSearchParams({experience: experience.slug, message: experienceEnquiryMessage(experience.title)}).toString();
