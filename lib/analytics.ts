export type AnalyticsEventName =
  | "apartment_view"
  | "availability_enquiry_open"
  | "availability_enquiry_submitted"
  | "whatsapp_click"
  | "email_click"
  | "trip_planner_open"
  | "trip_planner_submitted"
  | "transfer_enquiry_submitted"
  | "activity_enquiry_submitted";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, string | number | boolean | undefined>,
    ) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
    }
  } catch {
    // Analytics should never block guest actions.
  }
}
