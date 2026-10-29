import { createClient } from "@supabase/supabase-js";
import type { Review, ReviewStatus, ReviewStats, ReviewValues } from "./reviews";
import fs from "node:fs";
import path from "node:path";

// Seed data for initial visualization and testing
const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-001",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    guest_name: "Sarah & David Jenkins",
    guest_email: "sarah.j@example.co.uk",
    guest_origin: "Surrey, UK",
    apartment_stayed: "Lobengula Suite",
    rating: 5,
    traveller_type: "Couple",
    stay_date: "October 2026",
    title: "Peaceful sanctuary after long days at the Falls",
    quote:
      "We loved everything about our stay at Mzilikazi. Having our own spacious lounge, modern kitchen, and shady veranda was infinitely better than a cramped hotel room. The host was incredibly welcoming and arranged our airport pickups seamlessly.",
    verified: true,
    status: "verified",
    source: "website_form",
  },
  {
    id: "rev-002",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    guest_name: "Tendai Moyo",
    guest_email: "tendai.moyo@example.co.zw",
    guest_origin: "Harare, Zimbabwe",
    apartment_stayed: "Nkulumane Suite",
    rating: 5,
    traveller_type: "Family with children",
    stay_date: "September 2026",
    title: "Perfect setup for a travelling family",
    quote:
      "Traveling with two energetic kids can be stressful, but having two separate bedrooms, a full kitchen to cook breakfasts, and secure courtyard parking made our Victoria Falls holiday effortless. Highly recommended!",
    verified: true,
    status: "verified",
    source: "website_form",
  },
  {
    id: "rev-003",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    guest_name: "Michael van der Merwe",
    guest_email: "michael.vdm@example.co.za",
    guest_origin: "Cape Town, South Africa",
    apartment_stayed: "Lobengula Suite",
    rating: 5,
    traveller_type: "Friends / Group",
    stay_date: "October 2026",
    title: "Outstanding comfort and exceptional local hospitality",
    quote:
      "The private apartment entrance, strong air conditioning, and quiet garden courtyard were brilliant. The airport transfer was on time and stress-free. We will definitely be coming back.",
    verified: false,
    status: "pending",
    source: "website_form",
  },
  {
    id: "rev-004",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    guest_name: "Elena Rostova",
    guest_email: "elena.r@example.com",
    guest_origin: "Frankfurt, Germany",
    apartment_stayed: "Nkulumane Suite",
    rating: 4,
    traveller_type: "Solo traveller",
    stay_date: "October 2026",
    title: "Great self-catering base in Victoria Falls",
    quote:
      "Very clean, good Wi-Fi for working in the evenings, and the kitchen had everything needed. Close to the town centre and easy to catch a taxi to the falls.",
    verified: false,
    status: "pending",
    source: "website_form",
  },
];

const DATA_FILE = path.join(process.cwd(), ".data", "reviews.json");

function readLocalReviews(): Review[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [...INITIAL_REVIEWS];
}

function writeLocalReviews(reviews: Review[]): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist local reviews file:", err);
  }
}

export async function getReviews(filter?: {
  status?: ReviewStatus;
  apartment?: string;
  search?: string;
}): Promise<Review[]> {
  // Check Supabase if configured
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    try {
      const db = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
      );
      let query = db.from("reviews").select("*").order("created_at", { ascending: false });
      if (filter?.status) query = query.eq("status", filter.status);
      if (filter?.apartment) query = query.eq("apartment_stayed", filter.apartment);
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        let results = data as Review[];
        if (filter?.search) {
          const s = filter.search.toLowerCase();
          results = results.filter(
            (r) =>
              r.guest_name.toLowerCase().includes(s) ||
              r.quote.toLowerCase().includes(s) ||
              (r.title && r.title.toLowerCase().includes(s)),
          );
        }
        return results;
      }
    } catch {}
  }

  // Fallback to local store
  let reviews = readLocalReviews();
  if (filter?.status) {
    reviews = reviews.filter((r) => r.status === filter.status);
  }
  if (filter?.apartment) {
    reviews = reviews.filter((r) => r.apartment_stayed === filter.apartment);
  }
  if (filter?.search) {
    const s = filter.search.toLowerCase();
    reviews = reviews.filter(
      (r) =>
        r.guest_name.toLowerCase().includes(s) ||
        r.quote.toLowerCase().includes(s) ||
        (r.title && r.title.toLowerCase().includes(s)),
    );
  }
  return reviews.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export async function addReview(data: ReviewValues): Promise<Review> {
  const newReview: Review = {
    id: "rev-" + Math.random().toString(36).slice(2, 9),
    created_at: new Date().toISOString(),
    guest_name: data.guestName,
    guest_email: data.guestEmail,
    guest_origin: data.guestOrigin || undefined,
    apartment_stayed: data.apartmentStayed,
    rating: data.rating,
    traveller_type: data.travellerType || undefined,
    stay_date: data.stayDate || undefined,
    title: data.title || undefined,
    quote: data.quote,
    verified: false,
    status: "pending",
    source: "website_form",
  };

  // Attempt Supabase insert
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    try {
      const db = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
      );
      await db.from("reviews").insert({
        id: newReview.id,
        created_at: newReview.created_at,
        guest_name: newReview.guest_name,
        guest_email: newReview.guest_email,
        guest_origin: newReview.guest_origin,
        apartment_stayed: newReview.apartment_stayed,
        rating: newReview.rating,
        traveller_type: newReview.traveller_type,
        stay_date: newReview.stay_date,
        title: newReview.title,
        quote: newReview.quote,
        verified: false,
        status: "pending",
        source: "website_form",
      });
    } catch {}
  }

  // Always keep local store in sync
  const current = readLocalReviews();
  const updated = [newReview, ...current];
  writeLocalReviews(updated);

  return newReview;
}

export async function updateReviewStatus(
  id: string,
  status: ReviewStatus,
): Promise<Review | null> {
  const verified = status === "verified";

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    try {
      const db = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
      );
      await db
        .from("reviews")
        .update({ status, verified })
        .eq("id", id);
    } catch {}
  }

  const current = readLocalReviews();
  const index = current.findIndex((r) => r.id === id);
  if (index === -1) return null;

  current[index] = {
    ...current[index],
    status,
    verified,
  };
  writeLocalReviews(current);
  return current[index];
}

export async function getReviewStats(): Promise<ReviewStats> {
  const all = await getReviews();
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;

  for (const r of all) {
    const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    breakdown[star]++;
    sum += r.rating;
  }

  const avg = all.length > 0 ? Number((sum / all.length).toFixed(1)) : 5.0;

  return {
    total: all.length,
    averageRating: avg,
    pendingCount: all.filter((r) => r.status === "pending").length,
    verifiedCount: all.filter((r) => r.status === "verified").length,
    ratingBreakdown: breakdown,
  };
}
