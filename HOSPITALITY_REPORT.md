# Mzilikazi hospitality refactor

## Status

Implemented locally. Lint, TypeScript, nine automated tests and the production build pass. Not deployed. Full visual acceptance remains pending because no browser was connected and no genuine property photography or verified unit specifications were available.

## Visual changes

Warm ivory and stone surfaces, charcoal actions, muted green editorial moments, restrained borders, small radii and generous section spacing replace navy/ochre panels and repeated cards. Shared reading widths and responsive layout rules establish a quieter editorial rhythm. The centrally configured current name, Mzilikazi Guest Lodge, is preserved; no replacement logo was invented.

## Homepage changes

The homepage now follows hero → compact value strip → accommodation → self-catering story → destination → planning help → final enquiry action. Verified review and photographic-pause slots render only when populated.

Removed repeated offer/benefit grids, unverified review cards, long service catalogues and the duplicated homepage enquiry form. Family/group and corporate content remains available on its existing routes; detailed enquiry and FAQ content is on Contact and FAQ. Unsupported supplier itineraries, guarantees and facility claims were removed rather than rewritten as facts.

## Typography

Newsreader 400, normal and italic, for editorial headings; Manrope 400 and 600 for body and functional UI. Latin subsets and next/font provide self-hosted font assets, swap rendering and preload support. No browser-time Google Fonts request. A clean build needs network access for the initial font download.

Mobile display/H1: 44/42px; H2: 34px; H3: 28px. Desktop display/H1: 72/64px; H2: 48px; H3: 32px. Body: 16px; introductory copy: 19px. Reading width: 660px, introductory width: 720px.

## Colours

| Semantic token      | Value   | Purpose                    |
| ------------------- | ------- | -------------------------- |
| --surface           | #F4F0E8 | Main warm ivory            |
| --surface-secondary | #EDE7DC | Stone sections             |
| --ink               | #1C211D | Text and primary actions   |
| --brand             | #66705A | Green editorial accent     |
| --sand              | #C8A978 | Decorative accent          |
| --clay              | #A96549 | Reserved supporting accent |
| --white             | #FFFFFF | Functional form surfaces   |
| --muted             | #555E50 | Supporting text            |
| --line              | #C6C9BD | Dividers and input borders |
| --danger            | #9B302C | Validation messages        |

Tokens also cover spacing, type, widths, radii, shadows, grid proportions and motion. Breakpoint rules live in globals.css.

## Components

New/shared: Container, Eyebrow, TextLink, ImageFrame, PageIntro, AccommodationCard/Facts/Fallback, ApartmentGallery, AvailabilityPanel, ExperienceCard, ExperienceDetail and StayAudience.

Reworked: Header, Footer, MobileBookingCTA, Button, homepage sections, EnquiryForm, DigitalConciergeModal/Widget and FAQ. Legacy ImagePlaceholder now returns null. Sanity schemas/queries, Supabase helpers and the revalidation route are preserved.

## Responsive work

Stacked availability fields on phones; horizontal desktop availability panel; collapsible navigation until enough width exists; controlled headline sizes and line lengths; 16/20px phone gutters, 32px tablet and 48/64px desktop gutters. Details use a compact sticky enquiry panel only on desktop.

Gallery supports horizontal snap scrolling, keyboard-operated photo buttons, a native modal, arrow-key navigation and Escape. It is hidden without verified property photos.

The mobile conversion bar appears after the hero, respects safe-area insets, reserves bottom space and hides around forms, the footer, menus and dialogs. WhatsApp is optional and validated.

## Motion

160ms button/link transitions, a 4px link-arrow movement and 350ms restrained image zoom. No parallax, scroll-jacking, entrance delays or added animation dependency. Reduced motion disables smooth scrolling, transitions and zoom.

## Data integrity

Removed hardcoded reviews/ratings, invented/conflicting apartment names and capacities, speculative beds/amenities, Wi-Fi/solar/security/chef claims, check-in/out promises, guaranteed rates/response times, vetted-provider claims, fake phone/WhatsApp details, unsafe canned visa/payment advice and unrelated property imagery.

lib/property.ts is the nullable public-data source. Unconfirmed records retain URL compatibility but do not expose facts. Unpublished detail pages are noindex and absent from the sitemap. Experience content is inspiration, not an offer of a confirmed supplier package.

Contact details are null unless explicitly configured. SITE_NAME propagates to navigation, footer, metadata, schema, contact and email context.

## Images

No stock imagery remains in public components. No property image is available locally. The former Unsplash house, bedrooms, kitchen, office, family, waterfall and wildlife stand-ins have been removed.

Client media is needed for hero, each apartment gallery, story, photographic pause, destination and experiences. Typed media slots distinguish property/destination/development media, require verification and alt text, support crop positioning, and use Next Image with explicit aspect ratios and sizes. Noncritical images lazy-load; only an eventual hero is preloaded.

Missing logo and OG image references were removed. These must be supplied before photo-led visual acceptance.

## Accessibility

Associated persistent field labels, unique IDs, linked validation errors, required/invalid states, focus rings, duplicate-submit locking, loading/error/retry/success states, semantic landmarks, skip link and native FAQ disclosures.

Mobile navigation traps keyboard focus, supports Escape and makes page content inert while open. Native dialogs provide modal focus handling and Escape. Important controls target 44–56px.

Remaining: browser/screen-reader interaction checks, measured layout/crop QA and final contrast review with client imagery. Browser connection inventory was empty; no screenshots or visual checks are claimed.

## Performance

No new runtime dependencies. Removed page-level Framer Motion usage and perpetual animations; most presentation remains server-rendered. Reduced to two font families and used weights. Shared media primitives prevent layout shifts when images arrive. No unoptimised stock image requests or broken logo/OG requests.

Core Web Vitals and browser bundle/network measurements remain unmeasured.

## SEO

Existing page paths and all six accommodation slugs remain. Each public page has a title, description, canonical URL, Open Graph and Twitter metadata. Site identity and default canonical domain are centralised. The default URL now matches the supplied Vercel site; override NEXT_PUBLIC_SITE_URL for the final domain.

LodgingBusiness schema retains only identity, URL and confirmed locality/country. Removed speculative amenities and price range. Sitemap and robots remain operational; unconfirmed apartment details are intentionally not indexed. Existing environment-gated GA is retained.

## Enquiry behaviour

Both direct enquiry and trip planner use the same validated flow and preserve preferences. Availability controls prefill arrival, departure and guest count. Guest limits and date validation are shared between client and API.

The API preserves Supabase storage and Resend notifications. It reports success only after storage or the property notification succeeds. No configured channel, or total delivery failure, returns a retryable 503. Guest acknowledgements follow accepted enquiries. Email content is plain text, and undelivered guest details are no longer logged.

Live delivery success must be tested with production credentials. The automated API test deliberately disables external delivery and sends no email.

## Client data still required

See [CONTENT_GAPS.md](CONTENT_GAPS.md), updated with publication rules, media requirements, contact environment variables, delivery settings, canonical domain and remaining browser QA.

## Tests

- npm run lint: PASS, no errors or warnings.
- npm run typecheck: PASS.
- npm test: PASS, 9 tests, including 17 public routes and all legacy accommodation paths.
- npm run build: PASS, Next.js 16.3.1 production build.
- Tests cover data/media publication gates, invalid dates/guest counts, enquiry prefill, canonical metadata, missing-placeholder/stock checks, 404, noindex/sitemap handling and truthful delivery failure.
- Node's native TypeScript test loader emits a module-type detection warning; tests pass. Package module semantics were not changed just to silence it.
- Manual responsive checks at 320, 360, 375, 390, 414, 430, 768, 1024, 1280 and 1440+ pixels: NOT RUN; no browser connection was available.
- No claim of a live email, database write, screen-reader audit or Core Web Vitals score.

## Manual actions

1. Populate client-confirmed data and authentic media as described in CONTENT_GAPS.md.
2. Set the verified contact values, canonical site URL and Supabase and/or complete Resend settings.
3. Run the site and review the listed viewport widths, keyboard/menu/dialog/form behaviour and final image crops.
4. Submit one approved delivery test with the production credentials, confirming receipt and error recovery.
5. Deploy only after those release checks; no deployment was performed here.

## Files changed

- `CONTENT_GAPS.md`
- `HOSPITALITY_REPORT.md`
- `IMPLEMENTATION_PLAN.md`
- `app/apartments/[slug]/page.tsx`
- `app/apartments/page.tsx`
- `app/api/enquiry/route.ts`
- `app/contact/page.tsx`
- `app/corporate-stays-victoria-falls/page.tsx`
- `app/experiences/chobe-day-trip/page.tsx`
- `app/experiences/page.tsx`
- `app/experiences/victoria-falls-tour/page.tsx`
- `app/experiences/village-cultural-visit/page.tsx`
- `app/family-group-accommodation-victoria-falls/page.tsx`
- `app/faq/page.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `app/page.tsx`
- `app/sitemap.ts`
- `app/victoria-falls/page.tsx`
- `components/concierge/DigitalConciergeModal.tsx`
- `components/concierge/DigitalConciergeWidget.tsx`
- `components/forms/AvailabilityPanel.tsx`
- `components/forms/EnquiryForm.tsx`
- `components/home/ApartmentsPreview.tsx`
- `components/home/Contact.tsx`
- `components/home/Experience.tsx`
- `components/home/FAQ.tsx`
- `components/home/FinalCTA.tsx`
- `components/home/Hero.tsx`
- `components/home/LocalServices.tsx`
- `components/home/Offer.tsx`
- `components/home/Proof.tsx`
- `components/home/TheStay.tsx`
- `components/home/TrustStrip.tsx`
- `components/home/WhoIsItFor.tsx`
- `components/home/WhyMzilikazi.tsx`
- `components/layout/Footer.tsx`
- `components/layout/Header.tsx`
- `components/layout/MobileBookingCTA.tsx`
- `components/ui/AccommodationCard.tsx`
- `components/ui/ApartmentGallery.tsx`
- `components/ui/Button.tsx`
- `components/ui/Editorial.tsx`
- `components/ui/ExperienceCard.tsx`
- `components/ui/ExperienceDetail.tsx`
- `components/ui/ImagePlaceholder.tsx`
- `components/ui/OchreLine.tsx`
- `components/ui/SectionEyebrow.tsx`
- `components/ui/StayAudience.tsx`
- `lib/constants.ts`
- `lib/enquiry.ts`
- `lib/property.ts`
- `lib/seo.ts`
- `package.json`
- `tests/integrity.test.mjs`
- `tests/routes.test.mjs`

The pre-existing untracked package-lock.json was left untouched. No runtime dependency was added.
