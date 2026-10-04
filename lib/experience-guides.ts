/** Educational planning guidance, not a promise of a Mzilikazi-operated package.
 * Operator examples checked 2026-10-03. Keep price provenance in experience-content.ts.
 * VERIFY BEFORE SALE: exact package, pickup coverage, total fees, eligibility and cancellation terms.
 */
export interface ExperienceGuide {
  overview: string[];
  duration: string;
  operatingTimes: string;
  pickupInformation: string;
  whatToExpect: string[];
  usuallyIncluded: string[];
  possibleAdditionalCosts: string[];
  goodFor: string[];
  beforeYouGo: string[];
  bookingNotes: string[];
  verificationNotes: string[];
  sources: string[];
}
const hotelPickup = 'Accommodation pickup is commonly offered around Victoria Falls. The booking confirmation specifies whether Mzilikazi is within the pickup area, your collection time and the return arrangements.';
const bookingNotes = [
  'Send your stay dates, group size and preferred day. Include children’s ages and any access or dietary needs relevant to the activity.',
  'Mzilikazi can help establish availability and provide the selected package’s current price, fees, inclusions and pickup arrangements before you commit.',
  'An enquiry or saved activity is a planning request, not a reservation. Activities are arranged separately from accommodation; payment and cancellation terms are supplied with the booking details.',
];
const source = (path: string) => `https://www.shearwatervictoriafalls.com/experience/${path}/`;
const guide = (data: Omit<ExperienceGuide, 'bookingNotes' | 'verificationNotes'>): ExperienceGuide => ({
  ...data, bookingNotes,
  verificationNotes: ['Confirm the selected package and complete payable total before publishing a bookable offer.'],
});
export const experienceGuides: Record<string, ExperienceGuide> = {
  'victoria-falls-tour': guide({
    overview: [
      'This is a walking visit to the waterfall viewpoints, rather than a boat trip or a view from the bridge. A guide adds context to the rainforest, landscape and history while you pause along the route for photographs.',
      'It is a useful first outing for understanding the destination. The pace depends on your group and time spent at viewpoints. High water brings stronger spray and sometimes less visibility; lower water changes which parts of the waterfall are most visible.',
    ],
    duration: 'Approximately 2–3 hours, plus travel to the entrance',
    operatingTimes: 'Morning and afternoon departures',
    pickupInformation: hotelPickup + ' Self-arranged visits meet the guide at the agreed park entrance.',
    whatToExpect: ['Pickup or meet at the entrance', 'Entry formalities and introduction to the walking route', 'Rainforest walk with viewpoint stops and guide commentary', 'Time for photographs, then return to the entrance', 'Return transfer if part of your package'],
    usuallyIncluded: ['Guided walk and interpretation', 'Many guided packages offer return transfers and water', 'Rain protection is provided by some operators when needed'],
    possibleAdditionalCosts: ['Rainforest / national park entry, which can depend on nationality or residency', 'Food, café purchases and souvenirs', 'Transfers if not part of the package'],
    goodFor: ['First-time visitors', 'Couples and solo travellers', 'Families comfortable with the walking route', 'Scenery and photography enthusiasts'],
    beforeYouGo: ['Wear footwear with good grip; paths can be wet. Bring water and sun protection.', 'Protect phones and cameras from spray with a waterproof cover.', 'Walking distance, steps and access vary by route. Describe mobility needs before reserving so an appropriate route can be established.', 'The guide here describes a Zimbabwe-side visit. A Zambia-side outing has different entry and travel arrangements.'],
    sources: [source('tours-hikes')],
  }),
  'sunset-cruise': guide({
    overview: [
      'The cruise takes place on the Upper Zambezi, above the waterfall. You watch the river and banks from a boat as daylight fades; this is not a trip to the foot of the Falls.',
      'Choose it for a relaxed end to the day rather than a packed sightseeing schedule. Birds and animals may be visible along the banks, but sightings and sunset colours vary. Standard and luxury boats differ in seating, refreshments and atmosphere; the reference price on this page is for a luxury option.',
    ],
    duration: 'About 2 hours on the water; allow around 3 hours with transfers',
    operatingTimes: 'Late afternoon into sunset; boarding shifts with the season',
    pickupInformation: hotelPickup + ' Guests using their own transport meet at the confirmed river jetty.',
    whatToExpect: ['Accommodation pickup if included', 'Transfer to the river jetty', 'Boarding and crew introduction', 'Cruise along the river with time to watch the banks', 'Sunset viewing', 'Disembark and return transfer'],
    usuallyIncluded: ['Boat cruise with crew', 'Standard packages commonly offer local drinks and snacks', 'Many packages include return town transfers; luxury refreshments differ'],
    possibleAdditionalCosts: ['River / national park fee if excluded', 'Premium drinks or upgrades outside your package', 'Transport beyond the normal pickup area'],
    goodFor: ['Couples', 'Solo travellers', 'Families', 'Guests wanting a relaxed scenic outing'],
    beforeYouGo: ['Bring sun protection and a layer for a cooler return journey.', 'Boarding can involve steps or a jetty. Access needs must be matched to the particular vessel.', 'A sunset cruise usually serves snacks, rather than a full dinner. Dinner cruises are a different package.', 'Keep a comfortable gap before an evening reservation because transfer and boarding times vary.'],
    sources: [source('river-cruise')],
  }),
  'boma-dinner': guide({
    overview: [
      'The Boma Dinner & Drum Show brings a meal and entertainment together in one evening. Buffet dining, performances and interactive drumming make it a lively shared outing rather than a quiet restaurant reservation.',
      'It suits guests who want food and music in the same plan. You can enjoy watching the entertainment as well as joining the drumming. Consider the volume and evening finish when planning for young children or anyone who prefers a quieter atmosphere.',
    ],
    duration: 'Allow approximately 3 hours for the evening, plus transport',
    operatingTimes: 'Evening; the venue publishes 19:00–22:00 opening hours',
    pickupInformation: 'The venue is on the Victoria Falls Safari Lodge estate. Dinner-only reservations do not automatically include a pickup; arrange a return transfer or use a package that explicitly includes transport.',
    whatToExpect: ['Travel to The Boma and check in for your reservation', 'Welcome and seating', 'Dinner with a selection of dishes', 'Dance performances and interactive drumming', 'Return to your accommodation'],
    usuallyIncluded: ['Dinner with buffet dishes and desserts', 'Live entertainment and interactive drumming'],
    possibleAdditionalCosts: ['Drinks not covered by the reservation', 'Return transport on a dinner-only booking', 'Crafts, souvenirs and optional purchases'],
    goodFor: ['Food and culture enthusiasts', 'Couples and groups of friends', 'Families who enjoy a lively evening'],
    beforeYouGo: ['Reserve ahead, particularly for larger groups.', 'Vegetarian options are advertised, but allergies and food-preparation needs require specific confirmation before reserving.', 'Arrange the return journey before you leave Mzilikazi.', 'The evening includes music and group participation; take noise sensitivity and children’s routines into account.'],
    sources: ['https://www.theboma.co.zw/'],
  }),
  'game-drive': guide({
    overview: [
      'A guide takes you along bush tracks in a safari vehicle, stopping to observe wildlife, birds and the landscape. The local Zambezi National Park option offers time in the bush without committing to a cross-border day trip.',
      'The appeal is the time spent observing rather than a checklist of animals. Sightings vary, and you may spend periods driving between them. Morning and afternoon slots leave room for other plans; a full-day or night safari is a different itinerary.',
    ],
    duration: 'Approximately 3–3½ hours for a standard local drive',
    operatingTimes: 'Early morning or afternoon',
    pickupInformation: hotelPickup,
    whatToExpect: ['Accommodation pickup', 'Travel to the selected park or reserve', 'Guide introduction and vehicle briefing', 'Drive along tracks with wildlife-viewing stops', 'Refreshment stop where included', 'Return to accommodation'],
    usuallyIncluded: ['Guide and safari vehicle', 'Return town transfers in many packages', 'Light refreshments; the selection differs between morning and afternoon options'],
    possibleAdditionalCosts: ['Park entry or conservation fees if excluded', 'Meals outside the advertised refreshments', 'Private vehicle or extended safari upgrades'],
    goodFor: ['Wildlife enthusiasts', 'Photographers', 'Couples and solo travellers', 'Families comfortable with time in a vehicle'],
    beforeYouGo: ['Bring binoculars or a camera, sun protection and a warm layer for early starts.', 'Tracks can be uneven. Discuss seating, young children and access needs before the vehicle is allocated.', 'Remain within the guide’s instructions around wildlife; sightings are not guaranteed.', 'Your confirmation identifies the exact park or reserve and whether park fees are additional.'],
    sources: [source('victoria-falls-safari')],
  }),
  'chobe-day-trip': guide({
    overview: [
      'This is a full-day excursion from Victoria Falls into Botswana. A common itinerary combines wildlife viewing from the Chobe River with a drive in Chobe National Park, providing two perspectives on the same habitat.',
      'Choose it when you want a day focused on wildlife and can set aside time for road travel and border formalities. A local game drive is simpler if you prefer a shorter outing. River and land activities may run in either order, and wildlife encounters remain unpredictable.',
    ],
    duration: 'Approximately 10–11 hours including travel and border formalities',
    operatingTimes: 'Full day; early morning departure and late afternoon return',
    pickupInformation: hotelPickup + ' Shared transfers commonly travel via the Kazungula border area.',
    whatToExpect: ['Early pickup from Victoria Falls', 'Road transfer to the Botswana border', 'Immigration formalities and onward transfer', 'Chobe River wildlife cruise', 'Lunch break', 'Game drive in Chobe National Park', 'Border formalities and return to Victoria Falls'],
    usuallyIncluded: ['Shared return transfers', 'River cruise and guided safari vehicle drive in combined packages', 'Lunch and some refreshments'],
    possibleAdditionalCosts: ['Park fees if excluded', 'Visa, immigration or border charges where applicable', 'Drinks beyond the included refreshments', 'Optional gratuities'],
    goodFor: ['Wildlife enthusiasts', 'Travellers wanting river and land viewing', 'Visitors comfortable with a full day of travel'],
    beforeYouGo: ['Carry your passport. Botswana entry and Zimbabwe re-entry permissions depend on nationality and travel documents; verify both before reserving.', 'For children, check which accompanying travel documents are required for your family’s circumstances.', 'Bring sun protection, a warm layer, camera and binoculars if available.', 'Keep the day free and avoid tight onward travel connections because border queues can extend the return journey.'],
    sources: [source('chobe-day-trip-2')],
  }),
  'bungee-jump': guide({
    overview: [
      'After check-in and equipment preparation, the participant jumps from the bridge platform on a bungee cord. The freefall and rebound distinguish it from a bridge swing or a cable ride.',
      'This is a short, intense activity with more time spent preparing than jumping. It appeals to travellers deliberately seeking this kind of adventure. Eligibility is assessed by the activity provider; being comfortable with heights alone does not establish suitability.',
    ],
    duration: 'Allow around 1 hour at the activity, plus bridge access and travel',
    operatingTimes: 'Daytime appointments, subject to weather and operating conditions',
    pickupInformation: 'Check-in is near Victoria Falls Bridge, with registration before reaching the platform. Transfers may cost extra; allow time for bridge access formalities.',
    whatToExpect: ['Travel to the bridge registration point', 'Access formalities and eligibility checks', 'Briefing and equipment fitting', 'Jump and rebound', 'Recovery with the activity crew', 'Collect belongings and return'],
    usuallyIncluded: ['Bungee activity with crew briefing', 'Required activity equipment and recovery assistance'],
    possibleAdditionalCosts: ['Transport to and from the bridge', 'Optional photographs or video', 'Combination packages with other bridge activities'],
    goodFor: ['Adventure travellers seeking a bungee jump', 'Participants who meet the selected provider’s requirements'],
    beforeYouGo: ['Bring your passport for bridge access and wear comfortable clothing with closed footwear.', 'Age, weight and health eligibility must be checked for the booked activity before payment; equipment and participation rules are provider-specific.', 'Weather can suspend activity. Review rescheduling and cancellation terms when selecting a slot.', 'Secure loose belongings according to the crew’s instructions.'],
    sources: [source('victoria-falls-bridge-adventures')],
  }),
  'zip-line': guide({
    overview: [
      'A harness connects you to a cable so you glide across the gorge rather than freefall on a bungee cord. The photographs here show the Victoria Falls Bridge Slide setting.',
      'Victoria Falls has cable rides with different locations and formats. Choose the setting as well as the activity name: a bridge slide and another gorge zip line should not be treated as the same package. This guide describes the pictured bridge option; the specific ride is identified before any booking is made.',
    ],
    duration: 'Allow around 1 hour for the bridge option, plus access and travel',
    operatingTimes: 'Daytime slots, subject to weather and operating conditions',
    pickupInformation: 'For the pictured bridge option, meet at the bridge registration point. Transport may be additional; a different gorge ride uses its own meeting point.',
    whatToExpect: ['Travel to the confirmed registration point', 'Access and participation checks', 'Crew briefing and harness fitting', 'Cable ride over the gorge', 'Crew assistance at the finish', 'Collect belongings and return'],
    usuallyIncluded: ['Cable ride', 'Harness and activity equipment', 'Crew briefing and assistance'],
    possibleAdditionalCosts: ['Return transport', 'Optional photographs or video', 'Tandem rides or combination packages, where offered'],
    goodFor: ['Travellers interested in gorge views from a cable', 'Adventure seekers comfortable with heights and eligible for the ride'],
    beforeYouGo: ['The exact location and ride format must be identified because eligibility and access rules differ.', 'Bring a passport for the bridge option and wear closed footwear; secure loose items under crew guidance.', 'Current age, weight and participation requirements are confirmed for the selected ride before payment.', 'Weather can change operations; review the selected package’s rescheduling terms.'],
    sources: [source('victoria-falls-bridge-adventures')],
  }),
};
