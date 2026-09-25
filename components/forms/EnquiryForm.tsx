"use client";
import { useRef, useState, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type EnquiryValues } from "@/lib/enquiry";
import { SITE_NAME } from "@/lib/constants";
import { publishedAccommodations } from "@/lib/property";
interface Props {
  defaultPreference?: string;
  initialValues?: Partial<EnquiryValues>;
}
export default function EnquiryForm({
  defaultPreference,
  initialValues,
}: Props) {
  const id = useId();
  const lock = useRef(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      guests: 2,
      apartmentPreference: defaultPreference ?? "",
      ...initialValues,
    },
  });
  const submit = async (data: EnquiryValues) => {
    if (lock.current) return;
    lock.current = true;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.success)
        throw new Error(
          body.error ?? "We could not send your enquiry. Please try again.",
        );
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
    control: React.ReactNode,
    required = false,
  ) => (
    <div className="field">
      <label htmlFor={id + name}>
        {label}
        {required ? " *" : ""}
      </label>
      {control}
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
        <h2>Enquiry received.</h2>
        <p>
          Thank you for contacting {SITE_NAME}. Your dates and questions have
          been received. Availability and booking confirmation will follow
          separately.
        </p>
        <button className="text-link" onClick={() => setStatus("idle")}>
          Send another enquiry →
        </button>
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
      <p className="form-note">Fields marked * are required.</p>
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
      {field(
        "guests",
        "Guests",
        <input
          {...register("guests", { valueAsNumber: true })}
          {...attrs("guests")}
          type="number"
          min="1"
          max="20"
          required
        />,
        true,
      )}
      {field(
        "apartmentPreference",
        "Accommodation or travel preference (optional)",
        <input
          {...register("apartmentPreference")}
          {...attrs("apartmentPreference")}
          list={id + "options"}
        />,
      )}
      <datalist id={id + "options"}>
        {publishedAccommodations.map((a) => (
          <option key={a.slug} value={a.name ?? ""} />
        ))}
      </datalist>
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
      <button
        className="button button-primary"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading"
          ? "Sending enquiry…"
          : status === "error"
            ? "Try sending again"
            : "Send enquiry →"}
      </button>
      <p className="form-note">
        This is an enquiry, not a confirmed booking. Please avoid including
        payment details or sensitive documents.
      </p>
    </form>
  );
}
