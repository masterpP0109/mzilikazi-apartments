"use client";
import { useEffect, useRef, useState, useId } from "react";
import { usePathname } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type EnquiryValues } from "@/lib/enquiry";
import { SITE_NAME, whatsappUrl } from "@/lib/constants";
import { publishedAccommodations } from "@/lib/property";
import { trackEvent } from "@/lib/analytics";

const EXTRA_SERVICE_OPTIONS = [
  "Airport transfer",
  "Local experiences / activities",
  "Private chef on request",
] as const;

interface Props {
  allowFlexibleDates?: boolean;
  defaultPreference?: string;
  initialValues?: Partial<EnquiryValues>;
}

export default function EnquiryForm({
  allowFlexibleDates = false,
  defaultPreference,
  initialValues,
}: Props) {
  const id = useId();
  const pathname = usePathname();
  const lock = useRef(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const initialGuests =
    typeof initialValues?.guests === "number" && initialValues.guests >= 1
      ? initialValues.guests
      : 2;
  const initialAdults = initialValues?.adults ?? initialGuests;
  const initialChildren = initialValues?.children ?? 0;
  const initialPref =
    initialValues?.apartmentPreference ?? defaultPreference ?? "";

  const apartmentNames = publishedAccommodations
    .map((a) => a.name)
    .filter((name): name is string => Boolean(name));
  const hasCustomPreference =
    Boolean(initialPref) && !apartmentNames.includes(initialPref);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    control,
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      dateMode: "known",
      preferredContact: "email",
      guests: initialAdults + initialChildren,
      adults: initialAdults,
      children: initialChildren,
      apartmentPreference: initialPref,
      requestedServices: initialValues?.requestedServices ?? [],
      sourcePage: initialValues?.sourcePage ?? pathname ?? "/contact",
      ...initialValues,
    },
  });

  useEffect(() => {
    trackEvent("availability_enquiry_open", {
      source_page: initialValues?.sourcePage ?? pathname ?? "/contact",
      has_preference: Boolean(initialPref),
    });
  }, [initialPref, initialValues?.sourcePage, pathname]);

  const dateMode = useWatch({ control, name: "dateMode" }) ?? "known";
  const adults = useWatch({ control, name: "adults" }) ?? initialAdults;
  const children = useWatch({ control, name: "children" }) ?? initialChildren;
  const apartmentPreference =
    useWatch({ control, name: "apartmentPreference" }) ?? initialPref;
  const arrivalDate = useWatch({ control, name: "arrivalDate" }) ?? "";
  const departureDate = useWatch({ control, name: "departureDate" }) ?? "";
  const requestedServices =
    useWatch({ control, name: "requestedServices" }) ?? [];
  const whatsappParts = [
    `Hello ${SITE_NAME}, I would like to request availability`,
    apartmentPreference ? `for ${apartmentPreference}` : "",
    arrivalDate && departureDate ? `(${arrivalDate} to ${departureDate})` : "",
    `for ${adults} ${adults === 1 ? "adult" : "adults"}${children ? ` and ${children} ${children === 1 ? "child" : "children"}` : ""}.`,
    requestedServices.length ? `Extras: ${requestedServices.join(", ")}.` : "",
  ].filter(Boolean);
  const whatsapp = whatsappUrl(whatsappParts.join(" "));

  const toggleService = (service: string) => {
    const next = requestedServices.includes(service)
      ? requestedServices.filter((s) => s !== service)
      : [...requestedServices, service];
    setValue("requestedServices", next, { shouldDirty: true });
  };

  const submit = async (data: EnquiryValues) => {
    if (lock.current) return;
    lock.current = true;
    setStatus("loading");
    setError("");
    try {
      const safeAdults = Math.max(1, Number(data.adults ?? initialAdults));
      const safeChildren = Math.max(0, Number(data.children ?? 0));
      const payload: EnquiryValues = {
        ...data,
        adults: safeAdults,
        children: safeChildren,
        guests: Math.min(20, Math.max(1, safeAdults + safeChildren)),
        sourcePage: data.sourcePage || pathname || "/contact",
      };
      if ((payload.dateMode ?? "known") !== "known") {
        payload.arrivalDate = "";
        payload.departureDate = "";
      }
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.success)
        throw new Error(
          body.error ?? "We could not send your enquiry. Please try again.",
        );
      trackEvent("availability_enquiry_submitted", {
        source_page: payload.sourcePage || "/contact",
        has_dates: (payload.dateMode ?? "known") === "known",
        has_preference: Boolean(payload.apartmentPreference),
      });
      if (payload.sourcePage === "trip-planner") {
        trackEvent("trip_planner_submitted", {
          has_dates: (payload.dateMode ?? "known") === "known",
        });
      }
      setStatus("success");
      reset();
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Please try again.");
    } finally {
      lock.current = false;
    }
  };

  const attrs = (name: keyof EnquiryValues) => ({
    id: id + name,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? id + name + "-error" : undefined,
  });

  const field = (
    name: keyof EnquiryValues,
    label: string,
    controlEl: React.ReactNode,
    required = false,
  ) => (
    <div className="field">
      <label htmlFor={id + name}>
        {label}
        {required ? " *" : ""}
      </label>
      {controlEl}
      {errors[name] && (
        <p className="field-error" id={id + name + "-error"}>
          {errors[name]?.message}
        </p>
      )}
    </div>
  );

  if (status === "success")
    return (
      <div role="status" data-enquiry>
        <h2>Thanks — we’ve received your enquiry.</h2>
        <p>
          Our team at {SITE_NAME} will check availability for your dates and
          respond using your preferred contact method with current rates and
          booking terms. Please note that this is an enquiry only and not a
          confirmed booking.
        </p>
        <div className="actions" style={{ marginTop: 20 }}>
          <button
            type="button"
            className="text-link"
            onClick={() => setStatus("idle")}
          >
            Send another enquiry →
          </button>
          {whatsapp && (
            <a
              className="button button-secondary"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: "enquiry_success" })}
            >
              WhatsApp Our Team
            </a>
          )}
        </div>
      </div>
    );

  return (
    <form
      id={id + "enquiry"}
      data-enquiry
      onSubmit={(event) => {
        void handleSubmit(submit)(event);
      }}
      noValidate
      className="enquiry-form"
      aria-busy={status === "loading"}
    >
      <p className="form-note">
        Fields marked * are required. Submitting checks availability with our
        team — no reservation is confirmed until rates and terms are agreed.
      </p>
      <input type="hidden" {...register("sourcePage")} />
      <input type="hidden" {...register("guests", { valueAsNumber: true })} />

      <div className="field-row">
        {field(
          "name",
          "Your name",
          <input
            {...register("name")}
            {...attrs("name")}
            autoComplete="name"
            required
          />,
          true,
        )}
        {field(
          "email",
          "Email address",
          <input
            {...register("email")}
            {...attrs("email")}
            type="email"
            autoComplete="email"
            required
          />,
          true,
        )}
      </div>

      <div className="field-row">
        {field(
          "phone",
          "Phone / WhatsApp (optional)",
          <input
            {...register("phone")}
            {...attrs("phone")}
            type="tel"
            autoComplete="tel"
          />,
        )}
        {field(
          "preferredContact",
          "Preferred reply method",
          <select
            {...register("preferredContact")}
            {...attrs("preferredContact")}
          >
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="phone">Phone call</option>
          </select>,
        )}
      </div>

      {allowFlexibleDates &&
        field(
          "dateMode",
          "Your dates",
          <select {...register("dateMode")} {...attrs("dateMode")}>
            <option value="known">Known dates</option>
            <option value="flexible">Flexible dates</option>
            <option value="deciding">Still deciding</option>
          </select>,
        )}

      {dateMode === "known" && (
        <div className="field-row">
          {field(
            "arrivalDate",
            "Arrival",
            <input
              {...register("arrivalDate")}
              {...attrs("arrivalDate")}
              type="date"
              required
            />,
            true,
          )}
          {field(
            "departureDate",
            "Departure",
            <input
              {...register("departureDate")}
              {...attrs("departureDate")}
              type="date"
              required
            />,
            true,
          )}
        </div>
      )}

      <div className="field-row">
        {field(
          "adults",
          "Adults",
          <input
            {...register("adults", {
              valueAsNumber: true,
              onChange: (e) => {
                const nextAdults = Math.max(1, Number(e.target.value) || 1);
                setValue(
                  "guests",
                  Math.min(20, nextAdults + Math.max(0, Number(children) || 0)),
                );
              },
            })}
            {...attrs("adults")}
            type="number"
            min="1"
            max="20"
            required
          />,
          true,
        )}
        {field(
          "children",
          "Children",
          <input
            {...register("children", {
              valueAsNumber: true,
              onChange: (e) => {
                const nextChildren = Math.max(0, Number(e.target.value) || 0);
                setValue(
                  "guests",
                  Math.min(20, Math.max(1, Number(adults) || 1) + nextChildren),
                );
              },
            })}
            {...attrs("children")}
            type="number"
            min="0"
            max="20"
          />,
        )}
      </div>
      {errors.guests && (
        <p className="field-error" id={id + "guests-error"}>
          {errors.guests.message}
        </p>
      )}

      {field(
        "apartmentPreference",
        "Apartment preference (optional)",
        <select
          {...register("apartmentPreference")}
          {...attrs("apartmentPreference")}
        >
          <option value="">Any available two-bedroom apartment</option>
          {publishedAccommodations.map(
            (a) =>
              a.name && (
                <option key={a.slug} value={a.name}>
                  {a.name} — US$130/night
                </option>
              ),
          )}
          {hasCustomPreference && (
            <option value={initialPref}>{initialPref}</option>
          )}
        </select>,
      )}

      <fieldset className="field" style={{ border: "none", padding: 0, margin: 0 }}>
        <legend className="field-label">
          Extra services to enquire about (optional)
        </legend>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px 20px",
            marginTop: 4,
          }}
        >
          {EXTRA_SERVICE_OPTIONS.map((service) => {
            const checked = requestedServices.includes(service);
            return (
              <label
                key={service}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 400,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleService(service)}
                  style={{ width: 18, height: 18, minHeight: 18 }}
                />
                <span>{service}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {field(
        "message",
        "Your questions & preferences",
        <textarea {...register("message")} {...attrs("message")} rows={5} />,
      )}

      {status === "error" && (
        <p className="form-error" role="alert">
          {error} Your details are still here; you can retry.
        </p>
      )}

      <div className="actions">
        <button
          className="button button-primary"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading"
            ? "Sending enquiry…"
            : status === "error"
              ? "Try sending again"
              : "Send My Enquiry →"}
        </button>
        {whatsapp && (
          <a
            className="button button-secondary"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("whatsapp_click", { location: "enquiry_form" })}
          >
            WhatsApp Our Team
          </a>
        )}
      </div>

      <p className="form-note">
        This is an availability enquiry, not a confirmed booking. Please avoid
        including card numbers or sensitive documents.
      </p>
    </form>
  );
}
