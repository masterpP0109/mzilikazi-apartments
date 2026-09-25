import { z } from "zod";
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a valid date")
  .refine(
    (v) =>
      !Number.isNaN(Date.parse(v)) &&
      new Date(v).toISOString().slice(0, 10) === v,
    "Please choose a valid date",
  );
export const enquirySchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name").max(120),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .max(254),
    phone: z.string().max(60).optional(),
    arrivalDate: date,
    departureDate: date,
    guests: z
      .number()
      .int("Please enter a whole number of guests")
      .min(1, "Please enter at least one guest")
      .max(20, "For larger groups, add details in your message."),
    apartmentPreference: z.string().max(200).optional(),
    message: z
      .string()
      .max(5000, "Please keep your message under 5,000 characters.")
      .optional(),
  })
  .refine((d) => d.departureDate > d.arrivalDate, {
    message: "Departure must be after arrival",
    path: ["departureDate"],
  })
  .refine(
    (d) =>
      d.arrivalDate >=
      new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    {
      message: "Please choose an upcoming arrival date",
      path: ["arrivalDate"],
    },
  );
export type EnquiryValues = z.infer<typeof enquirySchema>;
