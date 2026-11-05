# Mzilikazi Apartments Website Improvement Plan

## 1. Existing architecture

### Stack and runtime
- Next.js 16 app-router project with TypeScript.
- Primary route structure is under `app/`.
- Reusable UI sits in `components/` and shared business data sits in `lib/`.
- Static or content-driven pages rely on a typed property model in `lib/property.ts` rather than a full CMS.
- The project already includes database-related support (`lib/db.ts`, Supabase/Neon types + PostgreSQL integration) and a Resend-based email workflow for enquiry notifications.
- The project is using a custom design system and CSS rather than a heavy component library.

### Data and content architecture
- `lib/property.ts` is the central source for apartment inventory, verified property media, reviews, location placeholders, and some listing metadata.
- `lib/constants.ts` drives site name, tagline, WhatsApp link, navigation, FAQ, and basic brand constants.
- `app/api/enquiry/route.ts` handles form validation and sends email notifications; the project is set up for an enquiry-only workflow rather than live-booking or real-time availability.
- `components/trip/TripProvider.tsx` and `components/trip/TripPlanner.tsx` manage planner state in the browser and provide an itinerary/enquiry flow.
- `components/forms/EnquiryForm.tsx` handles actual guest submission fields and validation.

### Current implementation strengths
- The property data layer is structured and intentionally conservative.
- The project clearly separates content, UI, and enquiry logic.
- There is a useful trip-planning flow and a guest-review mechanism already in place.
- Several pages are built around genuine property photography and the site already contains a usable accommodation/experience structure.
- The repo includes automated tests that validate the enquiry schema, route rendering, and protected content assumptions.

## 2. Confirmed problems from the codebase and published website

### A. Brand and naming inconsistency
- `SITE_NAME` is set to `Mzilikazi Guest Lodge`, while many public-facing references still talk about `Mzilikazi Apartments`.
- The project is mixing both naming conventions across metadata, routes, reviews, transfers, property descriptions, and user-facing copy.
- This is a clear trust issue and should be treated as a business approval item before any naming changes are published.

### B. Booking flow is enquiry-only, but some language is still ambiguous
- There is no live availability or instant booking integration in the codebase.
- The enquiry flow is designed to submit a request and receive a response later, which is appropriate for a hospitality property.
- However, wording like “Check availability” still appears in some UI components and buttons, which can imply real-time confirmation that does not exist.
- This must be corrected to “Enquire About Availability” or equivalent wording unless a live availability system is added.

### C. Incomplete property listings
- `lib/property.ts` clearly marks `Nkulumane Suite` as a confirmed property but intentionally leaves its gallery and walkthrough details empty.
- The file explicitly states that the apartment is not yet ready to publish with meaningful photography or layout detail.
- The code already contains a safety mechanism to keep this item unpublished in the feed, but the business-facing content still needs consistent handling to avoid confusion.
- This is acceptable if clearly marked as unavailable, but it should not be presented as a bookable listing.

### D. Missing business-critical trust information
- `propertyLocation.address` is `null`.
- `propertyLocation.mapEmbedUrl` and `mapUrl` are `null`.
- `DISTANCE_TO_FALLS` is `null`.
- `CONTACT_ADDRESS` is `null`.
- `CONTACT_PHONE` and `CONTACT_WHATSAPP` are environment-driven and may be unset.
- This means the site is still missing several public-facing pieces of information that guests expect before booking.

### E. Marketing copy and content hierarchy need tightening
- The homepage structure is already broad and includes many useful sections, but there is some repetition and an overabundance of generic hospitality copy.
- The hero still feels more like a general “stay experience” than a direct accommodation description.
- Some supporting text is still wordy and can be simplified to focus on: accommodation type, capacity, self-catering convenience, location, privacy, and enquiry path.

### F. Homepage and listing content are not fully aligned with the required outbound message
- The site currently includes some useful accommodation details, but not consistently enough to quickly answer the key conversion questions:
  - What is the apartment type?
  - How many guests can it host?
  - What is included?
  - What does it cost, when verified?
  - How do I enquire?

### G. Content management remains partly hardcoded
- The project stores property data in code, which is efficient for a small site, but it is not truly admin-friendly for a nontechnical team.
- This is workable for now, but the site should make it easier to edit rates, property descriptions, FAQs, and contact information without touching code.

### H. The conditional “published” logic is good, but needs policy alignment
- The code is deliberately conservative about unpublished listings and unverified media.
- That is a strong pattern and should remain.
- The site should continue to avoid publishing incomplete or invented information in any booking-critical areas.

## 3. Proposed improvements and priority order

### Phase 0: clarify business decisions before publication
This is the most important pre-implementation step.
- Confirm the preferred public business name: `Mzilikazi Apartments` vs `Mzilikazi Guest Lodge`.
- Confirm whether the site should present the accommodation as apartment-style lodgings or a lodge-style property.
- Verify the business WhatsApp number, contact email, and property address.
- Confirm whether essential policies (deposit, cancellation, payment, check-in/out, security, parking) are accurate before public display.
- Approve any logo refinements or brand direction work before altering the existing brand asset.

### Phase 1: fix critical trust and conversion issues
- Replace ambiguous “Check availability” wording with “Enquire About Availability” where no live booking exists.
- Strengthen the homepage hero with the required messaging: two-bedroom apartments, self-catering, up to four guests, Wi-Fi, and a clearly labelled starting rate when verified.
- Improve CTA prominence and consistency.
- Ensure apartment cards follow a single visual pattern with the same information hierarchy and action treatment.
- Keep the Mangwana listing clearly unavailable until verified rather than presenting it as a normal bookable accommodation.

### Phase 2: improve listing quality and apartment pages
- Standardise the apartment presentation across Lobengula, Nkulumane, and any confirmed unit.
- Add consistent gallery handling, feature summaries, occupancy data, amenities, and policy sections.
- Remove or hide empty or placeholder gallery content.
- Present any incomplete listing as not yet available for booking rather than as a normal property page.

### Phase 3: refine UX and booking journey
- Ensure the enquiry form captures guest name, email, phone/WhatsApp, apartment preference, dates, adult/child counts, and special requests.
- Ensure the same form is used consistently to prevent mixed copy and inconsistent data handling across pages.
- Add or improve the WhatsApp enquiry link so it can carry relevant prefilled trip information where appropriate.
- Keep trip planning as a planning aid, not a false reservation mechanism.

### Phase 4: polish brand, design system, and content
- Keep the approved visual identity and avoid replacing the logo without consent.
- Establish consistent spacing, type scale, section layouts, buttons, cards, and imagery treatment.
- Update the story page to tell a meaningful, verified, non-inventive narrative based on the actual guest experience and local connection.
- Remove repeated content and generic phrasing wherever it weakens clarity.

### Phase 5: operational improvement and maintainability
- Decide whether to extend the current content architecture with a lightweight admin layer or keep the current structured data setup.
- Identify the minimum set of editable fields that should be content-managed by a nontechnical admin.
- Keep the system simple, avoid introducing a second CMS unless there is a compelling reason.

## 4. Files likely to require modification

### Core content and site identity
- `lib/constants.ts`
- `lib/property.ts`
- `app/page.tsx`
- `app/contact/page.tsx`
- `app/our-story/page.tsx`
- `app/apartments/page.tsx`
- `app/apartments/[slug]/page.tsx`

### UI and conversion components
- `components/home/Hero.tsx`
- `components/home/ApartmentsPreview.tsx`
- `components/home/Location.tsx`
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/ui/BrandLogo.tsx`
- `components/forms/EnquiryForm.tsx`
- `components/forms/AvailabilityPanel.tsx`
- `components/trip/TripPlanner.tsx`
- `components/trip/TripProvider.tsx`

### Data and backend integrations
- `app/api/enquiry/route.ts`
- `lib/enquiry.ts`
- `lib/db.ts`
- `lib/reviews.ts`

## 5. Risks and dependencies

- Brand identity decisions should be resolved before visible changes are made in the public-facing site.
- Exact property details, phone numbers, WhatsApp numbers, and address information may still need confirmation from the owner or property manager.
- The site should avoid public-facing pricing claims unless verified and labelled appropriately.
- Some location and attraction data are best kept as “ask for current details” rather than fabricated.
- Any change to accommodation claim or policy needs to remain consistent across homepage, listings, FAQs, contact flow, and any metadata.

## 6. Items requiring owner approval

- The preferred public business name and whether “Mzilikazi Apartments” or “Mzilikazi Guest Lodge” is the authoritative brand.
- Logo refinement direction and any replacement or editing of the logo asset.
- Exact property address and map embed details.
- Business WhatsApp number and business phone details.
- Deposit, payment, and cancellation terms if they will be published publicly.
- Verification of “from US$130 per apartment per night” wording and whether it should remain in front-end copy.
- Any guest review wording that will be published as a testimonial.
- Whether the site is permitted to present a more residential-apartment-focused identity or a heritage-informed hospitality identity.

## 7. Recommended implementation order

1. Brand and trust alignment
2. Critical wording and CTA fixes
3. Mangwana / incomplete listing handling
4. Apartment card consistency and listing data cleanup
5. Enquiry form validation and WhatsApp integration improvements
6. Homepage restructure and hero copy refinement
7. Story page rewrite and trust content improvements
8. Trip planner QA and mobile usability fixes
9. Final design-system cleanup and performance/SEO follow-through
10. Final verification against the existing automated test suite

## 8. Implementation note

The codebase already demonstrates a thoughtful and conservative approach to unpublished or unverified accommodation data. That is a good foundation. The work should proceed carefully, with content and brand approvals handled before broader redesign work is published publicly.

No large visual redesign should be pursued until the owner confirms the business name, preferred brand direction, and the necessary trust information for guests.
