"use client";

import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, CheckCircle, AlertCircle } from "lucide-react";
import {
  reviewSchema,
  type ReviewValues,
  APARTMENT_OPTIONS,
  TRAVELLER_TYPES,
} from "@/lib/reviews";
import { SITE_NAME } from "@/lib/constants";

const RATING_LABELS: Record<number, string> = {
  5: "5 Stars — Exceptional stay",
  4: "4 Stars — Very good experience",
  3: "3 Stars — Good / Met expectations",
  2: "2 Stars — Fair / Room for improvement",
  1: "1 Star — Needs significant improvement",
};

export default function ReviewForm() {
  const id = useId();
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ReviewValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      apartmentStayed: APARTMENT_OPTIONS[0],
      travellerType: TRAVELLER_TYPES[0],
      consent: false,
    },
  });

  const selectedRating = watch("rating") || 5;

  const onSubmit = async (data: ReviewValues) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.success) {
        throw new Error(
          body.error ?? "Failed to submit review. Please try again.",
        );
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="review-success-card" role="status">
        <CheckCircle size={44} className="success-icon" aria-hidden="true" />
        <h2>Thank you for your review!</h2>
        <p>
          Your feedback has been submitted to the {SITE_NAME} management team.
          Once verified, your comments will be published on our guest reviews section.
        </p>
        <button
          className="button button-secondary"
          onClick={() => setStatus("idle")}
          style={{ marginTop: 24 }}
        >
          Submit another review
        </button>
      </div>
    );
  }

  return (
    <form className="review-form enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {status === "error" && (
        <div className="form-error" role="alert">
          <AlertCircle size={20} aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Star Rating Selector */}
      <div className="field">
        <label id={id + "rating-label"}>
          Overall Rating *
        </label>
        <div
          className="star-rating-selector"
          role="radiogroup"
          aria-labelledby={id + "rating-label"}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const active = (hoverRating ?? selectedRating) >= star;
            return (
              <button
                key={star}
                type="button"
                className={`star-button ${active ? "is-active" : ""}`}
                onClick={() => setValue("rating", star, { shouldValidate: true })}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                role="radio"
                aria-checked={selectedRating === star}
              >
                <Star
                  size={32}
                  fill={active ? "var(--accent-gold, #c8963e)" : "none"}
                  color={active ? "var(--accent-gold, #c8963e)" : "var(--muted)"}
                />
              </button>
            );
          })}
          <span className="rating-feedback-label">
            {RATING_LABELS[hoverRating ?? selectedRating]}
          </span>
        </div>
        {errors.rating && (
          <p className="field-error">{errors.rating.message}</p>
        )}
      </div>

      <div className="field-row">
        {/* Guest Name */}
        <div className="field">
          <label htmlFor={id + "guestName"}>
            Your Name *
          </label>
          <input
            id={id + "guestName"}
            type="text"
            placeholder="e.g. Tendai Moyo or Sarah J."
            {...register("guestName")}
            aria-invalid={Boolean(errors.guestName)}
          />
          {errors.guestName && (
            <p className="field-error">{errors.guestName.message}</p>
          )}
        </div>

        {/* Guest Email */}
        <div className="field">
          <label htmlFor={id + "guestEmail"}>
            Email Address * <span className="form-note">(kept private)</span>
          </label>
          <input
            id={id + "guestEmail"}
            type="email"
            placeholder="e.g. guest@example.com"
            {...register("guestEmail")}
            aria-invalid={Boolean(errors.guestEmail)}
          />
          {errors.guestEmail && (
            <p className="field-error">{errors.guestEmail.message}</p>
          )}
        </div>
      </div>

      <div className="field-row">
        {/* Origin / City, Country */}
        <div className="field">
          <label htmlFor={id + "guestOrigin"}>
            City &amp; Country
          </label>
          <input
            id={id + "guestOrigin"}
            type="text"
            placeholder="e.g. Harare, Zimbabwe or London, UK"
            {...register("guestOrigin")}
          />
        </div>

        {/* Apartment Stayed */}
        <div className="field">
          <label htmlFor={id + "apartmentStayed"}>
            Apartment Stayed In *
          </label>
          <select
            id={id + "apartmentStayed"}
            {...register("apartmentStayed")}
            aria-invalid={Boolean(errors.apartmentStayed)}
          >
            {APARTMENT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.apartmentStayed && (
            <p className="field-error">{errors.apartmentStayed.message}</p>
          )}
        </div>
      </div>

      <div className="field-row">
        {/* Traveller Type */}
        <div className="field">
          <label htmlFor={id + "travellerType"}>
            Who did you travel with?
          </label>
          <select id={id + "travellerType"} {...register("travellerType")}>
            <option value="">Select traveller type (optional)</option>
            {TRAVELLER_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Date of Stay */}
        <div className="field">
          <label htmlFor={id + "stayDate"}>
            Month &amp; Year of Stay
          </label>
          <input
            id={id + "stayDate"}
            type="text"
            placeholder="e.g. October 2026"
            {...register("stayDate")}
          />
        </div>
      </div>

      {/* Review Headline */}
      <div className="field">
        <label htmlFor={id + "title"}>
          Review Headline
        </label>
        <input
          id={id + "title"}
          type="text"
          placeholder="e.g. Comfortable home base and wonderful hospitality"
          {...register("title")}
        />
      </div>

      {/* Review Comments */}
      <div className="field">
        <label htmlFor={id + "quote"}>
          Your Review &amp; Comments *
        </label>
        <textarea
          id={id + "quote"}
          rows={5}
          placeholder="What did you enjoy most about your stay? Tell future travellers about the apartment comfort, kitchen, grounds, location and host support..."
          {...register("quote")}
          aria-invalid={Boolean(errors.quote)}
        />
        {errors.quote && (
          <p className="field-error">{errors.quote.message}</p>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="field review-consent-field">
        <label className="checkbox-label" htmlFor={id + "consent"}>
          <input
            id={id + "consent"}
            type="checkbox"
            {...register("consent")}
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            I confirm this review reflects my genuine stay experience at {SITE_NAME},
            and I permit management to publish my name, origin, and comments.
          </span>
        </label>
        {errors.consent && (
          <p className="field-error">{errors.consent.message}</p>
        )}
      </div>

      <div className="actions" style={{ marginTop: 24 }}>
        <button
          type="submit"
          className="button button-primary"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting review..." : "Submit Guest Review"}
        </button>
      </div>
    </form>
  );
}
