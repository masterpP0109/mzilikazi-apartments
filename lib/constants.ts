import type { NavLink } from '@/types';

// ─── Site identity & Positioning ───────────────────────────────────────────────
export const SITE_NAME = 'Mzilikazi Guest Lodge';
export const SITE_TAGLINE = 'The Connected Victoria Falls Home Base';
export const BRAND_PROMISE = 'We make Victoria Falls easier to experience.';
export const BRAND_SUBTITLE = 'Stay comfortably. Explore confidently. Have local help when you need it.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mzilikaziapartments.com';

// ─── Contact Information ────────────────────────────────────────────────────────
export const CONTACT_EMAIL = 'info@mzilikaziapartments.com';
export const CONTACT_PHONE = '+263 77 000 0000';
export const CONTACT_WHATSAPP = '+263 77 000 0000';
export const CONTACT_ADDRESS = 'Victoria Falls, Matabeleland North, Zimbabwe';

// ─── Check-in/out & Facilities ──────────────────────────────────────────────────
export const CHECK_IN_TIME = '14:00';
export const CHECK_OUT_TIME = '10:00';
export const DISTANCE_TO_FALLS = 'A short drive to Victoria Falls National Park entrance';
export const FOUNDING_YEAR = '2023';

// ─── Navigation Links ───────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: 'Rooms & Suites', href: '/apartments' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Families & Groups', href: '/family-group-accommodation-victoria-falls' },
  { label: 'Corporate Stays', href: '/corporate-stays-victoria-falls' },
  { label: 'Victoria Falls Guide', href: '/victoria-falls' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

// ─── Four Content Pillars (STAY, EXPERIENCE, KNOW, ASK) ─────────────────────────
export const BRAND_PILLARS = [
  {
    code: 'STAY',
    title: 'Comfortable Home Base',
    subtitle: 'Space to settle in',
    description: 'Spacious 2-bedroom units, private lounges, full self-catering kitchens, reliable Wi-Fi, solar backup and restful gardens.',
  },
  {
    code: 'EXPERIENCE',
    title: 'Curated Activities',
    subtitle: 'Signature Victoria Falls & Chobe',
    description: 'From guided Falls tours and Zambezi cruises to cross-border Chobe day safaris and authentic cultural village visits.',
  },
  {
    code: 'KNOW',
    title: 'Destination Guidance',
    subtitle: 'Clear, honest local advice',
    description: 'Transparent guidance on visas, currency, transfers, seasonal flows, and where to go in Victoria Falls without the guesswork.',
  },
  {
    code: 'ASK',
    title: 'Connected Support',
    subtitle: 'Digital Concierge + Local Team',
    description: 'Always-on digital planning tools backed by fast WhatsApp responses and genuine Zimbabwean on-site hospitality.',
  },
];

// ─── Local Services & Experiences (Signature 4 + Secondary) ────────────────────
export const LOCAL_SERVICES = [
  // ── 1. SIGNATURE ANCHOR: Victoria Falls Guided Tour ──
  {
    id: 'victoria-falls-tour',
    icon: 'Binoculars',
    category: 'Sightseeing',
    isSignature: true,
    title: 'Guided Tour of Victoria Falls',
    tagline: 'Mosi-oa-Tunya. The Smoke That Thunders.',
    body:
      "A guided tour of Victoria Falls transforms a simple walk into an unforgettable immersion. Experienced local guides walk you through every key viewpoint, explain the geological history of the Batoka Gorge, share folklore of Mosi-oa-Tunya, and show you when and where the rainbows appear.",
    benefit: 'Understand the power, history, and viewpoints of the world’s largest curtain of falling water.',
    icon_bg: 'bg-[#0B1B2B]',
    pageHref: '/experiences/victoria-falls-tour',
    ctaLabel: 'View Falls tour details',
    ctaHref: '/experiences/victoria-falls-tour',
  },
  // ── 2. SIGNATURE ANCHOR: Chobe Day Trip (Botswana) ──
  {
    id: 'chobe-day-trip',
    icon: 'Footprints',
    category: 'Wildlife',
    isSignature: true,
    title: 'Chobe National Park Day Safari',
    tagline: 'Cross the border into Botswana’s elephant kingdom.',
    body:
      "Chobe National Park in Botswana holds one of Africa's densest elephant populations. This full-day cross-border safari includes road transfers from Mzilikazi, border assistance, a morning boat cruise on the Chobe River among hippos and buffalos, a buffet lunch, and an afternoon 4x4 open-vehicle game drive.",
    benefit: 'Add a second country and a world-class river safari to your Victoria Falls itinerary in one seamless day.',
    icon_bg: 'bg-[#0B1B2B]',
    pageHref: '/experiences/chobe-day-trip',
    ctaLabel: 'View Chobe trip details',
    ctaHref: '/experiences/chobe-day-trip',
  },
  // ── 3. SIGNATURE ANCHOR: Village & Cultural Experience ──
  {
    id: 'village-cultural-visit',
    icon: 'Users',
    category: 'Culture',
    isSignature: true,
    title: 'Village & Cultural Visit',
    tagline: 'Zimbabwe beyond the postcard — people, traditions & community.',
    body:
      "Victoria Falls is not only something to look at; it is a vibrant community where people live. Step beyond the tourist trail with a respectful guided visit to a local rural village. Meet local craftspeople, learn about traditional homestead life, taste local cuisine, and experience genuine Zimbabwean warmth.",
    benefit: 'Connect meaningfully with the local heritage, traditions, and families of the Matabeleland region.',
    icon_bg: 'bg-[#0B1B2B]',
    pageHref: '/experiences/village-cultural-visit',
    ctaLabel: 'View Village visit details',
    ctaHref: '/experiences/village-cultural-visit',
  },
  // ── 4. SIGNATURE ANCHOR: Zambezi Sunset Cruise ──
  {
    id: 'zambezi-sunset-cruise',
    icon: 'Sunset',
    category: 'Leisure',
    isSignature: true,
    title: 'Zambezi River Sunset Cruise',
    tagline: 'Sundowners on the Upper Zambezi as elephants drink.',
    body:
      "Drift along the calm waters of the Upper Zambezi above the Falls as the African sun sets in deep golds and ochres. Enjoy drinks and canapés while watching hippos surface, crocodiles bask on sandbanks, and birdlife soar overhead. The definitive Victoria Falls evening ritual.",
    benefit: 'The perfect, unhurried evening to unwind and soak in the tranquil beauty of the Zambezi.',
    icon_bg: 'bg-[#0B1B2B]',
    pageHref: '/contact?service=zambezi-sunset-cruise',
    ctaLabel: 'Ask about sunset cruise',
    ctaHref: '/contact?service=zambezi-sunset-cruise',
  },
  // ── Secondary Tier: Airport & Transfers ──
  {
    id: 'airport-transfers',
    icon: 'Plane',
    category: 'Getting Here',
    isSignature: false,
    title: 'Airport & Inter-City Transfers',
    tagline: 'Arrive smoothly without transport stress.',
    body:
      "Victoria Falls International Airport is your gateway. We connect you with trusted, punctual drivers who meet you by name inside arrivals. We also arrange cross-border transfers to Livingstone (Zambia) and Kasane (Botswana).",
    benefit: 'Start your trip relaxed the moment your flight lands.',
    icon_bg: 'bg-[#0B1B2B]',
    ctaLabel: 'Arrange airport transfer',
    ctaHref: '/contact?service=airport-transfers',
  },
  // ── Secondary Tier: Helicopter Flights ──
  {
    id: 'helicopter-flights',
    icon: 'Wind',
    category: 'Adventure',
    isSignature: false,
    title: 'Helicopter Flights (Flight of Angels)',
    tagline: 'The full spectacle of the Falls from above.',
    body:
      "From the air, the sheer geological marvel of Victoria Falls and the zigzagging Batoka Gorge reveals its true magnitude. A 12–15 minute or 25-minute scenic helicopter flight offers panoramic views that ground viewpoints cannot match.",
    benefit: 'Grasp the breathtaking scale of the Falls and Zambezi gorge from the air.',
    icon_bg: 'bg-[#0B1B2B]',
    ctaLabel: 'Book helicopter flight',
    ctaHref: '/contact?service=helicopter-flights',
  },
  // ── Secondary Tier: White-Water Rafting ──
  {
    id: 'whitewater-rafting',
    icon: 'Waves',
    category: 'Adventure',
    isSignature: false,
    title: 'Zambezi White-Water Rafting',
    tagline: 'World-renowned Class 5 rapids in the Batoka Gorge.',
    body:
      "Tackle one of the world's premier white-water rivers. Led by seasoned, safety-certified river guides, run legendary rapids like 'The Terminator', 'Oblivion', and 'Gulliver’s Travels' nestled deep within the dramatic canyon.",
    benefit: 'One of the most thrilling adventure experiences in all of Africa.',
    icon_bg: 'bg-[#0B1B2B]',
    ctaLabel: 'Book rafting',
    ctaHref: '/contact?service=whitewater-rafting',
  },
  // ── Secondary Tier: Bungee & Bridge Swing ──
  {
    id: 'bungee-jumping',
    icon: 'ArrowDown',
    category: 'Adventure',
    isSignature: false,
    title: 'Victoria Falls Bridge Bungee & Swing',
    tagline: '111-metre freefall over the Zambezi Gorge.',
    body:
      "Plunge from the historic Victoria Falls Bridge suspended 111 metres above the rushing Zambezi River with the spray of the Falls swirling in the background. Bungee, bridge swing, and zip-line options available.",
    benefit: 'An iconic bucket-list jump at one of the world’s most scenic locations.',
    icon_bg: 'bg-[#0B1B2B]',
    ctaLabel: 'Ask about bungee',
    ctaHref: '/contact?service=bungee-jumping',
  },
  // ── Secondary Tier: Game Drives & Safaris ──
  {
    id: 'game-drives',
    icon: 'Footprints',
    category: 'Wildlife',
    isSignature: false,
    title: 'Zambezi & Hwange Game Drives',
    tagline: 'Lions, leopards and African wildlife close by.',
    body:
      "Explore the nearby Zambezi National Park for morning or afternoon game drives, or embark on a day excursion to Hwange National Park, renowned for massive herds of buffalo, elephants, and predatory big cats.",
    benefit: 'Experience prime wildlife habitats with certified safari trackers.',
    icon_bg: 'bg-[#0B1B2B]',
    ctaLabel: 'Ask about game drives',
    ctaHref: '/contact?service=game-drives',
  },
  // ── Secondary Tier: In-Apartment Private Chef ──
  {
    id: 'private-chef',
    icon: 'ChefHat',
    category: 'Dining',
    isSignature: false,
    title: 'Private In-Apartment Chef Hire',
    tagline: 'Your kitchen, your dining table, a private chef.',
    body:
      "Enjoy the flexibility of self-catering or elevate an evening with a professional local chef preparing fresh Zimbabwean delicacies right in your apartment kitchen. Perfect for family celebrations, romantic dinners, or relaxed post-safari evenings.",
    benefit: 'Restaurant-quality dining in the privacy and comfort of your own living room.',
    icon_bg: 'bg-[#0B1B2B]',
    ctaLabel: 'Book private chef',
    ctaHref: '/contact?service=private-chef',
  },
];

// ─── Service categories for filter tabs ────────────────────────────────────────
export const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Experiences' },
  { id: 'Sightseeing', label: 'Sightseeing' },
  { id: 'Wildlife', label: 'Wildlife & Safari' },
  { id: 'Culture', label: 'Culture & Heritage' },
  { id: 'Leisure', label: 'Leisure' },
  { id: 'Adventure', label: 'Adventure' },
  { id: 'Getting Here', label: 'Transfers' },
  { id: 'Dining', label: 'Dining' },
];

// ─── Trust Pillars for Homepage ────────────────────────────────────────────────
export const TRUST_PILLARS = [
  {
    icon: 'Home',
    title: 'Real Space & Self-Catering',
    description:
      'Spacious 2-bedroom units with full kitchens and private lounges — so families and groups spread out comfortably without booking multiple cramped hotel rooms.',
  },
  {
    icon: 'MapPin',
    title: 'Your Connected Home Base',
    description:
      'Grounded in Victoria Falls, Zimbabwe. A peaceful, secure sanctuary to rest, plan, and explore without inflated tourist premiums.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Personal & Digital Concierge',
    description:
      'Get fast, always-on answers via our Digital Concierge, backed by priority WhatsApp support from real local hosts who genuinely care.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Curated & Vetted Logistics',
    description:
      'Airport pickups, cross-border Chobe day safaris, village visits, and adventure bookings with operators we personally trust.',
  },
];

// ─── Direct Booking Advantages ─────────────────────────────────────────────────
export const DIRECT_BOOKING_BENEFITS = [
  {
    title: 'Priority WhatsApp Concierge',
    description: 'Instant communication with our team before arrival and throughout your stay.',
  },
  {
    title: 'Seamless Trip Planning',
    description: 'We help connect your accommodation with Chobe, Falls tours, and airport transfers.',
  },
  {
    title: 'Airport Transfer Coordination',
    description: 'Have a vetted driver holding your name at arrivals — no haggling or stress.',
  },
  {
    title: 'Corporate Invoicing & Receipts',
    description: 'Fast, itemized invoicing and receipts for business and conference delegates.',
  },
  {
    title: 'Flexible Room Matching',
    description: 'Personal assistance choosing the exact layout to fit your family or group setup.',
  },
  {
    title: 'Direct Rate Transparency',
    description: 'Clear pricing without hidden third-party commission surcharges.',
  },
];

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    question: 'Why choose Mzilikazi Guest Lodge over a standard hotel?',
    answer:
      'Standard hotels charge per room, splitting families across separate corridors with no shared living area. Mzilikazi provides spacious self-catering suites featuring two bedrooms, private lounges, and fully equipped kitchens. You enjoy privacy, space to unpack, the ability to prepare meals or hire a private chef, and our hands-on local concierge.',
  },
  {
    question: 'How does Mzilikazi help me plan my Victoria Falls trip?',
    answer:
      'We act as your connected home base. Before you even arrive, our Digital Concierge and WhatsApp team help coordinate airport pickups, guided Falls tours, Chobe day trips, sunset cruises, and local restaurant reservations. You arrive with a clear plan, knowing a local team has your back.',
  },
  {
    question: 'Can you organize a day trip to Chobe National Park in Botswana?',
    answer:
      'Yes! Chobe is one of Africa’s premier elephant sanctuaries and is an easy day trip from Victoria Falls. We coordinate the full package: morning pickup from Mzilikazi, border transfer, boat cruise on the Chobe River, buffet lunch, and an afternoon 4x4 safari in Chobe National Park.',
  },
  {
    question: 'Are the apartments suitable for families with children?',
    answer:
      'Extremely suitable. Our suites have separate bedrooms and living rooms, giving parents privacy and kids room to play. The kitchen allows you to prepare child-friendly meals and snacks anytime. We can also provide cots on request and recommend family-appropriate activities.',
  },
  {
    question: 'Do you cater to corporate travellers and conference delegates?',
    answer:
      'Yes. Victoria Falls hosts major international summits, MICE conferences, and business meetings. We provide fast Wi-Fi, dedicated work tables, quiet sleeping quarters, early departure breakfasts upon request, airport/venue shuttle coordination, and official VAT/corporate invoicing.',
  },
  {
    question: 'Do you have backup electricity (solar/generator) and reliable Wi-Fi?',
    answer:
      'Yes. We understand the importance of connectivity and comfort. The property features solar power backup and reliable high-speed Wi-Fi across the rooms and grounds.',
  },
  {
    question: 'What is the check-in and check-out procedure?',
    answer:
      'Check-in is from 14:00 and check-out is by 10:00. If you arrive early or have a late flight or safari, we provide secure luggage holding. Early check-in or late check-out can be arranged based on availability.',
  },
  {
    question: 'How do airport transfers work?',
    answer:
      'When you book directly with us, you can include airport pickup. A trusted, vetted local driver will wait inside the arrivals hall with your nameplate and bring you directly to the lodge.',
  },
];

// ─── What's included tiles ─────────────────────────────────────────────────────
export const OFFER_TILES = [
  {
    icon: 'UtensilsCrossed',
    title: 'Full Self-Catering Kitchen',
    description: 'Cookware, stove, fridge, kettle and microwave. Cook at your leisure or hire a private chef.',
  },
  {
    icon: 'Wifi',
    title: 'High-Speed Wi-Fi & Solar Backup',
    description: 'Reliable connection for leisure and corporate work with uninterrupted solar power backup.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Local Trip Concierge',
    description: 'Personalized coordination for airport transfers, Chobe safaris, guided tours, and dining.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Secure Gated Compound',
    description: '24/7 peace of mind with secure boundary fencing, on-site personnel, and private parking.',
  },
  {
    icon: 'Thermometer',
    title: 'Air Conditioning & Fans',
    description: 'Climate-controlled bedrooms to ensure cool, restful sleep after warm days in the gorge.',
  },
  {
    icon: 'Briefcase',
    title: 'Work Friendly & Corporate Ready',
    description: 'Work desks, quiet ambiance, corporate invoicing, and shuttle arrangements for delegates.',
  },
];
