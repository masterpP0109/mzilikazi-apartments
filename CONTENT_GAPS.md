# CONTENT_GAPS.md — Mzilikazi Apartments

This file documents every piece of content that requires client confirmation before the site can go live. No placeholder data should be published to production.

Unconfirmed public facts are now null or empty arrays in `lib/property.ts`. Accommodation records remain unpublished until `confirmed` is true and a verified name is supplied. No development labels or temporary property photos should render publicly.

## Hospitality refactor — September 2026

- Current centrally configured identity remains **Mzilikazi Guest Lodge**; final trading-name approval is still needed. Change `SITE_NAME` in `lib/constants.ts` once confirmed.
- Six current/legacy accommodation URLs remain available for enquiries. Their unconfirmed names, capacities, amenities, rates, galleries and policies are hidden; unpublished detail pages are noindex and omitted from the sitemap.
- Add verified unit data to `lib/property.ts`; the homepage, index, details and enquiry suggestions share this configuration. Existing Sanity schemas and queries are preserved, but were not connected to the original public pages and are not automatically promoted as verified data.
- Supply genuine, licensed property photos for hero, apartment galleries, editorial story and photographic pause. Set image kind, verified flag, useful alt text and crop position. All previous Unsplash property, office, kitchen and lifestyle stand-ins have been removed. No stock images remain in public components.
- Destination/experience media also remain empty pending accurate, licensed assets. Do not label generic wildlife imagery as Chobe or unrelated waterfalls as Victoria Falls.
- Logo supplied in `public/mzilikazi imgs/` and added to the responsive header, footer and business structured data via the shared `BrandLogo` component and `SITE_LOGO` configuration. The social-share image is still required; the old broken `/og-image.jpg` reference remains removed.
- Contact values must be client-confirmed before setting `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE` and `NEXT_PUBLIC_CONTACT_WHATSAPP` (international format). Missing values hide their actions.
- Set `NEXT_PUBLIC_SITE_URL` to the actual canonical production domain. Default now matches the supplied Vercel website.
- Configure Supabase enquiry storage and/or **all three** Resend settings: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`. The API now returns a retryable error if neither channel accepts the enquiry; it does not claim success or log guest details as a substitute for delivery.
- Verified testimonials, policy terms, service arrangements, operator relationships, invoicing, transfers, private chef services and response-time commitments are still required before making those claims.
- Browser QA at 320, 360, 375, 390, 414, 430, 768, 1024, 1280 and 1440+ pixels remains a manual release check because no connected browser was available in this session.

---

## 🔴 CRITICAL — Must confirm before launch

### Property Identity

- [ ] **Full legal name** of the business / trading name
- [ ] **Physical address** (for footer, structured data, Google Maps)
- [ ] **Founding year** (if referenced anywhere)

### Contact Details

- [ ] **Email address** (enquiries + booking confirmations)
- [ ] **WhatsApp number** (with country code, for direct contact link)
- [ ] **Phone number** (if applicable)

### Apartment Information

For **each apartment**:

- [ ] Official apartment name
- [ ] Tagline / short descriptor
- [ ] Guest profile (who it's for)
- [ ] Maximum guest capacity
- [ ] Number of bedrooms
- [ ] Number of beds (and types: double, twin, single, etc.)
- [ ] Full amenity list
- [ ] Kitchen specification (hob, oven, microwave, fridge, utensils etc.)
- [ ] Short description (1–2 sentences for cards)
- [ ] Long description (for detail page)
- [ ] Highlight bullet points (3–5)
- [ ] Pricing per night (USD) — if displaying on site
- [ ] All gallery images (properly licensed / owned)

### Booking Policies

- [ ] Check-in time
- [ ] Check-out time
- [ ] Cancellation / refund policy
- [ ] Minimum stay (if applicable)
- [ ] Deposit requirement (if applicable)

---

## 🟡 IMPORTANT — Needed soon after launch

### Location

- [ ] Walking / driving distance to Victoria Falls entrance gate
- [ ] Estimated travel time to the Falls
- [ ] Nearest airport and distance/travel time
- [ ] Parking availability and details (free / paid, on-site / street)

### Reviews & Social Proof

- [ ] All three homepage testimonials (verified, real guest reviews only)
- [ ] Guest names and origins (with consent)
- [ ] Review platforms used (Google, Booking.com, Airbnb, direct, etc.)
- [ ] Aggregate review score and total count
- [ ] Dates of stays referenced in testimonials

### Media

- [ ] Hero background image (aerial / Falls / property exterior)
- [ ] All apartment interior gallery images (3+ per unit)
- [ ] TheStay interior feature image
- [ ] Victoria Falls destination images (4 experience tiles)
- [ ] OpenGraph / social share image (1200×630px)

---

## 🟢 NICE TO HAVE — Can be added after launch

### Property Details

- [ ] Air conditioning confirmation (all units?)
- [ ] Security features (gated, guards, cameras, safe etc.)
- [ ] Housekeeping schedule (daily, every X days, on request?)
- [ ] Wi-Fi speed / network name
- [ ] Whether early check-in / late check-out is offered and on what terms

### Experience & Activities

- [ ] Specific distances to activity providers (bungee, rafting etc.)
- [ ] Whether Mzilikazi **directly arranges** vs **recommends** each service — this affects the trust copy on `/experiences` and `/victoria-falls`
- [ ] Confirmed availability of **private chef hire** and whether Mzilikazi arranges it directly or refers a local contact
- [ ] Private chef's name or contact (if listing publicly), cuisine specialities, pricing structure, how far in advance guests must request
- [ ] Confirmed operator name for **airport transfers** (with contact details if listing publicly)
- [ ] Confirmed operator name for **guided Falls tours**
- [ ] Confirmed operator name / safety certifications for **white-water rafting**
- [ ] Confirmed operator name for **bungee jumping** (Victoria Falls Bridge operator)
- [ ] Confirmed operator name for **helicopter flights** ("Flight of Angels")
- [ ] Confirmed operator name for **game drives** (Chobe / Hwange / Zambezi NP)
- [ ] Confirmed operator name for **Zambezi sunset cruise**
- [ ] Confirmed partner / recommendation for **cultural experiences** (Boma, village visits, craft market)
- [ ] Whether pricing is displayed per service (if so, confirm each)
- [ ] Recommended local restaurants / dining spots
- [ ] Seasonal advice (best months to visit, dry vs. rainy season)
- [ ] Photography for each service tile (8 service images needed for `/experiences` page)

### Technical / SEO

- [ ] Google Analytics 4 Measurement ID
- [ ] Sanity project ID and dataset
- [ ] Supabase project URL and keys
- [ ] Cloudinary cloud name
- [ ] Resend API key and confirmed from/to email addresses
- [ ] Vercel deployment domain (for metadataBase)

---

## PROCESS

1. Share this file with the client
2. Complete the 🔴 CRITICAL section before any public launch
3. Populate verified configuration fields and publish only confirmed records; never replace missing facts with invented values
4. Never publish fabricated testimonials, distances, prices, or ratings

---

_Last updated: September 2026 hospitality refactor — outstanding client facts remain unpublished._
