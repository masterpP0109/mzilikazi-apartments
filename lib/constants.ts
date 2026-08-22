import type { NavLink } from '@/types';

// ─── Site identity ─────────────────────────────────────────────────────────────
export const SITE_NAME = 'Mzilikazi Rooms';
export const SITE_TAGLINE = 'Come for the Falls. Stay somewhere worth coming home to.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mzilikaziapartments.com';

// ─── Contact — [PLACEHOLDER — confirm with client] ────────────────────────────
export const CONTACT_EMAIL = '[PLACEHOLDER — confirm with client]';
export const CONTACT_PHONE = '[PLACEHOLDER — confirm with client]';
export const CONTACT_WHATSAPP = '[PLACEHOLDER — confirm with client]';
export const CONTACT_ADDRESS = '[PLACEHOLDER — confirm with client]';

// ─── Check-in/out — [PLACEHOLDER — confirm with client] ───────────────────────
export const CHECK_IN_TIME = '[PLACEHOLDER — confirm with client]';
export const CHECK_OUT_TIME = '[PLACEHOLDER — confirm with client]';

// ─── Location — [PLACEHOLDER — confirm with client] ───────────────────────────
export const DISTANCE_TO_FALLS = '[PLACEHOLDER — confirm with client]';
export const FOUNDING_YEAR = '[PLACEHOLDER — confirm with client]';

// ─── Navigation ────────────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: 'Rooms', href: '/apartments' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Victoria Falls', href: '/victoria-falls' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

// ─── Local services ────────────────────────────────────────────────────────────
// These are services Mzilikazi can recommend/connect guests to via trusted operators.
// [PLACEHOLDER — confirm operator names, pricing and booking links with client]
export const LOCAL_SERVICES = [
  {
    id: 'airport-transfers',
    icon: 'Plane',
    category: 'Getting Here',
    title: 'Airport Transfers',
    tagline: 'Arrive without the stress.',
    // Emotional copy targeting: first-time visitors, families, anyone nervous about logistics
    body:
      "Victoria Falls International Airport is your gateway — but what happens after you land matters. We connect you with trusted local drivers who know the roads, know the town, and will be waiting for you by name. No haggling, no uncertainty, no standing outside wondering what to do next.",
    benefit: 'Start your holiday the moment you land, not the moment you figure out transport.',
    icon_bg: 'bg-[#0B1B2B]',
    // [PLACEHOLDER — confirm: does Mzilikazi directly arrange or recommend? Add operator name when confirmed]
    operatorNote: '[Trusted local operator — confirm with client]',
    ctaLabel: 'Ask us about transfers',
    ctaHref: '/contact?service=airport-transfer',
    // SEO: targets "airport transfer Victoria Falls", "Victoria Falls airport pickup"
  },
  {
    id: 'guided-tours',
    icon: 'Binoculars',
    category: 'Guided Experiences',
    title: 'Guided Tours of the Falls',
    tagline: 'See more. Understand more.',
    body:
      "A guided tour of Victoria Falls is genuinely different to walking in alone. The right guide takes you to the viewpoints you would otherwise miss, explains the geology, the history, the seasons, and the meaning of Mosi-oa-Tunya. We recommend local guides who have grown up with these Falls — not just read about them.",
    benefit: 'The Falls are more powerful when you understand what you are looking at.',
    icon_bg: 'bg-[#0B1B2B]',
    operatorNote: '[Trusted local guide — confirm with client]',
    ctaLabel: 'Arrange a guided tour',
    ctaHref: '/contact?service=guided-tour',
  },
  {
    id: 'whitewater-rafting',
    icon: 'Waves',
    category: 'Adventure',
    title: 'White-Water Rafting',
    tagline: 'The Zambezi. One of the world\'s greatest rivers.',
    body:
      "The Zambezi's Batoka Gorge is widely considered among the best white-water rafting stretches on the planet. The rapids — some graded Class 5 — are demanding, extraordinary and completely unforgettable. We connect guests with experienced, safety-certified operators who have run these waters for years. Full-day and half-day options are available.",
    benefit: 'The kind of day you will still be talking about years from now.',
    icon_bg: 'bg-[#0B1B2B]',
    operatorNote: '[Certified rafting operator — confirm with client]',
    ctaLabel: 'Book rafting',
    ctaHref: '/contact?service=rafting',
    // SEO: targets "white water rafting Victoria Falls", "Zambezi rafting"
  },
  {
    id: 'bungee-jumping',
    icon: 'ArrowDown',
    category: 'Adventure',
    title: 'Bungee Jumping',
    tagline: 'Off the Victoria Falls Bridge. 111 metres.',
    body:
      "The Victoria Falls Bridge jump is one of the most iconic bungee sites in the world — a 111-metre free fall over the Batoka Gorge, with the Zambezi below and the spray of the Falls in the air around you. Whether it is on your bucket list or you are doing it to prove something to yourself, this is one that delivers. We can connect you with the operator directly.",
    benefit: 'You will remember where you were standing the moment you jumped.',
    icon_bg: 'bg-[#0B1B2B]',
    operatorNote: '[Victoria Falls Bridge bungee operator — confirm with client]',
    ctaLabel: 'Ask about bungee',
    ctaHref: '/contact?service=bungee',
  },
  {
    id: 'helicopter-flights',
    icon: 'Wind',
    category: 'Adventure',
    title: 'Helicopter Flights',
    tagline: 'The Flight of Angels.',
    body:
      "The local name for a helicopter flight over Victoria Falls is \"The Flight of Angels\" — and it is earned. From above, the full scale of the Falls becomes visible in a way that is impossible to grasp from the ground. A 12–15 minute flight transforms how you understand the landscape you have been visiting. Book early: these flights fill quickly.",
    benefit: "You've stood at the edge. Now see the whole picture.",
    icon_bg: 'bg-[#0B1B2B]',
    operatorNote: '[Helicopter operator — confirm with client]',
    ctaLabel: 'Arrange a flight',
    ctaHref: '/contact?service=helicopter',
  },
  {
    id: 'game-drives',
    icon: 'Footprints',
    category: 'Wildlife',
    title: 'Game Drives & Safaris',
    tagline: 'Lions, elephants and the African bush — within reach.',
    body:
      "Chobe National Park in Botswana is a day trip from Victoria Falls and is one of the highest-density elephant populations on the continent. Hwange National Park and Zambezi National Park offer game drives closer to home. We can help connect you with trusted local operators for half-day and full-day game drives — choose your own pace.",
    benefit: 'The Falls are extraordinary. The wildlife around them is just as much a reason to be here.',
    icon_bg: 'bg-[#0B1B2B]',
    operatorNote: '[Game drive operator — confirm with client]',
    ctaLabel: 'Ask about game drives',
    ctaHref: '/contact?service=game-drive',
  },
  {
    id: 'zambezi-sunset-cruise',
    icon: 'Sunset',
    category: 'Leisure',
    title: 'Zambezi Sunset Cruise',
    tagline: 'Elephants at the water\'s edge. Sundowner in hand.',
    body:
      "A sunset cruise on the Upper Zambezi is one of the most quietly spectacular experiences in Victoria Falls. The light at that hour, the hippos surfacing, the elephants drinking along the banks — it is unhurried, beautiful and exactly the kind of thing that makes a trip feel like more than a collection of activities. Worth every minute.",
    benefit: 'The kind of evening that makes you wish the trip was longer.',
    icon_bg: 'bg-[#0B1B2B]',
    operatorNote: '[Sunset cruise operator — confirm with client]',
    ctaLabel: 'Reserve a cruise',
    ctaHref: '/contact?service=sunset-cruise',
  },
  {
    id: 'cultural-experiences',
    icon: 'Users',
    category: 'Culture',
    title: 'Cultural Experiences',
    tagline: 'Zimbabwe beyond the postcard.',
    body:
      "Victoria Falls town has craft markets, local restaurants, the Boma dinner experience, and cultural village visits that give you a genuine sense of Zimbabwean hospitality and life. Our team knows what is worth your time and what to skip. Ask us for honest local recommendations — not just the obvious tourist stops.",
    benefit: 'Leave knowing you actually saw Zimbabwe, not just its waterfall.',
    icon_bg: 'bg-[#0B1B2B]',
    operatorNote: '[Cultural experience partner — confirm with client]',
    ctaLabel: 'Get local recommendations',
    ctaHref: '/contact?service=culture',
  },
  {
    id: 'private-chef',
    icon: 'ChefHat',
    category: 'Dining',
    title: 'Private Chef Hire',
    tagline: 'Your kitchen. A professional at the stove.',
    // Emotional copy: couples wanting something special, families wanting ease,
    // groups celebrating occasions, anyone who doesn't want to cook on holiday
    body:
      "You have the kitchen. You have the space. And if you would rather spend the evening enjoying a meal than preparing it, we can connect you with a private chef who will come to the apartment, cook in your kitchen, and leave you with a proper dining experience — no restaurant booking, no rushing, no shared tables. Ideal for a special occasion, a relaxed family dinner, or simply a night where you want someone else to handle it.",
    benefit: 'The apartment becomes the restaurant. The evening becomes the occasion.',
    icon_bg: 'bg-[#0B1B2B]',
    // [PLACEHOLDER — confirm: does Mzilikazi directly arrange chef hire or recommend a local contact?]
    operatorNote: '[Private chef — confirm with client: local chef contact or referral network]',
    ctaLabel: 'Ask about a private chef',
    ctaHref: '/contact?service=private-chef',
    // SEO: targets "private chef hire Victoria Falls", "in-apartment dining Victoria Falls"
  },
];

// ─── Service categories for filtering ─────────────────────────────────────────
export const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Experiences' },
  { id: 'Getting Here', label: 'Getting Here' },
  { id: 'Adventure', label: 'Adventure' },
  { id: 'Wildlife', label: 'Wildlife' },
  { id: 'Guided Experiences', label: 'Guided' },
  { id: 'Leisure', label: 'Leisure' },
  { id: 'Culture', label: 'Culture' },
  { id: 'Dining', label: 'Dining' },
];

// ─── Trust pillars ─────────────────────────────────────────────────────────────
export const TRUST_PILLARS = [
  {
    icon: 'UtensilsCrossed',
    title: 'Self-Catering Freedom',
    description:
      'Fully equipped kitchens so you eat on your schedule, not ours. Cook, snack, or simply brew your own morning coffee.',
  },
  {
    icon: 'MapPin',
    title: 'Prime Location',
    description:
      'Positioned close to Victoria Falls — your adventure is always within reach, and so is a quiet place to return to.',
  },
  {
    icon: 'Home',
    title: 'Room & Kitchen Space',
    description:
      'Real living space for couples, families and groups. Separate bedrooms, a kitchen, a lounge to decompress in, and room to breathe.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Reliable Hospitality',
    description:
      'A local team that knows Victoria Falls, responds quickly and genuinely wants your visit to go well.',
  },
];

// ─── FAQ data ──────────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    question: 'What does self-catering mean for my stay?',
    answer:
      'Self-catering means your apartment comes with a fully equipped kitchen so you can prepare your own meals. There is no restaurant on site — instead you have the freedom and flexibility to cook when you like, order in, or explore local restaurants.',
  },
  {
    question: 'How close are you to Victoria Falls?',
    answer:
      '[PLACEHOLDER — confirm with client: insert actual distance and estimated travel time to the Falls entrance gate]',
  },
  {
    question: 'What is your check-in and check-out time?',
    answer:
      'Check-in is from [PLACEHOLDER — confirm with client] and check-out is by [PLACEHOLDER — confirm with client]. Early check-in and late check-out may be available on request, subject to availability.',
  },
  {
    question: 'How many guests can each apartment accommodate?',
    answer:
      '[PLACEHOLDER — confirm with client: list each apartment with its maximum guest capacity]',
  },
  {
    question: 'Is parking available?',
    answer:
      '[PLACEHOLDER — confirm with client: confirm whether on-site parking is available and whether it is free or charged]',
  },
  {
    question: 'Do you have Wi-Fi?',
    answer:
      'Yes, complimentary Wi-Fi is available throughout the property. [PLACEHOLDER — confirm with client: confirm Wi-Fi speed or any limitations]',
  },
  {
    question: 'Can I book for a group or a family with children?',
    answer:
      'Absolutely. Our apartments are well-suited to families and small groups. Please mention any specific requirements — such as a cot for a young child — when making your enquiry.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      '[PLACEHOLDER — confirm with client: insert your confirmed cancellation and refund policy]',
  },
  {
    question: 'Can you help arrange airport transfers?',
    answer:
      "Yes. We connect guests with trusted local drivers so you are collected from Victoria Falls International Airport and brought directly to us — no haggling, no standing outside wondering what happens next. Let us know your flight details when you make your enquiry and we will sort it. [PLACEHOLDER — confirm with client: confirm transfer service is available and add operator details]",
  },
  {
    question: 'Can you help arrange activities and tours?',
    answer:
      "Absolutely. We have connections with trusted local operators for guided Falls tours, white-water rafting, bungee jumping off the Victoria Falls Bridge, helicopter flights, game drives to Chobe and Hwange, Zambezi sunset cruises, private chef hire and more. We will not push you towards operators we do not trust — these are recommendations we stand behind. Mention what you are interested in on your enquiry and we will help you plan. [PLACEHOLDER — confirm with client: confirm which services are actively arranged vs simply recommended]",
  },
  {
    question: 'Can I hire a private chef for the apartment?',
    answer:
      "Yes. We can connect you with a trusted local chef who will come to your apartment, cook in the kitchen and give you a proper dining experience without leaving. Whether it is a special occasion, a relaxed family dinner or simply a night where you want someone else to handle the cooking — just let us know when you enquire and we will arrange it. [PLACEHOLDER — confirm with client: confirm chef hire is available and add details of the arrangement]",
  },
  {
    question: 'How do I make a booking?',
    answer:
      'Use the enquiry form on this site or reach us directly via WhatsApp or email. We will confirm availability and guide you through the booking process. [PLACEHOLDER — confirm with client: confirm whether an online booking system will be integrated]',
  },
];

// ─── What's included tiles ─────────────────────────────────────────────────────
export const OFFER_TILES = [
  {
    icon: 'UtensilsCrossed',
    title: 'Fully Equipped Kitchen',
    // Kitchen copy now flags chef hire as an option — self-catering OR private chef
    description:
      'Hob, fridge, microwave, cookware and utensils. Cook yourself, or ask us to arrange a private chef. [PLACEHOLDER — confirm with client: full kitchen spec]',
  },
  {
    icon: 'Wifi',
    title: 'Complimentary Wi-Fi',
    description: 'Stay connected throughout your stay at no extra cost.',
  },
  {
    icon: 'Waves',
    title: 'Linen & Towels',
    description:
      'Fresh linen and towels provided. Housekeeping available. [PLACEHOLDER — confirm with client: housekeeping schedule]',
  },
  {
    icon: 'Car',
    title: 'Parking',
    description:
      '[PLACEHOLDER — confirm with client: confirm parking availability and any charges]',
  },
  {
    icon: 'Thermometer',
    title: 'Air Conditioning',
    description:
      '[PLACEHOLDER — confirm with client: confirm AC availability in all units]',
  },
  {
    icon: 'ShieldCheck',
    title: 'Secure Property',
    description:
      '[PLACEHOLDER — confirm with client: describe security features — gating, guards, cameras etc.]',
  },
];
