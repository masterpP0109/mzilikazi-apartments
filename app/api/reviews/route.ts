import { NextResponse } from "next/server";
import { reviewSchema } from "@/lib/reviews";
import { getReviews, addReview, updateReviewStatus, getReviewStats } from "@/lib/reviews-store";
import type { ReviewStatus } from "@/lib/reviews";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as ReviewStatus | null;
    const apartment = searchParams.get("apartment");
    const search = searchParams.get("search");

    const reviews = await getReviews({
      status: status || undefined,
      apartment: apartment || undefined,
      search: search || undefined,
    });

    const stats = await getReviewStats();

    return NextResponse.json({
      success: true,
      reviews,
      stats,
    });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json(
      { error: "Could not fetch reviews" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Please send a valid review payload." },
      { status: 400 },
    );
  }

  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please complete all required review fields properly.",
        details: parsed.error.flatten(),
      },
      { status: 422 },
    );
  }

  try {
    const created = await addReview(parsed.data);
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your review has been received and will be published once verified.",
        review: created,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to store review:", error);
    return NextResponse.json(
      { error: "We could not save your review. Please try again." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as { id?: string; status?: ReviewStatus };
    if (!body.id || !body.status) {
      return NextResponse.json(
        { error: "Missing review ID or new status." },
        { status: 400 },
      );
    }

    const updated = await updateReviewStatus(body.id, body.status);
    if (!updated) {
      return NextResponse.json(
        { error: "Review not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      review: updated,
    });
  } catch (error) {
    console.error("Failed to update review status:", error);
    return NextResponse.json(
      { error: "Could not update review status." },
      { status: 500 },
    );
  }
}
