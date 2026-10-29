import { z } from "zod";

export type ReviewStatus = "pending" | "verified" | "rejected";

export interface Review {
  id: string;
  created_at: string;
  guest_name: string;
  guest_email: string;
  guest_origin?: string;
  apartment_stayed: string;
  rating: number; // 1 to 5
  traveller_type?: string;
  stay_date?: string;
  title?: string;
  quote: string;
  verified: boolean;
  status: ReviewStatus;
  source: string;
}

export const reviewSchema = z.object({
  guestName: z
    .string()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(100, "Name is too long."),
  guestEmail: z
    .string()
    .email("Please provide a valid email address so we can verify your stay."),
  guestOrigin: z
    .string()
    .max(100, "Origin is too long.")
    .optional()
    .or(z.literal("")),
  apartmentStayed: z
    .string()
    .min(1, "Please select which apartment you stayed in."),
  rating: z
    .number()
    .min(1, "Please select a rating of at least 1 star.")
    .max(5, "Rating cannot exceed 5 stars."),
  travellerType: z
    .string()
    .optional()
    .or(z.literal("")),
  stayDate: z
    .string()
    .optional()
    .or(z.literal("")),
  title: z
    .string()
    .max(120, "Title is too long.")
    .optional()
    .or(z.literal("")),
  quote: z
    .string()
    .min(10, "Please share a few sentences about your stay (at least 10 characters).")
    .max(3000, "Review must be under 3000 characters."),
  consent: z
    .boolean()
    .refine((val) => val === true, "Please confirm consent to publish your review."),
});

export type ReviewValues = z.infer<typeof reviewSchema>;

export interface ReviewStats {
  total: number;
  averageRating: number;
  pendingCount: number;
  verifiedCount: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export const APARTMENT_OPTIONS = [
  "Lobengula Suite",
  "Nkulumane Suite",
  "Mangwana Suite",
  "Mzilikazi Guest Lodge (General)",
] as const;

export const TRAVELLER_TYPES = [
  "Couple",
  "Family with children",
  "Friends / Group",
  "Solo traveller",
  "Work / Business stay",
] as const;
