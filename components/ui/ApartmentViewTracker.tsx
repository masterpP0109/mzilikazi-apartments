"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ApartmentViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent("apartment_view", { apartment_slug: slug });
  }, [slug]);
  return null;
}
