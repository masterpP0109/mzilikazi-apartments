# Experience guide upgrade

Implemented locally on 2 October 2026. No deployment was performed.

## Visitor journey

- All eight activity cards link across the full card area to their existing SEO-friendly detail route. The separate trip-save button remains usable.
- Cards, detail heroes and related cards use one reusable price component, with noticeable starting prices and readable confirmation notes.
- Seven activities have four visually matched project photos each. Each gallery has a large featured photograph and three thumbnails, plus a native modal with next/previous, Escape/close, keyboard navigation, focus restoration, scroll locking and mobile swipe.
- Detail pages contain a photo/title/price/enquiry hero, overview, six at-a-glance facts, expectations, highlights, suitability, planning, preparation, important information, inclusions/exclusions, FAQs and a main enquiry section.
- Each detail page includes three related activities and a route to ask about an activity not listed. The directory explains that the list is not exhaustive.
- Activity enquiry messages now ask to confirm the current starting price and availability. Unknown-price activities use a message requesting current pricing. The existing verified WhatsApp helper is reused where a number is configured; contact remains the primary enquiry flow.
- The floating Stay CTA continues to link to `/apartments` and hides around visible enquiry actions and open dialogs.
- Apartment demo prices remain US$120, US$180 and US$140 per apartment per night, clearly labelled demo only.

## Reference price audit

Prices were checked against the local user-referenced Outbound data at `C:/Users/user/Desktop/Outbound-Holiday/src/data/experiencesData.ts` and cross-checked against the live site's public JavaScript bundle on 2 October 2026. These are reference starting prices; guests are told to confirm current selected options before booking. No operator relationship or package inclusion is inferred.

| Mzilikazi activity | Display | Corresponding Outbound record |
| --- | --- | --- |
| Tour of the Falls | From US$55 per person | guided-tour-falls |
| Sunset Cruise | From US$85 per person | upper-zambezi-sunset-cruise; explicitly labelled luxury cruise option |
| The Boma Dinner | From US$55 per person | boma-dinner-show |
| Game Drive | From US$75 per person | game-drive-zambezi; explicitly labelled Zambezi National Park option |
| Chobe Day Trip | From US$185 per person | chobe-day-safari |
| Bungee Jump | From US$160 per person | bungee-jump |
| Zip Line | Contact us for current pricing | Reference describes a different high-wire ride from the bridge-slide setting shown; no price assigned |
| Village cultural visit | From US$45 per person | local-village-tour |

[Outbound Holiday reference](https://outbound-holiday.vercel.app/). The web tool could not open it, but a read-only HTTP fetch succeeded; reference component source was also inspected for pricing and gallery hierarchy. Mzilikazi retains its own design and educational copy.

## Data and files

Extended `lib/experience-content.ts` with nullable starting prices, units, package context, price-source records, galleries, highlights, location, best time, recommended interests, important information, booking notes and related slugs. Existing content and slug references remain shared with the planner and sitemap.

Added:

- `components/ui/ExperienceGallery.tsx`
- `components/ui/ExperiencePrice.tsx`
- `components/ui/MoreExperiences.tsx`
- `scripts/experience-guide-qa.mjs`
- `EXPERIENCE_GUIDE.md`

Modified:

- `lib/experience-content.ts`
- `components/ui/ExperienceCard.tsx`
- `components/ui/ExperienceDetail.tsx`
- `components/layout/FloatingStayCTA.tsx`
- `app/experiences/page.tsx`
- `app/contact/page.tsx`
- `app/globals.css`
- `scripts/experiences-qa.mjs`

No dependencies were added. The apartment enquiry flow, hero carousel and home educational introduction are preserved.

## Remaining content gaps

- No matching village-visit photo is available in the project. Its card uses the existing cultural icon fallback and its gallery section requests photographs of the proposed visit. Unrelated theatre or dinner photos were not substituted.
- The exact bridge-slide/zip-line starting price needs confirmation for the proposed operator and ride.
- Current duration, transport, operator, package inclusions, entry fees, participation and border requirements remain enquiries where not confirmed. Reference timings or eligibility claims were not imported as guarantees.

## Verification

- Lint, TypeScript and production build passed.
- All seven assigned starting prices matched both local reference data and the live reference bundle.
- Browser verification results are recorded after completion below. Local screenshots and reference snapshots are in the ignored `.qa` directory. No enquiries are submitted by the checks.
