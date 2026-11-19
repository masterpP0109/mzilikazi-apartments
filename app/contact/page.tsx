import { experiences, experienceEnquiryMessage } from "@/lib/experience-content";
import Contact from "@/components/home/Contact";
import { PageIntro } from "@/components/ui/Editorial";
import { propertyPhotos } from "@/lib/property";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Request availability & contact us",
  "Request apartment availability, ask about current rates, or request transfers and local experiences at Mzilikazi Apartments in Victoria Falls.",
  "/contact",
);

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const value = (k: string) =>
    typeof params[k] === "string"
      ? (params[k] as string).slice(0, 5000)
      : undefined;
  const guests = Number(value("guests"));
  const experience = experiences.find(
    (e) => e.enabled && e.slug === value("experience"),
  );
  const isExperienceEnquiry =
    Boolean(experience) || value("experience") === "other";
  const requestedServices: string[] = [];
  if (isExperienceEnquiry) requestedServices.push("Local experiences / activities");
  if (
    value("preference")?.toLowerCase().includes("transfer") ||
    value("service")?.toLowerCase().includes("transfer")
  ) {
    requestedServices.push("Airport transfer");
  }

  return (
    <>
      <PageIntro
        eyebrow={isExperienceEnquiry ? "Experience enquiry" : "Request availability"}
        title={
          experience
            ? `Ask about ${experience.title}`
            : isExperienceEnquiry
              ? "Ask about another experience"
              : "Request availability for your stay."
        }
        media={experience?.media ?? propertyPhotos.exteriorFacade}
      >
        <p>
          {isExperienceEnquiry
            ? "Ask about current options, pricing, and practical arrangements. Activities are confirmed separately from accommodation."
            : "Share your travel dates, guest count, and apartment preference. Our team will confirm available apartments, current rates, and booking terms."}
        </p>
      </PageIntro>
      <Contact
        experienceTitle={
          experience?.title ??
          (isExperienceEnquiry ? "another experience" : undefined)
        }
        initialValues={{
          arrivalDate: value("arrival"),
          departureDate: value("departure"),
          guests:
            Number.isInteger(guests) && guests > 0 && guests <= 20 ? guests : 2,
          adults:
            Number.isInteger(guests) && guests > 0 && guests <= 20 ? guests : 2,
          children: 0,
          apartmentPreference: isExperienceEnquiry
            ? `Experience: ${experience?.title ?? "Another activity"}`
            : value("preference") ?? value("service"),
          requestedServices,
          sourcePage: value("source") ?? "/contact",
          message:
            value("message") ??
            (experience
              ? experienceEnquiryMessage(experience.title)
              : isExperienceEnquiry
                ? "Hi, I’d like to ask about another activity or experience during my stay at Mzilikazi Apartments. Please help me explore the options."
                : undefined),
        }}
      />
    </>
  );
}
