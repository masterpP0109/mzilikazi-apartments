// ─── GROQ queries for Sanity ───────────────────────────────────────────────────

export const APARTMENTS_QUERY = `
  *[_type == "apartment"] | order(featured desc, name asc) {
    _id,
    slug,
    name,
    tagline,
    guestProfile,
    capacity,
    bedrooms,
    beds,
    amenities,
    shortDescription,
    highlights,
    featured,
    "gallery": gallery[]{
      alt,
      caption,
      asset->{ _id, url, metadata { dimensions } }
    }
  }
`;

export const APARTMENT_BY_SLUG_QUERY = `
  *[_type == "apartment" && slug.current == $slug][0] {
    _id,
    slug,
    name,
    tagline,
    guestProfile,
    capacity,
    bedrooms,
    beds,
    amenities,
    shortDescription,
    longDescription,
    highlights,
    featured,
    seoTitle,
    seoDescription,
    "gallery": gallery[]{
      alt,
      caption,
      asset->{ _id, url, metadata { dimensions } }
    }
  }
`;

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && verified == true] | order(_createdAt desc) {
    _id,
    quote,
    guestName,
    guestOrigin,
    platform,
    verified,
    rating,
    apartmentStayed,
    date
  }
`;

export const FAQS_QUERY = `
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

export const EXPERIENCES_QUERY = `
  *[_type == "experience"] | order(_createdAt asc) {
    _id,
    title,
    description,
    category,
    "image": image{
      alt,
      asset->{ _id, url, metadata { dimensions } }
    }
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    address,
    phone,
    email,
    whatsapp,
    checkIn,
    checkOut,
    heroHeadline,
    heroSubheading
  }
`;
