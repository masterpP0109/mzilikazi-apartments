# Hospitality refactor

## Audit

- Next.js 16.3 App Router, React 19, Tailwind 4, next/font; existing Sanity schemas/queries, Supabase enquiry storage and Resend notifications.
- Routes: homepage, accommodation index and six current/legacy detail slugs, experiences index and three details, destination guide, family/group, corporate, FAQ and contact. Preserve all paths.
- No authentic property media or logo exists in public/. Stock images currently imply actual accommodation. Hide these; provide typed, verified media slots.
- Accommodation data is duplicated with conflicting names/specifications. CONTENT_GAPS.md marks names, capacity, amenities, policies, contact details and reviews unconfirmed. Centralise nullable public data and gate publication.
- Hardcoded reviews, phone number, guarantees, operator claims, policy times and structured-data amenities are unsafe. Remove public claims and retain neutral enquiry paths.
- Form uses React Hook Form/Zod but labels are disconnected, guest limits differ, and API returns success without delivery. Preserve integrations and fix these defects.
- Header has crowded navigation, focusable hidden menu and missing logo; floating planner/sticky CTA can overlap. Gallery currently only has one stock photo. No reduced-motion handling or test script.
- Metadata/sitemap/robots and environment-gated GA exist; no separate analytics abstraction. Preserve GA and routes, centralise identity and canonical metadata, remove nonexistent OG image.

## Implementation sequence

1. Central verified property/media/experience data, safe fallback copy and truthful delivery handling.
2. Newsreader/Manrope, semantic palette/type/spacing/layout/motion tokens and shared editorial primitives.
3. Accessible navigation/footer; rebuild homepage narrative without duplicate sales sections or unverified proof.
4. Shared accommodation cards/detail/gallery and neutral fallbacks; destination/experience/audience pages retain paths.
5. Availability prefill, accessible enquiry validation, safe planner and unobtrusive mobile CTA.
6. Lint/type/build plus meaningful data/enquiry checks; responsive browser review and update content gaps/report.

## Media decision

No property photograph will be fabricated or replaced by unrelated lodging. Photo sections render only when verified assets exist. Until client photographs arrive, use an intentional typographic layout with no empty image panels.
