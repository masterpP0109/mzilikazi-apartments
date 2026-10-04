import { experiences, experienceEnquiryMessage } from "@/lib/experience-content";
import Contact from "@/components/home/Contact";
import { PageIntro } from "@/components/ui/Editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Check availability",
  "Enquire about dates, accommodation and current rates for your Victoria Falls stay.",
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
  const experience = experiences.find(e => e.enabled && e.slug === value("experience"));
  const isExperienceEnquiry = Boolean(experience) || value("experience") === "other";
  return (
    <>
      <PageIntro
        eyebrow={isExperienceEnquiry ? "Experience enquiry" : "Let’s make a plan"}
        title={experience ? `Ask about ${experience.title}` : isExperienceEnquiry ? "Ask about another experience" : "Your Victoria Falls stay starts here."}
      >
        <p>
          {isExperienceEnquiry ? "Ask about the available options, practical arrangements and what is included. Activities are confirmed separately from accommodation." : "Share your dates. Ask your questions. Find a place to come home to."}
        </p>
      </PageIntro>
      <Contact
        experienceTitle={experience?.title ?? (isExperienceEnquiry ? "another experience" : undefined)}
        initialValues={{
          arrivalDate: value("arrival"),
          departureDate: value("departure"),
          guests:
            Number.isInteger(guests) && guests > 0 && guests <= 20 ? guests : 2,
          apartmentPreference: isExperienceEnquiry ? `Experience: ${experience?.title ?? "Another activity"}` : value("preference") ?? value("service"),
          message: value("message") ?? (experience ? experienceEnquiryMessage(experience.title) : isExperienceEnquiry ? "Hi, I’d like to ask about another activity or experience during my stay at Mzilikazi. Please help me explore the options." : undefined),
        }}
      />
    </>
  );
}
