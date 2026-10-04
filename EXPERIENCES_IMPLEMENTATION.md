# Experiences and Where to Stay implementation

Implemented locally on 2 October 2026. No deployment was performed.

## Changes

- Added seven compact photo cards to the home Experiences section: Tour of the Falls, Sunset Cruise, The Boma Dinner, Game Drive, Chobe Day Trip, Bungee Jump and Zip Line.
- Updated existing Falls and Chobe entries without duplicate routes. Preserved the existing cultural visit and trip-saving controls.
- Added five detail routes and expanded the shared detail component with overview, expectations, suitability, planning, preparation, inclusions/exclusions and native keyboard-accessible FAQs.
- Reused the supplied photos under `public/mzilikazi imgs/Experiences/`; preserved original filename case. Below-the-fold images use the existing Next Image component and lazy loading.
- Added responsive interest filters and one/two/three-column grids using existing colours and typography.
- Added shared accommodation guidance to home, Experiences and Stay pages. It uses published suite descriptions and property images without assigning generic property photos to specific suites.
- Experience enquiry links prefill the requested message and label the contact page as an experience enquiry. Existing room preference/date/guest prefills remain intact.
- Preserved the floating blue Explore the Stay link to `/apartments`. It also hides when activity enquiry controls or the form submit button are visible, alongside its existing menu/dialog/field handling.
- Hero carousel and the long educational introduction after it were preserved.

## Files added

- `lib/experience-content.ts`: maintainable activity content, photo paths, reference URLs and enquiry helpers.
- `components/ui/WhereToStay.tsx`: reusable accommodation guidance.
- `app/experiences/{sunset-cruise,boma-dinner,game-drive,bungee-jump,zip-line}/page.tsx`: detail routes.
- `scripts/experiences-qa.mjs`: isolated local browser checks; never submits enquiries.
- `EXPERIENCES_IMPLEMENTATION.md`: this report.

## Files modified for this request

- `lib/property.ts`, `lib/planning.ts`
- `components/ui/ExperienceCard.tsx`, `components/ui/ExperienceDetail.tsx`
- `components/home/Experience.tsx`, `components/home/TheStay.tsx`, `components/home/Contact.tsx`
- `components/trip/ExperienceExplorer.tsx`, `components/layout/FloatingStayCTA.tsx`
- `app/experiences/page.tsx`, `app/apartments/page.tsx`, `app/contact/page.tsx`, `app/globals.css`

## Verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed, including all eight experience detail routes.
- Browser checks passed at 320, 390, 768 and 1440 pixels: card counts, responsive columns, filters, no horizontal overflow, native FAQ keyboard activation, all seven image loads, detail navigation, all seven exact message prefills and activity preference labels, existing room/date/guest enquiry values, floating CTA clearing enquiry actions, reduced motion and no runtime errors.
- Screenshots were inspected for phone cards and desktop accommodation guidance. Local QA artifacts are in the ignored `.qa` directory.
- No enquiry was submitted and no external message was sent.

## Missing information and assets

All seven requested activities have suitable supplied images. The existing village cultural visit has no matching photo; it uses a deliberate icon fallback. Theatre photos were not substituted for a village visit.

Room capacities, specific bed arrangements, facilities per suite, exact property location, travel times, pickup/transfer arrangements, current rates and booking policies need business confirmation. Published Family Suite and Batoka Suite descriptions provide the layout/outdoor distinctions used here.

Operator relationships, availability, package inclusions/exclusions, current prices and schedules are not confirmed for Mzilikazi. The pages invite guests to ask about a specific option. Border requirements and adventure participation rules must be confirmed for the traveller and date; no visa or eligibility rules were invented.

## References checked

The Outbound reference and live Mzilikazi URL were inaccessible through the web tool. The implementation follows the attachment’s educational structure without claiming reference inspection.

General activity context was checked against the following pages. Their advertised packages are not represented as Mzilikazi inclusions or relationships:

- [Guided Falls tours](https://www.shearwatervictoriafalls.com/experience/tours-hikes/): walking, rainforest viewpoints and preparation.
- [Rainforest context](https://www.victoriafalls-guide.net/victoria-falls-rainforest.html): spray and seasonal changes.
- [Zambezi river cruises](https://www.shearwatervictoriafalls.com/experience/river-cruise/): river setting and variation between packages.
- [The Boma Dinner & Drum Show](https://victoria-falls-safari-collection.com/en-US/wine-and-dine/the-boma-dinner-drum-show): dining, dancing and interactive drumming.
- [Safari outings](https://www.shearwatervictoriafalls.com/experience/victoria-falls-safari/): guided vehicle outings and morning/afternoon choices.
- [Chobe day trip](https://www.shearwatervictoriafalls.com/experience/chobe-day-trip-2/): Botswana excursion and possible river/vehicle combination.
- [Bridge adventures](https://www.shearwatervictoriafalls.com/experience/victoria-falls-bridge-adventures/): bungee and bridge-slide distinction.
- Final source revalidated with lint, type-check and production build after preserving the original Falls Family filter. A focused browser check confirmed that filter still returns Tour of the Falls and works by keyboard.
