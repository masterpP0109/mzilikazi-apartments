import type { PropertyMedia } from "./property";
export const travellerTypes = [
  {
    id: "Family",
    title: "Family Holiday",
    description: "Room for everyone, and a day that works for different ages.",
    reasons:
      "Tell us about children’s ages, bedrooms and the space you need between outings.",
    cta: "Explore Family Stays",
    href: "/family-group-accommodation-victoria-falls",
    media: null as PropertyMedia | null,
  },
  {
    id: "Couple",
    title: "Couple’s Getaway",
    description: "A few days together, with time left open.",
    reasons:
      "Start with your sleeping preferences, a relaxed pace and the experiences you want to share.",
    cta: "Explore Couple Stays",
    href: "/plan?traveller=Couple",
    media: null as PropertyMedia | null,
  },
  {
    id: "Friends",
    title: "Friends & Groups",
    description: "Shared adventures. Space to find your own rhythm.",
    reasons:
      "Let us know your group size and who needs separate beds or rooms.",
    cta: "Explore Group Stays",
    href: "/family-group-accommodation-victoria-falls?traveller=Friends",
    media: null as PropertyMedia | null,
  },
  {
    id: "Work",
    title: "Work or Longer Stay",
    description: "A base for the working week, with room for time off.",
    reasons:
      "Ask about connectivity, longer-stay terms and your day-to-day needs before choosing.",
    cta: "Explore Longer Stays",
    href: "/corporate-stays-victoria-falls",
    media: null as PropertyMedia | null,
  },
];
export const stayMoments = [
  {
    title: "Morning",
    copy: "Make breakfast, take your coffee slowly and decide what the day looks like.",
    media: null as PropertyMedia | null,
  },
  {
    title: "Daytime",
    copy: "Head out for the Falls, wildlife or a wander around town. Leave room to change your mind.",
    media: null as PropertyMedia | null,
  },
  {
    title: "Evening",
    copy: "Come back to your own space. Cook, catch up and let the day settle.",
    media: null as PropertyMedia | null,
  },
];
export const interests = [
  "Victoria Falls",
  "Wildlife",
  "Adventure",
  "Relaxation",
  "Food",
  "Culture",
  "Family Time",
];
export const experienceCategories = [
  "All",
  "Iconic",
  "Wildlife",
  "Adventure",
  "Relaxed",
  "Culture",
  "Family",
];
export const dayIdeas = [
  {
    id: "first-time",
    title: "First-Time Visitor",
    stops: [
      ["Morning", "Breakfast, then time at the Falls"],
      ["Midday", "Lunch and a pause"],
      ["Afternoon", "Rest at your accommodation"],
      ["Evening", "Ask about a sunset outing"],
    ],
    experienceIds: ["victoria-falls-tour"],
  },
  {
    id: "wildlife",
    title: "Wildlife",
    stops: [
      ["Early morning", "An operator-led wildlife outing"],
      ["Midday", "Lunch and time out of the sun"],
      ["Afternoon", "Keep the afternoon open"],
      ["Evening", "Dinner and a quiet night"],
    ],
    experienceIds: ["chobe-day-trip"],
  },
  {
    id: "relaxed",
    title: "Relaxed",
    stops: [
      ["Morning", "A slow breakfast"],
      ["Midday", "Explore town at your pace"],
      ["Afternoon", "Read, rest or cook together"],
      ["Evening", "Ask about dining options"],
    ],
    experienceIds: [],
  },
  {
    id: "adventure",
    title: "Adventure",
    stops: [
      ["Morning", "An adventure activity that suits your group"],
      ["Midday", "Lunch and recovery time"],
      ["Afternoon", "A gentle outing or rest"],
      ["Evening", "Share stories over dinner"],
    ],
    experienceIds: [],
  },
  {
    id: "family",
    title: "Family",
    stops: [
      ["Morning", "Breakfast and a short outing"],
      ["Midday", "Lunch before everyone gets tired"],
      ["Afternoon", "Downtime together"],
      ["Evening", "An easy dinner and an early night"],
    ],
    experienceIds: ["victoria-falls-tour"],
  },
];
export const itineraries = [
  {
    id: "two-nights",
    nights: 2,
    title: "Victoria Falls Introduction",
    description: "A first look, with a little breathing room.",
    days: [
      {
        title: "Arrive and settle in",
        copy: "Keep arrival day light. Ask about transfers and groceries before you travel.",
      },
      {
        title: "Make time for the Falls",
        copy: "Explore the viewpoints at a pace that suits you. Leave the afternoon for rest or another short outing.",
      },
      {
        title: "One last slow morning",
        copy: "Have breakfast and allow time for your onward journey.",
      },
    ],
    experienceIds: ["victoria-falls-tour"],
  },
  {
    id: "three-nights",
    nights: 3,
    title: "Victoria Falls + Wildlife",
    description: "The Falls, a wildlife idea and time to come home.",
    days: [
      {
        title: "Arrive without a rush",
        copy: "Settle in and talk through the next few days.",
      },
      {
        title: "Explore the Falls",
        copy: "Make the Falls your main outing, with the afternoon left open.",
      },
      {
        title: "A day for wildlife",
        copy: "Discuss a Chobe day trip or a closer wildlife option. Confirm operator details and any border requirements.",
      },
      {
        title: "Breakfast and departure",
        copy: "Leave room for packing and your transfer.",
      },
    ],
    experienceIds: ["victoria-falls-tour", "chobe-day-trip"],
  },
  {
    id: "five-nights",
    nights: 5,
    title: "Take Your Time",
    description: "Space for exploring, and days with fewer plans.",
    days: [
      { title: "Settle in", copy: "Keep your arrival day simple." },
      {
        title: "Start with the Falls",
        copy: "Spend time at the viewpoints and take the rest of the day slowly.",
      },
      {
        title: "Follow your interests",
        copy: "Consider wildlife or an adventure activity after discussing suitability and conditions.",
      },
      {
        title: "A day with less on it",
        copy: "Rest, cook and enjoy time together.",
      },
      {
        title: "Explore local culture",
        copy: "Ask about a respectful community visit or local food ideas.",
      },
      {
        title: "Head home",
        copy: "Allow time for breakfast and your onward journey.",
      },
    ],
    experienceIds: ["victoria-falls-tour", "village-cultural-visit"],
  },
];
export type GuideArticle = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  sections: { title: string; paragraphs: string[] }[];
  sources?: { label: string; href: string }[];
};
export const guideArticles: GuideArticle[] = [
  {
    slug: "first-time",
    sources: [
      {
        label: "ZimParks: Victoria Falls National Park",
        href: "https://www.zimparks.org.zw/victoria-falls-national-park/",
      },
    ],
    category: "Start Here",
    title: "Your first Victoria Falls trip",
    summary:
      "Start with the Falls, then build a few days around your people and your pace.",
    sections: [
      {
        title: "Begin with three decisions",
        paragraphs: [
          "Choose roughly how long you have, who is coming and the one experience you most want to make time for. You can leave the smaller decisions open.",
          "A self-catering base gives you the option of eating in and keeping some days simple. Ask for the kitchen details and sleeping arrangements of your chosen apartment before booking.",
        ],
      },
      {
        title: "Make one plan together",
        paragraphs: [
          "Save accommodation, experiences and an itinerary to My Trip. Add your dates and questions in the planner, then send the whole picture with your enquiry.",
        ],
      },
    ],
  },
  {
    slug: "when-to-visit",
    sources: [
      {
        label: "Zambia Tourism: Victoria Falls seasonal overview",
        href: "https://www.zambiatourism.com/destinations/waterfalls/victoria-falls/",
      },
    ],
    category: "Planning",
    title: "When should I visit?",
    summary:
      "Choose dates around the kind of visit you want, then check current conditions.",
    sections: [
      {
        title: "The Falls change through the year",
        paragraphs: [
          "Zambia Tourism describes March and April as the usual peak flood period, with heavy spray. As flow falls later in the year, more of the rock face and gorge can be visible. This is a seasonal pattern, not a forecast for your dates.",
        ],
      },
      {
        title: "Think about your priorities",
        paragraphs: [
          "Is your focus on the Falls, wildlife, adventure or time together? Tell us what matters most before choosing your dates.",
          "Water levels, weather and activity conditions vary. Check the latest guidance for the activities you want, rather than assuming every outing runs in the same way year-round.",
        ],
      },
      {
        title: "Keep a little flexibility",
        paragraphs: [
          "If your dates are open, select flexible dates in the planner. Include your preferred month and the amount of time you have.",
        ],
      },
    ],
  },
  {
    slug: "how-many-days",
    category: "Planning",
    title: "How many days do I need?",
    summary: "Give yourself time for the main outing and time to settle in.",
    sections: [
      {
        title: "Start with your wish list",
        paragraphs: [
          "Our two-night outline keeps the focus on the Falls. Three nights gives a wildlife day its own space. Five nights leaves room for slower days and changing plans. These are suggestions, not confirmed packages.",
        ],
      },
      {
        title: "Count travel days too",
        paragraphs: [
          "Check arrival and departure times before filling each day. Avoid putting a must-do outing too close to your flight or transfer.",
        ],
      },
    ],
  },
  {
    slug: "budget",
    category: "Planning",
    title: "How much should I budget?",
    summary:
      "Build a budget from confirmed quotes, rather than one headline price.",
    sections: [
      {
        title: "Separate your main costs",
        paragraphs: [
          "Allow for accommodation, transport, meals, activity fees and any entry or border costs that apply to your itinerary.",
          "Ask for current apartment rates and what is included. Activity and transfer quotes should identify the provider, inclusions and payment terms.",
        ],
      },
      {
        title: "Leave room for everyday spending",
        paragraphs: [
          "Self-catering can give you more choice over meals. Check kitchen facilities and grocery options before planning to cook every day. Keep a small allowance for unplanned outings.",
        ],
      },
    ],
  },
  {
    slug: "getting-here",
    category: "Planning",
    title: "Getting here",
    summary:
      "Make arrival day easier by settling the practical questions beforehand.",
    sections: [
      {
        title: "Before booking your journey",
        paragraphs: [
          "Check entry requirements for your nationality with the relevant authorities. If your trip crosses into another country, check the requirements for that part of the journey as well.",
        ],
      },
      {
        title: "Share your arrival details",
        paragraphs: [
          "Include your flight or onward travel details when asking about transfers. Confirm pickup point, passenger capacity, luggage space and the quoted cost before agreeing.",
        ],
      },
    ],
  },
  {
    slug: "getting-around",
    category: "During Your Stay",
    title: "How do I get around?",
    summary:
      "Match transport to your group, your outings and your arrival plans.",
    sections: [
      {
        title: "Plan the longer journeys first",
        paragraphs: [
          "Ask about airport transfers and activity pickup arrangements. Confirm each meeting point and return journey directly with the provider.",
        ],
      },
      {
        title: "Check the everyday details",
        paragraphs: [
          "Before relying on walking, ask for the exact property location and suitable routes to shops or restaurants. We have not published distances or journey times without confirmation.",
        ],
      },
    ],
  },
  {
    slug: "what-to-pack",
    category: "During Your Stay",
    title: "What should I pack?",
    summary:
      "Pack for the outings you choose, with some room for slow days at home.",
    sections: [
      {
        title: "Start with your itinerary",
        paragraphs: [
          "Bring comfortable clothing and footwear suited to your planned outings. Ask activity operators about required kit and anything they provide.",
          "Check the forecast close to departure. Think about sun protection, a light layer and protecting belongings if you expect wet conditions.",
        ],
      },
      {
        title: "Check what is supplied",
        paragraphs: [
          "Ask about towels, kitchen basics and laundry arrangements before packing for a longer stay. Bring personal essentials and avoid assuming specialist equipment is included.",
        ],
      },
    ],
  },
  {
    slug: "families",
    category: "Travel Styles",
    title: "Victoria Falls with children",
    summary: "A good family plan leaves space between the big moments.",
    sections: [
      {
        title: "Plan around your children",
        paragraphs: [
          "Share children’s ages, sleeping needs and any priorities for your stay. Check the apartment layout and facilities before deciding.",
        ],
      },
      {
        title: "Keep outings manageable",
        paragraphs: [
          "Ask each provider about age limits, suitability, supervision and transport. A shorter outing with downtime afterward can be a useful starting point.",
        ],
      },
    ],
  },
  {
    slug: "money",
    category: "During Your Stay",
    title: "Money and payments",
    summary: "Know how you’ll pay before you arrive.",
    sections: [
      {
        title: "Get the terms in writing",
        paragraphs: [
          "Ask for the currency, accepted payment methods and deposit schedule for your stay. Keep accommodation, transfers and activities separate in your budget unless a quote explicitly combines them.",
          "Before paying an activity operator, check what the quote covers and how changes or cancellations are handled.",
        ],
      },
      {
        title: "Plan for everyday purchases",
        paragraphs: [
          "Ask about payment options for groceries and transport. Check charges and card-use arrangements with your own bank before travelling. Do not send card numbers or payment documents through the trip planner.",
        ],
      },
    ],
  },
  {
    slug: "internet",
    category: "During Your Stay",
    title: "Internet and working away",
    summary: "Settle the practical details before taking your work with you.",
    sections: [
      {
        title: "Ask about the actual setup",
        paragraphs: [
          "Share whether you need video calls, a quiet workspace or regular file uploads. Ask for confirmed Wi-Fi coverage and current reliability for the apartment you’re considering.",
          "If a connection is essential to your work, discuss a backup and check mobile connectivity options before booking. We have not published an unverified speed or uptime promise.",
        ],
      },
      {
        title: "Leave time for Victoria Falls",
        paragraphs: [
          "Put fixed work commitments in your notes. Plan outings around those hours and leave enough time for travel, meals and rest.",
        ],
      },
    ],
  },
  {
    slug: "weather",
    category: "During Your Stay",
    title: "Weather and your plans",
    summary: "A flexible day is easier to enjoy when conditions change.",
    sections: [
      {
        title: "Check close to departure",
        paragraphs: [
          "Use a current forecast when packing and deciding which days to keep open. Weather and river conditions can affect particular activities, so ask providers about the conditions they need.",
        ],
      },
      {
        title: "Have a slower-day option",
        paragraphs: [
          "Keep one part of your plan flexible. A quiet day, a meal together or time to explore town can give you breathing room if an outing moves.",
          "Ask about operator cancellation and rescheduling terms before paying.",
        ],
      },
    ],
  },
  {
    slug: "safety",
    category: "During Your Stay",
    title: "Practical questions for a confident trip",
    summary: "Clear arrangements help you know what to expect.",
    sections: [
      {
        title: "Choose and confirm providers",
        paragraphs: [
          "Ask who will operate each activity, where you will meet and what the briefing covers. Tell the provider about anything that may affect suitability before making a booking.",
        ],
      },
      {
        title: "Know your arrival plan",
        paragraphs: [
          "Keep your accommodation contact, pickup details and arrival directions accessible during your journey. Ask about property security and arrival procedures rather than assuming particular features are supplied.",
          "Consult current official travel advice and entry requirements before travelling. This guide does not replace those sources.",
        ],
      },
    ],
  },
  {
    slug: "couples",
    category: "Travel Styles",
    title: "A few days together",
    summary:
      "Choose one or two shared highlights, then leave room for yourselves.",
    sections: [
      {
        title: "Find your shared pace",
        paragraphs: [
          "One of you might want adventure while the other wants a slower day. Put both interests in your plan and choose the outings you want to share.",
          "Our two-night outline is a starting point for a short visit; the five-night outline gives you more space between plans.",
        ],
      },
      {
        title: "Choose the right space",
        paragraphs: [
          "Ask about the sleeping arrangement, kitchen and private space that matter to you. Share special requests before booking so the team can confirm what is possible.",
        ],
      },
    ],
  },
  {
    slug: "adventure",
    category: "Travel Styles",
    title: "Make room for adventure",
    summary:
      "Choose the activity first, then check suitability and conditions.",
    sections: [
      {
        title: "Know what you’re signing up for",
        paragraphs: [
          "Tell us what kind of adventure interests you. Confirm age limits, physical requirements, safety arrangements and equipment directly with the operator.",
          "Keep some recovery time after your main outing instead of filling every hour.",
        ],
      },
      {
        title: "Plan for a change",
        paragraphs: [
          "Check whether the activity depends on river or weather conditions, and ask about rescheduling. Keep a relaxed alternative in your day plan.",
        ],
      },
    ],
  },
  {
    slug: "wildlife",
    category: "Travel Styles",
    title: "A day for wildlife",
    summary: "Give a wildlife outing its own space in your trip.",
    sections: [
      {
        title: "Start with the journey",
        paragraphs: [
          "Chobe is an idea to discuss if you would like a wildlife day in Botswana. Ask for the full journey, current border requirements, pickup time and return arrangements.",
          "If a long day does not suit your group, ask about alternatives closer to your base.",
        ],
      },
      {
        title: "Confirm the inclusions",
        paragraphs: [
          "Check the operator, transport, meals and park fees before agreeing to a quote. Wildlife sightings are never a promise; leave room to enjoy the day as it unfolds.",
        ],
      },
    ],
  },
  {
    slug: "food",
    category: "Travel Styles",
    title: "Eating in, eating out",
    summary: "A self-catering trip can make room for both.",
    sections: [
      {
        title: "Plan a few easy meals",
        paragraphs: [
          "Ask what the kitchen includes before making a shopping list. Keep arrival-night food simple and check grocery options and opening times for your dates.",
        ],
      },
      {
        title: "Explore local food",
        paragraphs: [
          "Tell us the kind of meal you have in mind and ask for current restaurant ideas. Confirm bookings, dietary needs and transport with the venue or provider.",
          "Chef services and catering are not assumed to be included. Ask what can be arranged and request a separate quote where relevant.",
        ],
      },
    ],
  },
];
export const practicalTopics = [
  "Check-In & Check-Out",
  "Airport Transfers",
  "Parking",
  "Wi-Fi",
  "Security",
  "Children",
  "Cooking & Groceries",
  "Cleaning",
  "Payments",
  "Cancellation",
  "Activities",
  "Getting Around",
];
export const practicalAnswers: {
  category: string;
  question: string;
  answer: string | null;
}[] = practicalTopics.map((category) => ({
  category,
  question: category,
  answer: null,
}));
