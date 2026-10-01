# Customer journey implementation

The existing Newsreader / Manrope typography, warm stone and olive palette, spacing tokens, buttons, logo and editorial layouts remain in use. No UI framework or production dependency was added. Existing accommodation aliases and experience URLs remain available.

## Implemented

- Original hero line and availability controls, with stay and trip-planning paths.
- Four traveller routes, morning/day/evening content, progressive calls to action.
- Nullable apartment facilities, bathrooms, inclusions and visual walkthrough data; confirmed-only cards, comparison, detail sections and Apartment structured data.
- Experience categories and saved ideas; five sample-day rhythms and two-, three- and five-night outlines.
- Shared six-step planner used by the existing concierge and /plan.
- My Trip, persisted in localStorage without accounts; accommodation, experiences, day ideas and itineraries; removal, reload recovery and shared enquiry / configured WhatsApp paths.
- One guide article template and structured planning content under /victoria-falls; directory, internal links, canonical metadata and sitemap entries.
- Before-you-arrive topics, verified-review context, local-team fields and configurable location/map data.

## Content needed

All existing apartments remain unpublished until their names and facts are confirmed. Supply real property photographs, room layouts, facilities, sleeping arrangements, rates, policies, reviews, team details and the exact address/map. See CONTENT_GAPS.md. No stock imagery, fabricated property details or fake reviews were introduced.

General itinerary and day content is suggested editorial seed content, not an operator package. Durations, traveller suitability and travel times remain nullable until confirmed. Seasonal context links to the tourism source used; live activity and border details must be confirmed separately.

The configured brand name remains Mzilikazi Guest Lodge pending trading-name confirmation, as in the existing site.

## Enquiry storage

Apply supabase/migrations/002_flexible_enquiry_dates.sql to an existing Supabase enquiry database before releasing flexible-date enquiries. This only permits absent dates in the enquiry inbox and adds a date-order constraint. Bookings are unchanged. Known-date enquiries still require valid upcoming ordered dates. Delivery still requires Supabase or Resend acceptance; unavailable delivery returns an error and retains form details.

## QA commands

- npm run build
- npm run lint
- npm test (production build required for route tests)
- node scripts/browser-qa.mjs (installed Chrome required; CHROME_PATH can override the executable)

Browser QA uses an isolated local Chrome profile and a production server with external enquiry delivery disabled. Artifacts are written to ignored .qa/. It checks common mobile and desktop widths, route overflow, saving/reloading ideas, planner handoff, dialog Escape and corrupt-storage recovery. No real enquiry is sent.

## Verification completed

- Final production build passed (39 generated static pages).
- ESLint passed with no warnings or errors.
- All 14 data, enquiry and production-route tests passed; 38 current/new page URLs were exercised.
- Isolated Chrome checked 11 representative routes at 320, 360, 390, 430, 768, 1280 and 1440 pixels (77 combinations), with no horizontal overflow or runtime exceptions.
- The complete visible-page journey passed, including filtering, saving/reloading, six planner steps, traveller and itinerary handoff, flexible dates, native dialog Escape and corrupt-storage recovery.
- A focused rerun against the final build confirmed non-submitting planner save buttons and the same journey.
- Mobile and desktop hero screenshots and the enquiry handoff were visually inspected.
- Package manifest and lockfile are unchanged. Changes have not been deployed to Vercel.
